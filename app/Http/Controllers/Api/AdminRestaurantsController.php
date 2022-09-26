<?php

namespace App\Http\Controllers\Api;

use App\Models\Logo;
use App\Models\User;
use App\Models\Banner;
use Stripe\StripeClient;
use App\Models\Restaurant;
use App\Models\UserStripe;
use Illuminate\Http\Request;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Spatie\Geocoder\Facades\Geocoder;

class AdminRestaurantsController extends Controller
{
    /**
     * Handle the incoming request to get all the restaurant.
     * The method will return all the restaurants in the database.
     * The method will check if the user has the restaurant to get all the permissions.
     * The method will return a json response with the restaurants.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
            // Get all the restaurants
            $restaurants = Restaurant::all();

            // Return a json response with the permissions
            return response()->json($restaurants,200);
        
    }

    /**
     * Handle the incoming request to get a restaurant.
     * The method will return a restaurant with the id passed in the request.
     * The method will check if the user has the restaurant to get a permission.
     * The method will return a json response with the restaurant.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function show(Request $request, $id){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for restaurants
        $request->validate([
            'id' => 'required|integer|exists:restaurants,id'
        ]);
        
        // Get the restaurant $object with the id passed in the request
        $restaurant = Restaurant::find($id);
        if(!empty($restaurant))
        {
            return response()->json($restaurant);
        }
        else
        {
            return response()->json([
                "message" => "Restaurant not found"
            ], 404);
        }

       
             
     }

        

    /**
     * Handle the incoming request to create a restaurant.
     * The method will create a restaurant with the name passed in the request.
     * The method will check if the user has the restaurant to create a permission.
     * The method will return a json response with the restaurant.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request){

            // Validate the data
            $request->validate([
               'name' => ['required', 'string', 'max:191'],
               'category' => ['required', 'int', 'min: 0'],
               'address_line_1' => ['required', 'string', 'max:191'],
               'address_line_2' => ['nullable', 'string', 'max:191'],
               'town' => ['required', 'string', 'max:191'],
               'county' => ['required', 'string', 'max:191'],
               'postcode' => ['required', 'string', 'max:191'],
               'contact_number' => ['required', 'string', 'max:191'],
               'email' => ['required', 'email', 'max:191', 'unique:users,email,'],
               'password' => ['nullable', 'confirmed', 'min:6'],
           ]);
   
           $stripe = new StripeClient(
               config('services.stripe_secret_key')
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
   
   
           // Save to the database
           $restaurant->save();
   
           //    save the banner
           if ($request->hasFile('banner')) {
               $restaurant->banner()->create([
                   "img_url" => $request->file('banner')->store('public/restaurants/' . $restaurant->id . '/banners'),
               ]);
   
          
           }
   
   
           //    save the logo
           if ($request->hasFile('logo')) {
               $restaurant->logo()->create([
                   "img_url" => $request->file('logo')->store('public/restaurants/' . $restaurant->id . '/logos'),
               ]);
           }
   
   
           // Create a model for this User
           $user = new User;
   
           // Update the parameters
           $user->role_id = 4;
           $user->restaurant_id = $restaurant->id;
           $user->first_name = '';
           $user->last_name = '';
           $user->email = $request->email;
           $user->password = bcrypt($request->password);
   
            // Save to the database
           $user->save();
   
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
   
   
                //  display logo
              $restaurant->logo = $restaurant->logo()->first();
              $restaurant->banner = $restaurant->banner()->first();
    
            
      

          return response()->json([
            "message" => "Restaurant Added.",
            "restaurant" => $restaurant,
        ], 201);
       
    }

        /**
     * Handle the incoming request to edit a restaurant.
     * The method will check if the user has the permission to edit a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit($id){
        // Find the model for this ID
        $restaurant = Restaurant::find($id);
        $user = User::where('restaurant_id', $restaurant->id)->first();
        $logo = Logo::where('restaurant_id', $restaurant->id)->first();
        $banner = Banner::where('restaurant_id', $restaurant->id)->first();
        $categories = RestaurantCategory::orderBy('name')->get();

        $restaurant->setAttribute('categories', $categories);
        $restaurant->setAttribute('edit', true);
        $url = '';//config('app.url');

      
       return response()->json([
            "message" => "Restaurant Edit Page.",
            "restaurant" => $restaurant,
        ], 201);
   }
    

    /**
     * Handle the incoming request to update a restaurant.
     * The method will update a restaurant with the id and name passed in the request.
     * The method will return a json response with the restaurant.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request){

        // Validate the request 
        
         if (Restaurant::where('id', $id)->exists()) {
              // Update the model Restaurant in the database
              return response()->json([
                  "message" => "Restaurant Updated."
              ], 404);
          }else{
              return response()->json([
                  "message" => "Restaurant Not Found."
              ], 404);
          }}
        

         /**
     * Handle the incoming request to delete a restaurant.
     * The method will delete a restaurant with the id passed in the request.
     * The method will check if the user has the permission to delete a restaurant.
     * The method will return a json response with the restaurant.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        if(Restaurant::where('id', $id)->exists()) {
            $restaurant = Restaurant::find($id);
            $restaurant->delete();

            return response()->json([
              "message" => "record deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "Restaurant not found."
            ], 404);
        }


    }

}