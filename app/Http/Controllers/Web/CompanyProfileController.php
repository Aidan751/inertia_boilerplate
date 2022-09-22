<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\RestaurantCategory;
use Spatie\Geocoder\Facades\Geocoder;
use Illuminate\Support\Facades\Auth;

class CompanyProfileController extends Controller

{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return redirect()->route('restaurant.profile.edit', 1);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        // Find the model for this ID
        $restaurant = Restaurant::with('media')->find(1);

        $categories = RestaurantCategory::orderBy('name')->get();

        $restaurant->setAttribute('categories', $categories);
        $restaurant->setAttribute('edit', true);

        $logo = $restaurant->getMedia('logos');
        $banner = $restaurant->getMedia('banners');

        $url =  '';//config('app.url');

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


        // Load the view
        return view('restaurant.profile.edit', compact('restaurant'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

         // Validate the data
         $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'category' => ['required', 'int', 'min: 0'],
            'address_line_1' => ['required', 'string', 'max:191'],
            'town' => ['required', 'string', 'max:191'],
            'county' => ['required', 'string', 'max:191'],
            'postcode' => ['required', 'string', 'max:191'],
            'contact_number' => ['required', 'string', 'max:191'],
            'minimum_order_value' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'delivery_charge' => ['nullable', 'regex:/^\d+(\.\d{1,2})?$/'],
        ]);

        // Find the model for this ID
        $restaurant = Restaurant::find(1);

        $restaurantAddress = $request->address_line_1 . ' ' . $request->address_line_2 . ', ' . $request->town . ', ' . $request->county . ', ' . $request->postcode;

        $addressResponse = Geocoder::getCoordinatesForAddress($restaurantAddress);

        if ($addressResponse['formatted_address'] != 'result_not_found') {
           $restaurant->latitude = $addressResponse['lat'];
           $restaurant->longitude = $addressResponse['lng'];
        } // Error

        // Update the parameters
        $restaurant->name = $request->name;
        $restaurant->restaurant_category_id = $request->category;
        $restaurant->address_line_1 = $request->address_line_1;
        if (!is_null($request->address_line_2)) {
            $restaurant->address_line_2 = $request->address_line_2;
        }
        $restaurant->town = $request->town;
        $restaurant->county = $request->county;
        $restaurant->postcode = $request->postcode;

        $restaurant->contact_number = $request->contact_number;

        if ($request->company_drivers == "1") {
            $restaurant->company_drivers = 1;
        } else {
            $restaurant->company_drivers = 0;
        }

        if ($request->table_service == "1") {
            $restaurant->allows_table_orders = 1;
        } else {
            $restaurant->allows_table_orders = 0;
        }

        if ($request->collection_service == "1") {
            $restaurant->allows_collection = 1;
        } else {
            $restaurant->allows_collection = 0;
        }

        if ($request->delivery_service == "1") {
            $restaurant->allows_delivery = 1;
        } else {
            $restaurant->allows_delivery = 0;
        }

        if (!is_null($request->bio)) {
            $restaurant->bio = $request->bio;
        }

        if (!is_null($request->delivery_charge)) {
            $restaurant->delivery_charge = $request->delivery_charge;
        }

        if (!is_null($request->average_delivery_time)) {
            $restaurant->average_delivery_time = $request->average_delivery_time;
        }

        $restaurant->minimum_order_value = $request->minimum_order_value;

        // Save to the database
        $restaurant->save();

        if (!is_null($request->logo)) {
            $restaurant->addMediaFromRequest('logo')->toMediaCollection('logos');
        }

        if (!is_null($request->banner)) {
            $restaurant->addMediaFromRequest('banner')->toMediaCollection('banners');
        }


        // Redirect and inform the restaurant
        return redirect()->route('restaurant-profile.edit', 1)->with('success', 'Profile updated.');
    }


}