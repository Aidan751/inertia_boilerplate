<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\Order;
use Stripe\StripeClient;
use Stripe\PaymentMethod;
use App\Events\OrderAdded;
use App\Models\Restaurant;
use App\Models\UserDriver;
use Illuminate\Http\Request;
use App\Models\StripePayment;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\QueryException;

class OrderController extends Controller
{

    function generateRandomString($length = 6) {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    public function list()
    {
        $role = auth('api')->user()->role_id;

        if ($role == 2) {
            $query = Order::with('items','restaurant')->where('driver_id', auth('api')->user()->id)
            ->orderBy('pickup_date', 'desc')
            ->paginate(25);
        } else {
            $query = Order::with('items','restaurant')->where('customer_id', auth('api')->user()->id)
            ->orderBy('pickup_date', 'desc')
            ->paginate(25);
        }


        return response($query, 200);
    }

    // Retrieve available orders within the next 10 minutes (or sooner)

    public function availableFares(Request $request) {

        $radius = 150; // Radius in miles
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        $query = Order::with('restaurant')
            ->whereHas('restaurant', function($q) use ($latitude, $longitude, $radius) {
                $q->isWithinMaxDistance($latitude, $longitude, $radius);
            })
            ->where('pickup_method', '=', 'delivery')
            ->where('payment_status', 'paid')
            ->where('status', '=', 'confirmed')
            ->where('driver_id', '=', null)
            ->where('pickup_date', '<=', Carbon::now()->addMinutes(10))
            ->orderBy('pickup_date', 'asc')
            ->paginate(25);

        return response($query, 200);
    }

    public function add(Request $request) {

            $reference = $this->generateRandomString();

            while (Order::where('order_reference', $reference)->exists()) {
                $reference = $this->generateRandomString();
            }

            $restaurant = Restaurant::where('id', $request->restaurant_id)->first();

            if ($restaurant == null) {
                return response('fail', 404);
            } else {
                $stripe = new StripeClient(
                    config('services.stripe_secret_key')
                );

                // Amount does not include delivery fee
                $amount = round((doubleval($request->price) * 100), 2);

                $percentageTransaction = 10;
                $restaurantStripe = $restaurant->stripe_account_id;
                $deliveryFeeAmount = round(doubleval($request->delivery_price * 100), 2);

                // Application fee does not include delivery fee
                $applicationFeeAmount = round(($amount / $percentageTransaction), 2);
                $customerStripe = auth('api')->user()->stripe->stripe_account_id;
                $customerPaymentMethod = auth('api')->user()->stripe->payment_method_id;

                $totalAmount = $amount + $deliveryFeeAmount;

                $stripePayment = new StripePayment;

                if ($restaurant->company_drivers == 1) {
                    // Client gets application fee + delivery charge
                    $applicationFeeAmount = $applicationFeeAmount + $deliveryFeeAmount;
                }

                if ($request->paymentIntent == "" || $request->paymentIntent == null) {

                    Stripe::setApiKey(config('services.stripe_secret_key'));

                    $payment_method = PaymentMethod::create([
                        'customer' => $customerStripe,
                        'payment_method' => $customerPaymentMethod,
                      ], [
                        'stripe_account' => $restaurantStripe,
                      ]);

                      $newCustomer = \Stripe\Customer::create([
                        'payment_method' => $payment_method->id,
                      ], [
                        'stripe_account' => $restaurantStripe,
                      ]);

                    $paymentIntent = $stripe->paymentIntents->create([
                        'amount' => $totalAmount,
                        'currency' => 'gbp',
                        'payment_method' => $payment_method->id,
                        'confirm' => true,
                        'customer' => $newCustomer->id,
                        'capture_method' => 'manual',
                        'application_fee_amount' => round($applicationFeeAmount),
                    ],['stripe_account' => $restaurantStripe]);

                    if ($paymentIntent->status == "requires_action") {
                        return response()->json([
                            "payment_intent" => $paymentIntent->id,
                            "client_secret" => $paymentIntent->client_secret,
                            "message" => "Order not found"
                        ], 402);
                    }
                } else {
                    $paymentIntent = $stripe->paymentIntents->retrieve($request->paymentIntent, [
                        'client_secret' => $request->clientSecret,
                    ]);
                }

                $stripePayment->payment_intent_id = $paymentIntent->id;
                $stripePayment->client_secret = $paymentIntent->client_secret;
                $stripePayment->user_id = auth('api')->user()->id;
                $stripePayment->amount = $totalAmount;
                $stripePayment->application_fee_amount = $applicationFeeAmount;

                $stripePayment->status = $paymentIntent->status;

                $stripePayment->save();

                $order = new Order;
                $order->order_reference = $reference;
                $order->restaurant_id = $request->restaurant_id;
                $order->customer_id = auth('api')->user()->id;
                $order->pickup_date = $request->pickup_date;
                $order->time_slot = $request->time_slot;
                $order->price = doubleval($request->price);
                $order->delivery_price = doubleval($request->delivery_price);
                $order->payment_method = $request->payment_method;
                $order->pickup_method = $request->pickup_method;
                $order->status = 'pending';
                $order->payment_status = 'paid';

                $order->address = $request->address;
                $order->latitude = $request->latitude;
                $order->longitude = $request->longitude;

                $order->payment_intent_id = $paymentIntent->id;

                if (!is_null($request->table_number)) {
                    $order->table_number = $request->table_number;
                }

                if (!is_null($request->address_line_1)) {
                    $order->address_line_1 = $request->address_line_1;
                }
                if (!is_null($request->address_line_2)) {
                    $order->address_line_2 = $request->address_line_2;
                }
                if (!is_null($request->town)) {
                    $order->town = $request->town;
                }
                if (!is_null($request->county)) {
                    $order->county = $request->county;
                }
                if (!is_null($request->postcode)) {
                    $order->postcode = $request->postcode;
                }


                try {
                    $order->save();
                    $order->items()->createMany(
                        $request->items
                    );

                    event(new OrderAdded($order->restaurant_id));

                } catch (QueryException $ex) {
                    $errorCode = $ex->errorInfo[1];
                    if ($errorCode == 1062) {
                        return response()->json([
                        'message' => $ex->errorInfo[2],
                    ], 400);
                    } else {
                        return response()->json([
                        'message' => $ex,
                    ], 422);
                    }
                }
                return response($order, 200);
            }

    }

    public function get($id)
    {
        // Attempt to find the order
        $order = Order::with('items',  'customer',  'restaurant', 'driver','driver.location')
            ->where('id', $id)
            ->firstOrFail();

            $url =  '';//config('app.url');

        if ($order->restaurant != null) {
            $logo = $order->restaurant->getMedia('logos');
        $banner = $order->restaurant->getMedia('banners');

        if(!$logo->isEmpty()){
            $order->restaurant->setAttribute('logo', $url . $logo[0]->getFullUrl());
        }
        else{
            $order->restaurant->setAttribute('logo', null);
        }

        if(!$banner->isEmpty()){
            $order->restaurant->setAttribute('banner', $url . $banner[0]->getFullUrl());
        }
        else{
            $order->restaurant->setAttribute('banner', null);
        }
        }


        if ($order === null) {
            return response()->json([
                "message" => "Order not found"
            ], 401);
        } else {
            return response($order, 200);
        }
    }



    public function update($id, Request $request)
    {

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        $appName = config('app.name');

        // Attempt to find the order
        $order = Order::with('restaurant', 'driver', 'customer', 'items')
            ->where('id', $id)
            ->first();

        $order->updated_at = Carbon::now();

        if (!is_null($request->driver_id) && $order->status != "cancelled") {

            if ($order->driver_id == null ) {
                $order->status = 'driver-en-route';
                $order->driver_id = $request->driver_id;
                $order->save();
                $driver = UserDriver::where('user_id', $request->driver_id)->first();
                $driver->availability_status = "order-in-progress";
                $driver->save();

                if ($order->customer != null) {
                    app('App\Services\PushNotification')->sendPush($appName, "Your driver is en-route to pick up your order", [$order->customer_id], 'orders', $order->id);
                }
            } else {
                return response()->json([
                    'message' => "Order taken",
                ], 404);
            }

        } else if ($request->status == "cancelled" && $order->status != 'cancelled'){

            $order->status = 'cancelled';

            $cancel = $stripe->paymentIntents->cancel($order->payment_intent_id);

            if ($order->customer != null){
                app('App\Services\PushNotification')->sendPush($appName, "Your order at $order->pickup_date has been cancelled. You have not been charged.", [$order->customer_id], 'orders', $order->id);
            }

            if ($order->driver_id != null) {
                $driver = UserDriver::where('user_id', $order->driver_id)->first();
                $driver->availability_status = 'available';
                $driver->save();
                app('App\Services\PushNotification')->sendPush($appName, "Your order at $order->pickup_date has been cancelled.", [$order->driver_id], 'orders', $order->id);
            }
        } else if ($request->status == 'order-en-route' && $order->status != 'order-en-route')  {

            $order->status = "order-en-route";

            if ($order->customer != null) {
                    app('App\Services\PushNotification')->sendPush($appName, "Your driver has arrived at the business", [$order->customer_id], 'orders', $order->id);
            }
            app('App\Services\PushNotification')->sendPush($appName, "You have arrived at the business", [$order->driver_id], 'orders', $order->id);

        } else if ($request->status == 'completed' && $order->status != 'completed') {
            $order->status = 'completed';

            $driver = UserDriver::where('user_id', $order->driver_id)->first();
            $driver->availability_status = 'available';
            $driver->save();

            if ($order->customer != null) {
                app('App\Services\PushNotification')->sendPush($appName, "Your order has arrived", [$order->customer_id], 'orders', $order->id);
            }
            app('App\Services\PushNotification')->sendPush($appName, "You have arrived at the customer's location", [$order->driver_id], 'orders', $order->id);
        }

        try {
            $order->push();
        } catch (QueryException $ex) {
            $errorCode = $ex->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json([
                    'message' => $ex->errorInfo[2],
                ], 400);
            } else {
                return response()->json([
                    'message' => $ex,
                ], 422);
            }
        }
        return response()->json([
            "message" => "Order successfully updated!"
        ], 201);
    }



}