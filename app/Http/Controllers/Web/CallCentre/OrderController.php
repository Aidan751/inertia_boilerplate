<?php

namespace App\Http\Controllers\Web\CallCentre;

use App\Models\Day;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Nette\Utils\DateTime;
use App\Models\Restaurant;
use App\Models\OpeningHour;
use App\Packages\TimeFormat;
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

              $orders = Order::where('user_id', Auth::user()->id)->where('order_method', 'call')->where(function ($q) use ($search) {
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
        // Validate the data
         $request->validate([
            'customer_name' => ['required', 'string', 'max:191'],
            'customer_contact_number' => 'phone:GB',
            'contact_number' => 'phone:GB',
            "role" => "required|exists:roles,name",
        ]);

        session()->forget('cart');
        session()->forget('restaurant');

        $restaurant = Restaurant::with('menuCategories', 'menuItems', 'openingHours')->where('contact_number', $request->contact_number)->first();

        // get opening hours
        $openingHours = OpeningHour::where('restaurant_id', $restaurant->id)->get();

        // check if restaurant exists
        if (!is_null($restaurant)) {
            // check if restaurant order type is in line with what is requested, if not, return error
            if ($request->order_type == 'delivery' && $restaurant->allows_delivery == 0) {
                return back()->with('error', 'This business does not offer a delivery service.');
            } else if ($request->order_type == 'collection' && $restaurant->allows_collection == 0)  {
                return back()->with('error', 'This business does not offer a collection service.');
            } else if ($request->order_type == 'table' && $restaurant->allows_table_orders == 0)  {
                return back()->with('error', 'This business does not offer table service.');
            }

            $openingHoursMessage = "";

            // check if restaurant delivery hours are within the time requested
            if ($request->when_radio == 'asap') {
                // if selected asap, check if restaurant is open
                $milliseconds =  date_format(new DateTime('+60 minutes'),  'H:i:s');
            } else {
                // if selected time, check if restaurant is open at the time selected
                $selectedTime = date_format(new DateTime($request->selected_time),  'H:i:s');
            }

            // Check restaurant is open now
            $currentDay = date('l');

            // get day
            $day = Day::where('day_of_the_week', $currentDay)->first();

            // get opening hours for the day
            $todaysHours = OpeningHour::where('day_id', $day->id)->where('restaurant_id', $restaurant->id)->get();

            if (count($todaysHours) > 0) {
                // Business is open today but may have multiple opening / closing times
                $businessClosed = false;
                // Iterate through each of the opening hours to see if we find a match
                foreach ($todaysHours as $hours) {
                    // If current time is after opening time and current time is before closing time
                    if ( ($selectedTime >= date_format(new DateTime($hours->from),  'H:i:s')) && ($selectedTime < date_format(new DateTime($hours->to),  'H:i:s')) ) {
                        // Business is open
                        $businessClosed = false;
                        $openingHoursMessage = "Open till " . date_format(new DateTime($hours->to),  'H:i');
                    } else {
                        $businessClosed = true;
                    }
                    if($businessClosed) {
                        // If business is closed, check to see if it's already been open for that day
                        if ($selectedTime < date_format(new DateTime($hours->from),  'H:i:s')) {
                            $openingHoursMessage = "Opens at " . date_format(new DateTime($hours->from),  'H:i');
                        } else if ($selectedTime > date_format(new DateTime($hours->to),  'H:i:s')) {
                            $openingHoursMessage = "Closed at " . date_format(new DateTime($hours->to),  'H:i');
                        }
                    }
                }
            }

            if ($request->order_type == 'delivery') {

                $googleApiKey = config('geocoder.key');
                dd($googleApiKey);
                $googleGeocoding = 'https://maps.googleapis.com/maps/api/geocode/json?key=' . $googleApiKey . '&address=' . $request->address;
                $geocodingRequest = Http::get($googleGeocoding);
                $decodedResponse = json_decode($geocodingRequest->body(), true);

                $userLatitude = 0;
                $userLongitude = 0;
                $address = $request->address;

                if ($decodedResponse['status'] == 'OK') {
                    $parts = array(
                    'address'=>array('street_number','route'),
                    'town'=>array('postal_town'),
                    'city'=>array('locality'),
                    'county'=>array('administrative_area_level_2'),
                    'state'=>array('administrative_area_level_1'),
                    'postcode'=>array('postal_code'),
                  );

                    if (!empty($decodedResponse['results'][0]['address_components'])) {
                        $ac = $decodedResponse['results'][0]['address_components'];
                        foreach ($parts as $need=>&$types) {
                            foreach ($ac as &$a) {
                                if (in_array($a['types'][0], $types)) {
                                    $address_out[$need] = $a['short_name'];
                                } elseif (empty($address_out[$need])) {
                                    $address_out[$need] = '';
                                }
                            }
                        }
                    }

                    $userLatitude = $decodedResponse['results'][0]['geometry']['location']['lat'];
                    $userLongitude = $decodedResponse['results'][0]['geometry']['location']['lng'];

                    $restaurant->setAttribute('address', $request->address);
                    $restaurant->setAttribute('userLatitude', $userLatitude);
                    $restaurant->setAttribute('userLongitude', $userLongitude);


                } elseif ($decodedResponse['status'] == "ZERO_RESULTS") {
                    return back()->withInput()->with('error', 'Address not found, please check this is a valid address.');
                } else {
                    return back()->withInput()->with('error', 'GEOCODING ERROR: ' . $decodedResponse['status'] . ' - ' . $decodedResponse['error_message']);
                }
            }

            $logo = $restaurant->getMedia('logos');


            if(!$logo->isEmpty()){
                $restaurant->setAttribute('logo', $url . $logo[0]->getFullUrl());
            }
            else{
                $restaurant->setAttribute('logo', null);
            }

            $restaurant->setAttribute('delivery_charge', 0);

            if ($restaurant->company_drivers == 1 && $request->order_type == 'delivery') {
                $configurations = Configuration::get()->toArray();

                $google = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' . $userLatitude . ',' . $userLongitude . '&destinations=' . $restaurant->latitude . ',' . $restaurant->longitude . '&key=' . $googleApiKey;

                $res = Http::get($google);
                $responseBody = json_decode($res->body(), true);

                $distanceInMiles = ceil($responseBody['rows'][0]['elements'][0]['distance']['value'] *  0.00062137);
                $timeInMinutes = ceil($responseBody['rows'][0]['elements'][0]['duration']['value'] / 60);

                $fee = (($timeInMinutes * $configurations[1]['price']) + ($distanceInMiles * $configurations[0]['price']));
                $roundedFee = round($fee, 2);
                $restaurant->setAttribute('delivery_charge', $roundedFee);
                $restaurant->setAttribute('time_in_minutes', $timeInMinutes);
                $restaurant->setAttribute('distance_in_miles', $distanceInMiles);
            }

        //     $categoryItems = array();
        //     foreach($restaurant->menuCategories as $category) {
        //         // For each menu category lookup all items assosiated with it
        //         $results = $restaurant->menuItems->where('menu_category_id', $category->id);

        //         foreach ($results as $result) {
        //             $itemImage = $result->getMedia('items');
        //             $url =  '';//config('app.url');
        //             if(!$itemImage->isEmpty()){
        //                 $result->setAttribute('image', $url . $itemImage[0]->getFullUrl());
        //             }
        //             else{
        //                 $result->setAttribute('image', null);
        //             }
        //         }

        //         $array = array($category->title, $results);
        //         array_push($categoryItems, $array);
        //     }

        //     $restaurant->setAttribute('menu', $categoryItems);
        //     $restaurant->setAttribute('opening_hours_message', $openingHoursMessage);
        //     $restaurant->setAttribute('chosen_order_type', $request->order_type);
        //     $restaurant->setAttribute('customer_name', $request->customer_name);
        //     $restaurant->setAttribute('customer_contact_number', $formattedContactNumber);
        //     $restaurant->setAttribute('time_slot', date('H:i:s', $selectedTime));

        //     session()->put('restaurant', $restaurant);


        //     return Inertia::render('CallCentreAdmin/Orders/Details', [
        //         'restaurant' => $restaurant,
        //         'order_type' => $request->order_type,
        //         'customer_name' => $request->customer_name,
        //         'customer_contact_number' => $formattedContactNumber,
        //         'time_slot' => date('H:i:s', $selectedTime),
        //         'opening_hours_message' => $openingHoursMessage,
        //         'chosen_order_type' => $request->order_type,
        //         'delivery_charge' => $restaurant->delivery_charge,
        //         'time_in_minutes' => $restaurant->time_in_minutes,
        //         'distance_in_miles' => $restaurant->distance_in_miles,
        //     ]);
        // } else {
        //     return redirect()->back()->withInput()->with('error', 'Business not found, please check the businesses number is correct.');
        // }

    }}


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