<?php

namespace App\Http\Controllers\Web;

use App\Models\Logo;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Banner;
use Stripe\StripeClient;
use App\Models\Restaurant;
use App\Models\UserStripe;
use App\Models\OpeningHour;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\CollectionTime;
use App\Packages\ImagePackage;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Geocoder\Facades\Geocoder;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\ImageManagerStatic as Image;


class AdminRestaurantsController extends Controller
{
    /**
     * Handle the incoming request to get all the restaurants.
     * The method will return all the restaurants in the database.
     * The method will return an inertia view with the restaurants.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {
        // Get all restaurants, paginate through them using the "perPage" parameter. Search through the restaurants, if the "search" parameter is present.
        $search = $request->search ?? null;

        if($search !== null){

            $restaurants = Restaurant::where('application_status', 'approved')
            ->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', '%' . $search . '%');
            })
            ->orderBy('name', 'asc')
            ->paginate(10);
        }
        else {

            $restaurants = Restaurant::where('application_status', 'approved')->paginate($request->perPage ?? 10);
        }

        return Inertia::render('MainAdmin/AdminRestaurants/Index', [
            'restaurants' => $restaurants,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

    /**
     * Handle the incoming request to create a restaurant.
     * The method will check if the user has the permission to create a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(){
        $restaurant = new Restaurant;

        $categories = RestaurantCategory::orderBy('name')->get();

        $restaurant->setAttribute('edit', false);

        $restaurant->setAttribute('categories', $categories);

        return Inertia::render('MainAdmin/AdminRestaurants/Create', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Handle the incoming request to store a restaurant.
     * The method will check if the user has the permission to create a permission.
     * The method will create a new restaurant.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        // Validate the data
        $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'category' => ['required', 'int', 'min: 0'],
            'address_line_1' => ['required', 'string', 'max:191'],
            'town' => ['required', 'string', 'max:191'],
            'county' => ['required', 'string', 'max:191'],
            'postcode' => ['required', 'string', 'max:191'],
            'contact_number' => ['required', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191', 'unique:users,email,'],
            'password' => ['nullable', 'confirmed', 'min:6'],
            "role" => "required|exists:roles,name",
        ]);

        // Get the role based on the name
        $role = Role::where('name', $request->role)->first();

        $stripe = new StripeClient(
            config('stripe.sk')
        );

        $stripeAccount = $stripe->accounts->create([
            'type' => 'standard',
            'country' => 'GB',
        ]);

        $restaurant = new Restaurant;

        $restaurant->stripe_account_id = $stripeAccount->id;
        $restaurant->stripe_status = 'incomplete';

        $restaurantAddress = $request->address_line_1 . ' ' . $request->address_line_2 . ', ' . $request->town . ', ' . $request->county . ', ' . $request->postcode;

        $addressResponse = Geocoder::getCoordinatesForAddress($restaurantAddress);

        if ($addressResponse['formatted_address'] != 'result_not_found') {
           $restaurant->latitude = $addressResponse['lat'];
           $restaurant->longitude = $addressResponse['lng'];
        } // Error

        // Create a model for this restaurant

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

        $restaurant->application_status = 'approved';

        $restaurant->contact_number = $request->contact_number;

        if ($request->company_drivers == "1") {
            $restaurant->company_drivers = 1;
        } else {
            $restaurant->company_drivers = 0;
        }

        if ($request->allows_table_orders == "1") {
            $restaurant->allows_table_orders = 1;
        } else {
            $restaurant->allows_table_orders = 0;
        }

        if ($request->allows_collection == "1") {
            $restaurant->allows_collection = 1;
        } else {
            $restaurant->allows_collection = 0;
        }

        if ($request->allows_delivery == "1") {
            $restaurant->allows_delivery = 1;
        } else {
            $restaurant->allows_delivery = 0;
        }
        if ($request->allows_call_center == "1") {
            $restaurant->allows_call_center = 1;
        } else {
            $restaurant->allows_call_center = 0;
        }

        if (!is_null($request->bio)) {
            $restaurant->bio = $request->bio;
        }


        // save the logo
        if ($request->hasFile('logo')) {
            $restaurant->logo = ImagePackage::save($request->logo, 'logos');
        }


        // save the banner
        if ($request->hasFile('banner')) {
            $restaurant->banner = ImagePackage::save($request->banner, 'banners');
        }


        // Save to the database
        $restaurant->save();

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 1,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 2,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 3,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 4,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 5,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 6,
        ]);

        OpeningHour::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 7,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 1,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 2,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 3,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 4,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 5,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 6,
        ]);

        CollectionTime::create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 7,
        ]);


        // Create a model for this User
        $user = new User;

        // Update the parameters
        $user->role_id = 2;
        $user->restaurant_id = $restaurant->id;
        $user->first_name = '';
        $user->last_name = '';
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

         // Save to the database
        $user->save();

        $user->attachRole($role);

        $stripeCustomerAccount = $stripe->customers->create([
            'email' => $user->email,
        ]);

        $stripeUser = new UserStripe;
        $stripeUser->user_id = $user->id;
        $stripeUser->stripe_account_id = $stripeCustomerAccount->id;

        $stripeUser->save();


        $subject = 'Account Details';
        if ($request->get('notify')) {
            $subject = 'Account Details';
            Mail::send('email.userwelcome', array(
              'name' => $request->first_name,
              'password' => $request->password,
              'email' => $request->email,
              'subject' => $subject,
            ), function ($message) use ($request, $subject) {
                $message->to($request->email);
                $message->subject($subject);
            });
        }

        return Redirect::route('admin-restaurants.index')->with('success', 'Restaurant created successfully.');

    }

    /**
     * Handle the incoming request to show a restaurant.
     * The method will check if the user has the permission to show a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Restaurant $restaurant){
        return Inertia::render('MainAdmin/AdminRestaurants/Show', [
            'restaurant' => $restaurant
        ]);

    }

    /**
     * Handle the incoming request to edit a restaurant.
     * The method will check if the user has the permission to edit a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Restaurant $restaurant){
         $categories = RestaurantCategory::orderBy('name')->get();
         $user = User::where('restaurant_id', $restaurant->id)->first();

         $restaurant->setAttribute('categories', $categories);
         $restaurant->setAttribute('edit', true);

        $url = '';//config('app.url');
        return Inertia::render('MainAdmin/AdminRestaurants/Edit', [
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
        $uid = $request->_userID;

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
            $restaurant->company_drivers = is_null($request->company_drivers) ? $restaurant->company_drivers : $request->company_drivers;
            $restaurant->allows_table_orders = is_null($request->allows_table_orders) ? $restaurant->allows_table_orders : $request->allows_table_orders;
            $restaurant->allows_collection = is_null($request->allows_collection) ? $restaurant->allows_collection : $request->allows_collection;
            $restaurant->allows_delivery = is_null($request->allows_delivery) ? $restaurant->allows_delivery : $request->allows_delivery;
            $restaurant->allows_call_center = is_null($request->allows_call_center) ? $restaurant->allows_call_center : $request->allows_call_center;
            $restaurant->logo = $request->hasFile('logo') ? ImagePackage::save($request->logo, 'logo') : $restaurant->logo;
            $restaurant->banner = $request->hasFile('banner') ? ImagePackage::save($request->banner, 'banner') : $restaurant->banner;
            $restaurant->save();

        return Redirect::route('admin-restaurants.index')->with('success', 'Restaurant updated successfully.');

    }

    /**
     * Handle the incoming request to delete a restaurant.
     * The method will check if the user has the permission to delete a permission.
     * The method will delete the restaurant.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Restaurant $restaurant){
        $restaurant->delete();

        return redirect()->back()->with('success', 'Restaurant deleted successfully.');
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
        return Redirect::route('admin-restaurants.edit',['restaurant'=>$restaurant->id])->with('success', 'Image removed successfully.');

    }

}