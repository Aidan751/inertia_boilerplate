<?php

namespace App\Http\Controllers\Web\CallCentre;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
      /**
        * Display a listing of the resource.
        *
        * @return \Illuminate\Http\Response
        */
        public function index(Request $request, $id)
        {
            $user = User::find($id);
               // Get all users, paginate through them using the "perPage" parameter. Search through the users, if the "search" parameter is present.
            $search = $request->get('search', '');
            $status = $request->get('status', '');
            $from = $request->get('from', '');
            $to = $request->get('to', '');


            // todo: query whether it was meant to be search by contact number rather than email

              $orders = Order::where('user_id', $user->id)->where('order_method', 'call')->where(function ($q) use ($search) {
                 $q->where('customer_name', 'LIKE', '%' . $search . '%')->orWhere('customer_contact_number', 'LIKE', '%' . $search . '%');
              })
              ->orderBy('pickup_date', 'desc')
              ->paginate($request->perPage ?? 10);



          // Return an inertia view with the users
          return Inertia::render('CallCentreAdmin/Orders/Index', [
              'user' => $user,
              'orders' => $orders,
              "perPage" => $request->perPage ?? 10,
              "search" => $request->search ?? null,
              "from" => $request->from ?? null,
              "to" => $request->to ?? null,
              "status" => $request->status ?? null,
          ]);
        }

        // create order
        public function search(Request $request, $id)
        {
            return Inertia::render('CallCentreAdmin/Orders/Search');
        }

        // get order details
        public function details(Request $request)
        {
            
            $restaurant = Restaurant::where('contact_number', $request->contact_number)->first();
            $order_type = $request->order_type;
            $selected_time = $request->selected_time;
            $customer_contact_number = $request->customer_contact_number;
            $customer_name = $request->customer_name;
            $when = $request->when;
            $address = $request->address;
            

            
            return Inertia::render('CallCentreAdmin/Orders/Details', [
                'restaurant' => $restaurant,
                'order_type' => $order_type,
                'selected_time' => $selected_time,
                'customer_contact_number' => $customer_contact_number,
                'customer_name' => $customer_name,
                'when' => $when,
                'address' => $address,
            ]);
        }

        public function sendPush(Request $request, $id) {

            // Validate the data
            $request->validate([
                'order_push' => ['required', 'string', 'max:1024'],
            ]);


            // Attempt to find the order
            $order = Order::with('restaurant', 'driver', 'customer')
            ->where('id', $id)
            ->first();


            if ($order->customer_id != null && !is_null($request->order_push)){
                app('App\Services\PushNotification')->sendPush(config('app.name'), $request->order_push, [$order->customer_id], 'orders', $order->id);
            }

            return redirect()->back()->with('success',
                'Notification sent!'
            );
        }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::where('id', $id)->first();
        // Find the model for this ID
        $order = Order::with('items')->where('restaurant_id', Auth::user()->restaurant_id)->where('id', $id)->first();

        if ($order != null) {
            $totalQuantity = 0;

            foreach ($order->items as $item) {
                $totalQuantity = $totalQuantity + $item->quantity;
            }

            $order->setAttribute('total_quantity', $totalQuantity);

            // Load the view
            return Inertia::render('CallCentreAdmin/Orders/Edit', [
                'order' => $order,
                'user' => $user,
            ]);
        } else {
            return redirect()->back()->with('fail',
            'Order not found!');
        }
    }

    public function update(Request $request, $id)
    {
        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        // Attempt to find the order
        $order = Order::with('restaurant', 'driver', 'customer')
            ->where('restaurant_id', Auth::user()->restaurant_id)
            ->where('id', $id)
            ->first();

            if ($order == null) {
                return redirect()->back()->with('fail',
                'Order not found!');
            } else {
                $name = $order->restaurant->name;
                $restaurantStripe = $order->restaurant->stripe_account_id;

                // Update the parameters
                if ($request->accept == "accept") {
                    $capture = $stripe->paymentIntents->capture($order->payment_intent_id,[], [
                            'stripe_account' => $restaurantStripe,
                    ]);

                    if ($capture->status == "succeeded") {
                        $order->status = 'confirmed';
                        app('App\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has been accepted and payment has been taken", [$order->customer_id], 'orders', $order->id);
                    } else {
                        $order->updated_at = Carbon::now();
                        // Save to the database
                        $order->save();
                        app('App\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has a problem. Payment was unable to be taken.", [$order->customer_id], 'orders', $order->id);
                        return redirect()->back()->with(
                            'fail',
                            'Payment failed to be captured!'
                        );
                    }
                } elseif ($request->decline == "decline") {
                    $order->status = 'cancelled';
                    $cancel = $stripe->paymentIntents->cancel($order->payment_intent_id, [], ['stripe_account' => $restaurantStripe]);
                    app('App\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has been cancelled. You have not been charged.", [$order->customer_id], 'orders', $order->id);
                }

                $order->updated_at = Carbon::now();

                // Save to the database
                $order->save();

                return redirect()->back()->with(
                    'success',
                    'Order updated!'
                );
            }
    }

    public function show(Request $request, Order $order)
    {
        $order_items = OrderItem::where('order_id', $order->id)->get();
        $user = User::find($order->user_id);
        // Return an inertia view with the order
        return Inertia::render('CallCentreAdmin/Orders/Show', [
            'user' => $user,
            'order' => $order,
            'order_items' => $order_items
        ]);
    }
}