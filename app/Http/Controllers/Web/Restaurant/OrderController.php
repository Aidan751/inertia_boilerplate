<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use Stripe\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Models\Configuration;
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

              $orders = Order::where('restaurant_id', $user->restaurant_id)->where(function ($q) use ($search) {
                 $q->where('customer_name', 'LIKE', '%' . $search . '%')->orWhere('customer_contact_number', 'LIKE', '%' . $search . '%')->orWhere('address_line_1', 'LIKE', '%' . $search . '%')->orWhere('address_line_2', 'LIKE', '%' . $search . '%')->orWhere('town', 'LIKE', '%' . $search . '%')->orWhere('postcode', 'LIKE', '%' . $search . '%')->orWhere('status', 'LIKE', '%' . $search . '%');
              })
              ->when($from, function($q) use ($from) {
                $q->whereDate('pickup_date', '>=', $from);
            })
            ->when($to, function($q) use ($to) {
                $q->whereDate('pickup_date', '<=', $to);
            })
            ->when($status, function($q) use ($status) {
                $q->where('status', $status);
            })
              ->latest()
              ->paginate($request->perPage ?? 10);



          // Return an inertia view with the users
          return Inertia::render('RestaurantAdmin/Orders/Index', [
              'user' => $user,
              'orders' => $orders,
              "perPage" => $request->perPage ?? 10,
              "search" => $request->search ?? null,
              "from" => $request->from ?? null,
              "to" => $request->to ?? null,
              "status" => $request->status ?? null,
          ]);
        }

        public function sendPush(Request $request, $id) {

            // dd($request->all());
            // Validate the data
            $request->validate([
                'message_to_customer' => ['required', 'string', 'max:1024'],
            ]);


            // Attempt to find the order
            $order = Order::with('restaurant', 'driver', 'customer')
            ->where('id', $id)
            ->first();


            if ($order->customer_id != null && !is_null($request->message_to_customer)){
                app('App\Services\PushNotification')->sendPush(config('app.name'), $request->message_to_customer, [$order->customer_id], 'orders', $order->id);
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
            return Inertia::render('RestaurantAdmin/Orders/Edit', [
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
        // Validate the data
        $request->validate([
            'status' => ['required', 'string', 'max:255'],
            'driver_collection_time' => ['nullable'],
        ]);

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_test_secret_key')
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
                if ($request->status == "approved") {
                    $capture = $stripe->paymentIntents->capture($order->payment_intent_id,[], [
                        'stripe_account' => $restaurantStripe,
                    ]);

                    dd($capture);
                    if ($capture->status == "succeeded") {
                        $order->status = 'confirmed';
                        app('app\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has been accepted and payment has been taken", [$order->customer_id], 'orders', $order->id);
                    } else {
                        $order->updated_at = Carbon::now();
                        // Save to the database
                        $order->save();
                        app('app\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has a problem. Payment was unable to be taken.", [$order->customer_id], 'orders', $order->id);
                        return redirect()->back()->with(
                            'fail',
                            'Payment failed to be captured!'
                        );
                    }
                } elseif ($request->status == "declined") {
                    $order->status = 'cancelled';
                    $cancel = $stripe->paymentIntents->cancel($order->payment_intent_id, [], ['stripe_account' => $restaurantStripe]);
                    app('app\Services\PushNotification')->sendPush(config('app.name'), "Your order from $name has been declined", [$order->customer_id], 'orders', $order->id);
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
        $customer = User::where('id', $order->customer_id)->first();
        $configuration = Configuration::first();
        // Return an inertia view with the order
        return Inertia::render('RestaurantAdmin/Orders/Show', [
            'user' => $user,
            'order' => $order,
            'order_items' => $order_items,
            'configuration' => $configuration,
            'customer' => $customer,
        ]);
    }
}