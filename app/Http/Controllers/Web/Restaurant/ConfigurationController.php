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
        $banner = Banner::where('restaurant_id', Auth::user()->restaurant_id)->first();
        $logo = Logo::where('restaurant_id', Auth::user()->restaurant_id)->first();

         $categories = RestaurantCategory::orderBy('name')->get();
         $user = User::where('restaurant_id', Auth::user()->restaurant_id)->first();

         $restaurant->setAttribute('categories', $categories);
         $restaurant->setAttribute('banner', $banner);
         $restaurant->setAttribute('logo', $logo);
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
            'town' => ['required', 'string', 'max:191'],
            'county' => ['required', 'string', 'max:191'],
            'postcode' => ['required', 'string', 'max:191'],
            'password' => ['nullable', 'confirmed', 'min:6'],
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

        $restaurant->update([
            'name' => $request->name,
            'restaurant_category_id' => $request->category,
            'address_line_1' => $request->address_line_1,
            'address_line_2' => $request->address_line_2,
            'bio' => $request->bio,
            'application_status' => "approved",
            'allows_table_orders' => $request->allows_table_orders,
            'allows_collection' => $request->allows_collection,
            'allows_delivery' => $request->allows_delivery,
            'allows_call_center' => $request->allows_call_center,
            'town' => $request->town,
            'county' => $request->county,
            'postcode' => $request->postcode,
            'contact_number' => $request->contact_number,
        ]);

             // update the logo
             if ($request->hasFile('logo')) {
                $restaurant->logo()->update([
                    "img_url" => ImagePackage::save($request->logo, 'restaurant_logo'),
                ]);
            }

            // update the banner
            if ($request->hasFile('banner')) {
                $restaurant->banner()->update([
                    "img_url" => ImagePackage::save($request->banner, 'restaurant_banner'),
                ]);
            }


        return Redirect::route('my.restaurant.edit')->with('success', 'Restaurant updated successfully.');

    }

}