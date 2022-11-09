<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserLocation;
use App\Models\UserDriver;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;


class LocationController extends Controller
{
    public function get() {
        $location = UserLocation::where('user_id', auth('api')->user()->id)->first();

        // If location isn't null and expiry date is null, then journey is in progress
        // If location isn't null and expiry date is set, then journey is complete
        // Otherwise, do not allow tracking

        if ($location != null) {
            if ($location->expires == null || $location->expires->isFuture()) {
                return response()->json([
                    "track" => 1
                ], 200);
            } else {
                return response()->json([
                    "track" => 0
                ], 200);
            }
        } else {
            return response()->json([
                "track" => 0
            ], 200);
        }

    }

    function distance($lat1, $lon1, $lat2, $lon2, $unit) {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
          return 0;
        }
        else {
          $theta = $lon1 - $lon2;
          $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
          $dist = acos($dist);
          $dist = rad2deg($dist);
          $miles = $dist * 60 * 1.1515;
          $unit = strtoupper($unit);
      
          if ($unit == "K") {
            return ($miles * 1.609344);
          } else if ($unit == "N") {
            return ($miles * 0.8684);
          } else {
            return $miles;
          }
        }
      }


      public function update(Request $request) {

        $appName = config('app.name');

    
        $location = new UserLocation;
      
        $location->user_id = auth('api')->user()->id;
        $location->latitude = $request->latitude;
        $location->longitude = $request->longitude;

        $location->save();

       
        // If logged in user is a driver, check to see if they active on a order. 
        // If they are, depending on the order's status, check if they are within a threshold of the destination.

        if ($location->user->role_id == 2) {
            // Attempt to find the order
            $order = Order::with('restaurant', 'customer', 'driver')
            ->where('driver_id', $location->user->id)
            ->where('status', '!=', 'cancelled')
            ->where('status', '!=', 'completed')
            ->where('pickup_date', '<=', Carbon::now()->addMinutes(10))
            ->first();

            if ($order != null) {
                $distance = 0;

                $order->updated_at = Carbon::now();

                // // Has active order
                // if ($order->status == 'confirmed') {                  
                //     // Check to see if driver is near pickup location
                
                //     if ($distance <= 5) {
                //         // Is within 5 km, update status
                //         $order->status = 'driver-en-route';
                //         $order->save();
                //         if ($order->user != null) {
                //             app('App\Services\PushNotification')->sendPush("Castle Inn", "Your driver is en-route to pickup your order", [$order->customer->id], 'orders', $order->id);
                //         }
                //         app('App\Services\PushNotification')->sendPush("Castle Inn", "You are en-route to pickup an order at $order->pickup_date.", [$order->driver->id], 'orders', $order->id);
                //     }

                // } else 
                if ($order->status == "driver-en-route") {
                   $distance = $this->distance($request->latitude, $request->longitude, $order->restaurant->latitude, $order->restaurant->longitude, "K");
                    // When within threshold of pickup point (less than 100m), change to order-en-route
                    if ($distance <= 0.1) {
                        $order->status = 'order-en-route';
                        $order->save();

                        if ($order->user != null) {
                            app('App\Services\PushNotification')->sendPush($appName, "Your driver has arrived at the business", [$order->customer->id], 'orders', $order->id);
                        }
                        app('App\Services\PushNotification')->sendPush($appName, "You have arrived at the business", [$order->driver->id], 'orders', $order->id);
                    }
                } else if ($order->status == 'order-en-route') {

                    $distance = $this->distance($request->latitude, $request->longitude, $order->latitude, $order->longitude, "K");
  
                    if ($distance <= 0.1) {
                        $order->status = 'completed';
                        $order->save();
                        $driver = UserDriver::where('user_id', $order->driver_id)->first();
                        $driver->availability_status = 'available';
                        $driver->save();
                        app('App\Services\PushNotification')->sendPush($appName, "Your order has arrived", [$order->customer->id], 'orders', $order->id);
                        app('App\Services\PushNotification')->sendPush($appName, "You have arrived at the customer's location", [$order->driver->id], 'orders', $order->id);
                    }
                                       
                                 
                }
                $location->setAttribute('distance', $distance);
            } 
            return response($location, 200);
        }
    }

  


}
