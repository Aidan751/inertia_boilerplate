<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
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
        public function index(Request $request)
        {

            $user = User::where('role_id', '4')->first();

            $customer = $request->get('customer', '');
            $status = $request->get('status', '');
            $from = $request->get('from', '');
            $to = $request->get('to', '');

            $customers = User::whereHas('orders', function ($q) use($user) {
                $q->where('restaurant_id', Auth::user()->restaurant_id);
            })->orderBy('last_name')->get();
            $customersArray = [];
            array_push($customersArray, ["placeholder" => true, "text" => "Select a customer"]);

            foreach ($customers as $user) {

                $selected = false;

                if ($customer == $user->id) {
                    $selected = true;
                }

                array_push($customersArray, ["text" => $user->getFullName(), "value" => $user->id, "selected" =>  $selected]);

            }


            // Create a model for this
            $order = new Order;

            $orders = $order->with('customer', 'driver')
                ->where('restaurant_id', Auth::user()->restaurant_id)
                ->when($from, function($q) use ($from) {
                    $q->whereDate('pickup_date', '>=', $from);
                })
                ->when($to, function($q) use ($to) {
                    $q->whereDate('pickup_date', '<=', $to);
                })
                ->when('customer' != null, function($q) use ($customer) {
                    if ($customer != null) {
                        $q->where('id', $customer);
                    }
                })
                 ->where('payment_status', 'paid')
                 ->where(function ($q) use ($status) {

                     if ($status == 'complete') {
                         $q->where('status', 'completed');
                     } else if ($status == 'incomplete') {
                         $q->where('status', '!=', 'completed');
                     }
                 })
                 ->latest()
                 ->paginate(10)->appends(request()->query());



            return Inertia::render('RestaurantAdmin/Orders/Index', [
                'orders' => $orders,
                'customers' => $customersArray,
                'status' => $status,
                'from' => $from,
                'to' => $to,
                'customer' => $customer,
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
}