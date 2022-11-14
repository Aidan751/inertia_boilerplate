<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\Logo;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Banner;
use Stripe\StripeClient;
use App\Models\Restaurant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Packages\ImagePackage;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Spatie\Geocoder\Facades\Geocoder;
use Illuminate\Support\Facades\Redirect;


class ConfigurationController extends Controller
{
    /**
     * Handle the incoming request to edit a restaurant.
     * The method will check if the user has the permission to edit a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(){
        $restaurant = Restaurant::where('id', Auth::user()->restaurant_id)->first();

         $categories = RestaurantCategory::orderBy('name')->get();
         $user = User::where('restaurant_id', Auth::user()->restaurant_id)->first();

         $restaurant->setAttribute('categories', $categories);
         $restaurant->setAttribute('edit', true);

        return Inertia::render('RestaurantAdmin/Configurations/Edit', [
            'restaurant' => $restaurant,
            'user' => $user,
        ]);
    }

    /**
     * Handle the incoming request to update a restaurant.
     * The method will check if the user has the permission to update a permission.
     * The method will update the restaurant.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        // Validate the data
         $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'category' => ['required', 'int', 'min: 0'],
            'address_line_1' => ['required', 'string', 'max:191'],
            'address_line_2' => ['nullable', 'string', 'max:191'],
            'town' => ['required', 'string', 'max:191'],
            'minimum_order_value' => ['required'],
            'service_charge' => ['required'],
            'average_delivery_time' => ['required', 'string'],
            'county' => ['required', 'string', 'max:191'],
            'postcode' => ['required', 'string', 'max:191'],
        ]);
        // Find the model for this ID
        $restaurant = Restaurant::find($id);
        $restaurantAddress = $request->address_line_1 . ' ' . $request->address_line_2 . ', ' . $request->town . ', ' . $request->county . ', ' . $request->postcode;

        $addressResponse = Geocoder::getCoordinatesForAddress($restaurantAddress);

        if ($addressResponse['formatted_address'] != 'result_not_found') {
            $restaurant->latitude = $addressResponse['lat'];
            $restaurant->longitude = $addressResponse['lng'];
        } // Error



        $user = User::where('restaurant_id', $id)->first();

        $sendEmail = false;

        if ($user != null) {
            if ($request->email != $user->email) {
                $user->email = $request->email;
                $sendEmail = true;
            }

            if (!is_null($request->password)) {
                $user->password = bcrypt($request->password);
                $sendEmail = true;
            }

            $user->save();

            if ($sendEmail == true) {
                // Notify users their details have changed
                $subject = 'Account Details';
                Mail::send('email.userupdated', array(
                  'name' => $user->first_name,
                  'password' => $request->password,
                  'email' => $request->email,
                  'subject' => $subject,
                ), function ($message) use ($request, $subject) {
                    $message->to($request->email);
                    $message->subject($subject);
                });
            }
        } else {

            $newUser = new User;
            $newUser->email = $request->email;
            $newUser->role_id = 2;
            $password = '';

            if (!is_null($request->password)) {
                $password = $request->password;
                $newUser->password = bcrypt($request->password);
            } else {
                $password = Str::random(8);
                $newUser->password = bcrypt($password);
            }

            $newUser->first_name = '';
            $newUser->last_name = '';
            $newUser->restaurant_id = $restaurant->id;

            $newUser->save();

            $subject = 'Account Details';
            Mail::send('email.userwelcome', array(
                'name' => '',
                'password' => $password,
                'email' => $request->email,
                'subject' => $subject,
            ), function ($message) use ($request, $subject) {
                $message->to($request->email);
                $message->subject($subject);
            });
        }

        // Update the model
        $restaurant->name = is_null($request->name) ? $restaurant->name : $request->name;
        $restaurant->restaurant_category_id = is_null($request->category) ? $restaurant->category_id : $request->category;
        $restaurant->address_line_1 = is_null($request->address_line_1) ? $restaurant->address_line_1 : $request->address_line_1;
        $restaurant->address_line_2 = is_null($request->address_line_2) ? $restaurant->address_line_2 : $request->address_line_2;
        $restaurant->town = is_null($request->town) ? $restaurant->town : $request->town;
        $restaurant->county = is_null($request->county) ? $restaurant->county : $request->county;
        $restaurant->postcode = is_null($request->postcode) ? $restaurant->postcode : $request->postcode;
        $restaurant->contact_number = is_null($request->contact_number) ? $restaurant->contact_number : $request->contact_number;
        $restaurant->front_facing_number = is_null($request->front_facing_number) ? $restaurant->front_facing_number : $request->front_facing_number;
        $restaurant->bio = is_null($request->bio) ? $restaurant->bio : $request->bio;
        $restaurant->minimum_order_value = is_null($request->minimum_order_value) ? $restaurant->minimum_order_value : $request->minimum_order_value;
        $restaurant->delivery_charge = is_null($request->delivery_charge) ? $restaurant->delivery_charge : $request->delivery_charge;
        $restaurant->average_delivery_time = is_null($request->average_delivery_time) ? $restaurant->average_delivery_time : $request->average_delivery_time;
        $restaurant->service_charge = is_null($request->service_charge) ? $restaurant->service_charge : $request->service_charge;
        $restaurant->company_drivers = is_null($request->company_drivers) ? $restaurant->company_drivers : $request->company_drivers;
        $restaurant->allows_table_orders = is_null($request->allows_table_orders) ? $restaurant->allows_table_orders : $request->allows_table_orders;
        $restaurant->allows_collection = is_null($request->allows_collection) ? $restaurant->allows_collection : $request->allows_collection;
        $restaurant->allows_delivery = is_null($request->allows_delivery) ? $restaurant->allows_delivery : $request->allows_delivery;
        $restaurant->allows_call_center = is_null($request->allows_call_center) ? $restaurant->allows_call_center : $request->allows_call_center;
        $restaurant->logo = $request->hasFile('logo') ? ImagePackage::save($request->logo, 'logo') : $restaurant->logo;
        $restaurant->banner = $request->hasFile('banner') ? ImagePackage::save($request->banner, 'banner') : $restaurant->banner;

            // save the restaurant
            $restaurant->save();
        return Redirect::route('my.restaurant.edit')->with('success', 'Restaurant updated successfully.');

    }



        /**
     * Remove Restaurant Image from the database
     * @param \Illuminate\Http\Request $request
     * @param \App\Restaurant $restaurant
     * @return \Illuminate\Http\Response
     */
    public function removeImage(Request $request, Restaurant $restaurant){

        $request->validate([
            "image_type" => "required|in:logo,banner",
        ]);

        if($request->image_type == "logo"){
            if($restaurant->logo !== null){
                ImagePackage::delete($restaurant->logo);
                $restaurant->logo = null;
            }
        }
        else{
            if($restaurant->banner !== null){
                ImagePackage::delete($restaurant->banner);
                $restaurant->banner = null;
            }
        }

        $restaurant->save();
        return Redirect::route('my.restaurant.edit')->with('success', 'Image removed successfully.');

    }


}