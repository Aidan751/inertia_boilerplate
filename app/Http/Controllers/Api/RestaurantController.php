<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Restaurant;
use App\Models\RestaurantCategory;
use App\Models\Configuration;
use App\Models\User;
use App\Models\UserStripe;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Spatie\Geocoder\Facades\Geocoder;
use Illuminate\Support\Str;


class RestaurantController extends Controller
{
    public function categories(Request $request) {
        $query = RestaurantCategory::with('restaurant', 'subCategories', 'subCategories.subCategories')->whereHas('restaurant',function ($query)  {
       })
        // has('restaurant')
        ->get()->sortBy('name')->values();

        return response($query, 200);
    }

    public function allCategories(Request $request) {
        $query = RestaurantCategory::get()->sortBy('name')->values();

        return response($query, 200);
    }

    public function get($id, Request $request)
    {
        $time = $request->time . ":01"; // Adding a second due to issue not retrieving correct time when is exact opening time
        $day = $request->day;

        $latitude = $request->latitude;
        $longitude = $request->longitude;

        // Attempt to find the document
        $restaurant = Restaurant::with( ['media','tableNumbers', 'collectionTimes', 'offers', 'menuCategories', 'openingHours' => function($query) use ($day, $time) {
            $query->where('day_id', $day)->whereTime('from', '<=', $time)->whereTime('to', '>', $time);
        }])

        ->where('id', $id)->firstOrFail();

        $logo = $restaurant->getMedia('logos');
        $banner = $restaurant->getMedia('banners');
        $url =  '';//config('app.url');
        $googleApiKey = config('geocoder.key');

        if(!$logo->isEmpty()){
            $restaurant->setAttribute('logo', $url . $logo[0]->getFullUrl());
        }
        else{
            $restaurant->setAttribute('logo', null);
        }

        foreach ($restaurant->offers as $offer) {
            $logo = $offer->getMedia('offers');
            if(!$logo->isEmpty()){
                $offer->setAttribute('logo', $url . $logo[0]->getFullUrl());
            }
            else{
                $offer->setAttribute('logo', null);
            }
        }

        if(!$banner->isEmpty()){
            $restaurant->setAttribute('banner', $url . $banner[0]->getFullUrl());
        }
        else{
            $restaurant->setAttribute('banner', null);
        }

        if ($restaurant->company_drivers == 1) {
            $configurations = Configuration::get()->toArray();
            $google = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' . $latitude . ',' . $longitude . '&destinations=' . $restaurant->latitude . ',' . $restaurant->longitude . '&key=' . $googleApiKey;

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


        if ($restaurant === null) {
            return response()->json([
                "message" => "Restaurant does not exist"
            ], 401);
        } else {
            return response($restaurant, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        $stripeAccount = $stripe->accounts->create([
            'type' => 'standard',
            'country' => 'GB',
        ]);

        $restaurant = new Restaurant;

        $restaurant->stripe_account_id = $stripeAccount->id;
        $restaurant->stripe_status = 'incomplete';

        $restaurantAddress = $request->addressLine1 . ' ' . $request->addressLine2 . ', ' . $request->town . ', ' . $request->county . ', ' . $request->postcode;

        $addressResponse = Geocoder::getCoordinatesForAddress($restaurantAddress);

        if ($addressResponse['formatted_address'] != 'result_not_found') {
           $restaurant->latitude = $addressResponse['lat'];
           $restaurant->longitude = $addressResponse['lng'];
        } else {
            return response()->json([
                "message" => "Address not found",
            ], 404);
        }

        // Create a model for this restaurant

        // Update the parameters
        $restaurant->name = $request->restaurantName;

        $restaurant->restaurant_category_id = $request->category;

        $restaurant->address_line_1 = $request->addressLine1;
        if (!is_null($request->addressLine2)) {
            $restaurant->address_line_2 = $request->addressLine2;
        }
        $restaurant->town = $request->town;
        $restaurant->county = $request->county;
        $restaurant->postcode = $request->postcode;
        $restaurant->application_status = 'pending';
        $restaurant->contact_number = $request->contact;
        $restaurant->company_drivers = 0;
        $restaurant->allows_table_orders = 0;
        $restaurant->allows_collection = 0;
        $restaurant->allows_delivery = 0;
        if (!is_null($request->bio)) {
            $restaurant->bio = $request->bio;
        }

        // Save to the database
        $restaurant->save();

        if (!is_null($request->logo)) {
            $logoName = md5('restaurantrequestlogo'. time()) . '.jpeg';
            Storage::disk('public')->put($logoName, $request->logo);
            $restaurant->addMediaFromDisk($logoName, 'public')->toMediaCollection('logos');
        }

        if (!is_null($request->banner)) {
            $bannerName = md5('restaurantrequestbanner'. time()) . '.jpeg';
            Storage::disk('public')->put($bannerName, $request->banner);
            $restaurant->addMediaFromDisk($bannerName, 'public')->toMediaCollection('banners');
        }

        // Create a model for this User
        $user = new User;

        // Update the parameters
        $user->role_id = 4;
        $user->restaurant_id = $restaurant->id;
        $user->first_name = $request->name;
        $user->last_name = '';
        $user->email = $request->email;
        $password = Str::random(8);
        $user->password = bcrypt($password);

         // Save to the database
        $user->save();

        $stripeCustomerAccount = $stripe->customers->create([
            'email' => $user->email,
        ]);

        $stripeUser = new UserStripe;
        $stripeUser->user_id = $user->id;
        $stripeUser->stripe_account_id = $stripeCustomerAccount->id;

        $stripeUser->save();

        return response()->json([
            "message" => "Restaurant application created",
        ], 200);
    }

    public function email(Request $request) {

        $logoName = md5('restaurantrequestlogo'. time()) . '.jpeg';
        $bannerName = md5('restaurantrequestbanner'. time()) . '.jpeg';

        Storage::disk('public')->put($logoName, $request->logo);
        Storage::disk('public')->put($bannerName, $request->banner);

        $subject = 'Restaurant Registration Request';

        $mailTo =   config('services.restaurant_request_email');

        Mail::send('email.restaurant', array(
            'name' => $request->name,
            'contact' => $request->contact,
            'email' => $request->email,
            'restaurantName' => $request->restaurantName,
            'logo' =>  config('app.url') . '/storage' . '/' . $logoName,
            'banner' =>  config('app.url'). '/storage' . '/' .  $bannerName,
            'addressLine1' => $request->addressLine1,
            'addressLine2' => $request->addressLine2,
            'town' => $request->town,
            'county' => $request->county,
            'postcode' => $request->postcode,
            'category' => $request->category,
            'bio' => $request->bio,
            'subject' => $subject,
        ), function ($message) use ($request, $subject, $mailTo) {
            $message->to($mailTo);
            $message->subject($subject);
        });

        return response()->json([
            "message" => "Request sent",
        ], 200);
    }

    // Display every company, filtered by pick up methods, filtered by categories

    public function list(Request $request) {

        $orderMethod = $request->order_method;

        $radius = 150; // Radius in miles
        $latitude = $request->latitude;
        $longitude = $request->longitude;
        $filter = $request->category;
        // $day = $request->day;
        // $timeRequest = $request->time;
        // $time = "";
        $configurations = Configuration::get()->toArray();

        // if ($timeRequest == null || $timeRequest == "") {
        //     $time = Carbon::now();
        // } else {
        //     $time =  Carbon::createFromTimeString($timeRequest);
        // }

        $limit = intval($request->limit);

        $query = Restaurant::with(['media', 'tableNumbers', 'collectionTimes','openingHours'])
        ->where(function ($query) use ($orderMethod) {
            if ($orderMethod == 'delivery') {
                $query->where('allows_delivery', 1);
            } else if ($orderMethod == "table") {
                $query->where('allows_table_orders', 1);
            } else {
                $query->where('allows_collection', 1);
            }
        })
        //  => function($query) use ($day, $time) {
        //     $query->where('day_id', $day)->whereTime('from', '<=', $time)->whereTime('to', '>', $time);
        // }])
        // ->whereHas('openingHours',function ($query) use ($day, $time) {
        //      $query->where('day_id', $day)->whereTime('from', '<=', $time)->whereTime('to', '>', $time);
        // })
        ->where('application_status', 'approved')
        ->where('stripe_status', 'complete')
            ->isWithinMaxDistance($latitude, $longitude, $radius)
            ->when($filter != null && $filter != 0, function($query) use ($filter) {

                return $query->where('restaurant_category_id', '=', $filter);
              })
            ->paginate($limit);
            $url = '';//env('APP_URL', '');
            $googleApiKey = config('geocoder.key');

            foreach ($query as $restaurant) {
                $logo = $restaurant->getMedia('logos');
                $banner = $restaurant->getMedia('banners');


                if(!$logo->isEmpty()){
                    $restaurant->setAttribute('logo', $url . $logo[0]->getFullUrl());
                }
                else{
                    $restaurant->setAttribute('logo', null);
                }

                if(!$banner->isEmpty()){
                    $restaurant->setAttribute('banner', $url . $banner[0]->getFullUrl());
                }
                else{
                    $restaurant->setAttribute('banner', null);
                }



                if ($restaurant->company_drivers == 1) {

                    $google = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' . $latitude . ',' . $longitude . '&destinations=' . $restaurant->latitude . ',' . $restaurant->longitude . '&key=' . $googleApiKey;

                    $res = Http::get($google);
                    $responseBody = json_decode($res->body(), true);

                    $distanceInMiles = ceil($responseBody['rows'][0]['elements'][0]['distance']['value'] *  0.00062137);
                    $timeInMinutes = ceil($responseBody['rows'][0]['elements'][0]['duration']['value'] / 60);


                    //  $fee = $this->roundUpToAny
                    $fee = (($timeInMinutes * $configurations[1]['price']) + ($distanceInMiles * $configurations[0]['price']));
                    $roundedFee = round($fee, 2);
                    $restaurant->setAttribute('delivery_charge', $roundedFee);
                    $restaurant->setAttribute('time_in_minutes', $timeInMinutes);
                    $restaurant->setAttribute('distance_in_miles', $distanceInMiles);
                }
            }
        return response($query, 200);
    }

      /**
     * follow a restaurant
     * @param Request $request
     * @return \Illuminate\Http\Response
     */

    public function follow(Request $request, Restaurant $restaurant)
    {
        $user = auth()->user();
        $restaurant = Restaurant::find($restaurant->id);

        if ($restaurant == null) {
            return response()->json([
                "message" => "Restaurant not found",
            ], 404);
        }

        $user->follow($restaurant);

        return response()->json([
            "message" => "Restaurant followed",
        ], 200);
    }
}