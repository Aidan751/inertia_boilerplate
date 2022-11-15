<?php

namespace App\Http\Controllers\Web\CallCentre;
use Twilio\Rest\Client;
use Exception;
use Carbon\Carbon;
use App\Models\Day;
use App\Models\Size;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use Nette\Utils\DateTime;
use App\Models\Restaurant;
use App\Models\OpeningHour;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use App\Packages\TimeFormat;
use Illuminate\Http\Request;
use App\Models\Configuration;
use App\Models\GroupDealItem;
use App\Packages\GeocoderPackage;
use App\Models\GroupDealSingleItem;
use App\Http\Controllers\Controller;
use App\Packages\TwilioPackage;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Session\Session;

class OrderController extends Controller
{

      /**
        * Display a listing of the resource.
        *
        * @return \Illuminate\Http\Response
        */

        // create order
        public function search(Request $request, $id)
        {
            $user = User::find($id);
            return Inertia::render('CallCentreAdmin/Orders/Search', [
                'user' => $user,
            ]);
        }

        // add group deal to order
        public function addDeal(Request $request, $id)
        {
            $order = new Order();
            $group_deal = GroupDeal::find($id);
            session(['group_deal' => $group_deal]);
            session(['order' => $order]);
            $selected_items = session('selected_items');
            session()->put('selected_items', json_decode($request->selected_items));
            $group_deal->load('groupDealItems.groupDealSingleItems.menuItem');
            $restaurant = session('restaurant');

            // render add view with the group deal items
            return Inertia::render('CallCentreAdmin/Orders/AddDeal', [
                'groupDeal' => $group_deal,
                'restaurant' => $restaurant,
                'selected_items' => json_decode($request->selected_items),
            ]);

        }

        // choose size and extras for the group deal
        public function chooseSizes(Request $request, $id)
        {

            $group_deal_single_item = GroupDealSingleItem::where('menu_item_id', $id)->first();

            $group_deal_single_item->load('menuItem');

            session(['group_deal_single_item' => $group_deal_single_item]);

            $restaurant = session('restaurant');

            $group_deal = session('group_deal');

            $group_deal->load("groupDealItems.groupDealSingleItems.menuItem.extras");
            $group_deal->load("groupDealItems.groupDealSingleItems.menuItem.sizes");

            $menu_items = $group_deal_single_item->menuItem;
            $menu_items->load('extras');
            $menu_items->load('sizes');
            return Inertia::render('CallCentreAdmin/Orders/ChooseDeal', [
                'group_deal_single_item' => $group_deal_single_item,
                'restaurant' => $restaurant,
                'group_deal' => $group_deal,
                "menu_items" => $menu_items,
            ]);
        }


        public function placeOrder(Request $request) {

            $reference = Str::random();

            if(Order::where('order_reference', $reference)->exists()) {
                $reference = Str::random();
            }

            $restaurant = Restaurant::where('id', session()->get('restaurant')->id)->first();

            if ($restaurant == null) {
                return response('fail', 404);
            } else {
                $stripe = new \Stripe\StripeClient(
                    config('services.stripe_secret_key')
                );

                // Amount includes delivery fee
                $total = $request->total_price;

                $amount = round((doubleval($total) * 100), 2);

                $percentageTransaction = 15;

                $deliveryFeeAmount = session('restaurant')->delivery_charge * 100;

                // Application fee does not include delivery fee
                $applicationFeeAmount = round((($amount - $deliveryFeeAmount)  / $percentageTransaction), 2);

                if (session('restaurant')->company_drivers == 1) {
                    // Client gets application fee + delivery charge
                    $applicationFeeAmount = $applicationFeeAmount + $deliveryFeeAmount;
                }

                $order = Order::create([
                    "order_reference" => $reference,
                   "pickup_date" => date("Y-m-d H:i:s", strtotime(session('restaurant')->time_slot)),
                   "time_slot" => session('restaurant')->time_slot,
                   "price" => doubleval($total),
                   "delivery_price" => session('restaurant')->delivery_charge,
                   "payment_method" => "card",
                   "order_method" => "call",
                   "pickup_method" => session('restaurant')->chosen_order_type,
                   "status" => 'pending',
                   "payment_status" => 'pending',
                   "customer_name" => session('restaurant')->customer_name,
                   "customer_contact_number" => session('restaurant')->customer_contact_number,
                   "call_centre_id" => Auth::user()->id,
                   "user_id" =>  Auth::user()->id,
                   "address_line_1" => session('restaurant')->address_line_1 ?? null,
                   "town" => session('restaurant')->town ?? null,
                   "county" => session('restaurant')->county ?? null,
                   "postcode" => session('restaurant')->postcode ?? null,
                   "address" => session('restaurant')->address ?? null,
                   "latitude" => session('restaurant')->userLatitude ?? null,
                   "longitude" => session('restaurant')->userLongitude ?? null,
                   "restaurant_id" => session('restaurant')->id,
                   "table_number" => session('restaurant')->table_number ?? null,

                ]);
                $itemsArray = [];
                $lineItemArray = [];
                foreach ($request->selected_items as $item) {

                    $size = "";

                    if ($item['size'] != null) {
                        foreach($item['size'] as $sizeItem) {
                            $size = $sizeItem['name'] . " " . $sizeItem['additional_charge'] . " /n";
                        }
                    }

                    $extras = "";

                    if ($item['extra'] != null) {
                        foreach($item['extra'] as $extraItem) {
                            $extras = $extras . $extraItem['name'] . " " . $extraItem['additional_charge'] . " /n";
                        }
                    }

                    array_push($lineItemArray, [
                        'price_data' => [
                            'currency' => 'gbp',
                            'product_data' => [
                              'name' => $item['menu_item']['title'],
                            ],
                            'unit_amount' => $item['menu_item']['price'] * 100,
                          ],
                          'quantity' => floatval($item['menu_item']['quantity']),
                    ]);

                    array_push($itemsArray, [
                                'price_data' => [
                                  'currency' => 'gbp',
                                  'product_data' => [
                                    'name' => $item['menu_item']['title'],
                                    'sizes' => $item['size'],
                                    'extras' => $item['extra'],
                                    'description' => $item['menu_item']['description'],
                                    'dietary_requirements' => $item['menu_item']['dietary_requirements'],
                                    'notes' => $item['menu_item']['notes'],
                                  ],
                                  'unit_amount' => $item['menu_item']['price'] * 100,
                                ],
                                'quantity' => floatval($item['menu_item']['quantity']),


                ]);
                }

                try {
                    foreach($itemsArray as $item){
                        $price = $item['price_data']['unit_amount'];

                        foreach($item['price_data']['product_data']['sizes'] as $size) {
                            $price = $price + floatval($size['additional_charge']);
                        }

                        foreach($item['price_data']['product_data']['extras'] as $extra) {
                            $price = $price + floatval($extra['additional_charge']);
                        }

                        $order->items()->updateOrCreate([
                            'item_id' => 0, //TODO Not needed for now
                            'title' => $item['price_data']['product_data']['name'],
                            'item_price' => $price,
                            'total_price' => floatval($price * $item['quantity']),
                            'data' => [
                                'description' => $item['price_data']['product_data']['description'],
                                'dietary_requirements' => $item['price_data']['product_data']['dietary_requirements'],
                                'notes' => $item['price_data']['product_data']['notes'],
                                'sizes' => $item['price_data']['product_data']['sizes'],
                                'extras' => $item['price_data']['product_data']['extras'],
                            ],
                            'quantity' => $item['quantity'],
                            'notes' => $item['price_data']['product_data']['notes'],
                        ]);

                        dd($order->items);

                    }




                    \Stripe\Stripe::setApiKey(config('services.stripe_secret_key'));
                    $restaurantStripe = session('restaurant')->stripe_account_id;
                    $appURL = config('app.url');

                    if ($order->pickup_method == 'delivery') {
                        $session = \Stripe\Checkout\Session::create([

                        'shipping_address_collection' => [
                            'allowed_countries' => ['GB'],
                          ],
                          'shipping_options' => [

                            [
                              'shipping_rate_data' => [
                                'type' => 'fixed_amount',
                                'fixed_amount' => [
                                  'amount' => session('restaurant')->delivery_charge * 100,
                                  'currency' => 'gbp',
                                ],
                                'display_name' => 'Distance calculated charge',
                              ]
                            ],
                          ],
                        'line_items' => [

                            $lineItemArray

                        ],
                        'mode' => 'payment',
                        'payment_intent_data' => [
                          'capture_method' => 'manual',
                        ],
                        'success_url' => $appURL .  '/stripe/confirm?ref=' . $order->order_reference,
                        'cancel_url' => $appURL .  '/stripe/cancel',
                      ], ['stripe_account' => $restaurantStripe]);
                    } else {
                        $session = \Stripe\Checkout\Session::create([
                            'line_items' => [

                               $lineItemArray,

                            ],
                            'mode' => 'payment',
                            'payment_intent_data' => [
                              'capture_method' => 'manual',
                            ],
                            'success_url' => $appURL . '/stripe/confirm?ref=' . $order->order_reference,
                            'cancel_url' => $appURL . '/stripe/cancel',
                          ],  ['stripe_account' => $restaurantStripe]);
                    }

                    $order->payment_intent_id = $session->payment_intent;
                    $order->save();

                    $twilio = TwilioPackage::sendSMS($restaurant->customer_contact_number,"To complete your OrderIt order, please make your payment at the following URL: ". $session->url);

                    // event(new OrderAdded($order->restaurant_id));

                    session()->forget('cart');
                    session()->forget('restaurant');
                    return redirect()->route('call-centre.orders.search', ['id' => Auth::user()->id])->with('success', 'Order placed and SMS sent.');

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
            }
        }

        public function updateItems(Request $request)
        {
            $group_deal = session('group_deal')->load('groupDealItems.groupDealSingleItems.menuItem');
            $restaurant = session('restaurant');
            $group_deal_single_item = session('group_deal_single_item');
            $menu_item = MenuItem::where('id', $group_deal_single_item->menu_item_id)->first();
            $new_selected_size = array();
            $new_selected_extra = array();
            $notes = "";
            $quantity = 1;
            $menu_item->setAttribute('notes', $notes);
            $menu_item->setAttribute('quantity', $quantity);
            $menu_item_sizes = $menu_item->sizes()->get();
            $menu_item_extras = $menu_item->extras()->get();
            // loop through sizes and add those sizes to the new selected size array
            if($menu_item_sizes){
            foreach($menu_item_sizes as $size){
                if($size['id'] == $request->size){
                    $size['additional_charge'] = floatval($size['additional_charge']);
                    array_push($new_selected_size, $size);
                }
            }
        }



        if($menu_item_extras){
            // loop through extras and add those extras to the new selected extra array
            foreach($menu_item_extras as $extra){

                foreach($request->extra as $extra_id){
                    if($extra['id'] == $extra_id){
                        $extra['additional_charge'] = floatval($extra['additional_charge']);
                        array_push($new_selected_extra, $extra);
                    }
                }
            }
        }

        $selected_items = session('selected_items') ?? array();

        $selected_items[] = array(
            'menu_item' => $menu_item,
            'size' => $new_selected_size,
            'extra' => $new_selected_extra,
        );


        session(['selected_items' => $selected_items]);


        return Inertia::render('CallCentreAdmin/Orders/AddDeal', [
            'groupDeal' => $group_deal->load('groupDealItems.groupDealSingleItems.menuItem'),
            'restaurant' => $restaurant,
            'selected_items' => $selected_items,
            "message" => "Successfully added size and extras to item " . $menu_item->name,
        ]);
    }

        // add selected items to basket
        public function addToBasket(Request $request)
        {

            $group_deal = session('group_deal');
            $restaurant = session('restaurant');
            $order = session('order');
            $selected_items = session('selected_items');

            return Inertia::render('CallCentreAdmin/Orders/Index', [
                'order' => $order,
                'restaurant' => $restaurant,
                'group_deal' => $group_deal,
                'selected_items' => $selected_items,
            ]);
        }

        // add menu item to order
        public function addMenuItem(Request $request)
        {


            $restaurant = session('restaurant');
            $order = session('order');

            return Inertia::render('CallCentreAdmin/Orders/Index', [
                'order' => $order,
                'restaurant' => $restaurant,
                'group_deal' => $group_deal,
                'selected_items' => $selected_items,
            ]);
        }

        /**
         * Display the order page
         * @param Request $request
         * @return \Inertia\Response
         */
        public function showOrder(Request $request){
            // Validate the request
            $request->validate([
                'customer_name' => ['required', 'string', 'max:191'],
                'customer_contact_number' => 'phone:GB',
                'contact_number' => 'phone:GB',
                "role" => "required|exists:roles,name",
                "order_type" => "required|string|in:collection,delivery,table",
            ]);

            $restaurant = Restaurant::where('contact_number', $request->contact_number)->first();

            if(!$restaurant){
                return redirect()->back()->withErrors([
                    'message' => 'Restaurant not found.'
                ]);
            }

            if ($request->order_type == 'delivery' && $restaurant->allows_delivery == 0) {
                return redirect()->back()->withErrors(['error', 'This business does not offer a delivery service.']);
            }

            if ($request->order_type == 'collection' && $restaurant->allows_collection == 0)  {
                return redirect()->back()->withErrors(['error', 'This business does not offer a collection service.']);
            }

            if ($request->order_type == 'table' && $restaurant->allows_table_orders == 0)  {
                return redirect()->back()->withErrors(['error', 'This business does not offer table service.']);
            }


            $openingHoursMessage = "";
            $selected_time = "";
            // check if restaurant delivery hours are within the time requested
            if ($request->when_radio == 'asap') {
                // if selected asap, check if restaurant is open
                $milliseconds =  date_format(new DateTime('+60 minutes'),  'H:i:s');
            } else {
                // if selected time, check if restaurant is open at the time selected
                $selected_time = date_format(new DateTime($request->selected_time),  'H:i:s');
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
                    if ( ($selected_time >= date_format(new DateTime($hours->from),  'H:i:s')) && ($selected_time < date_format(new DateTime($hours->to),  'H:i:s')) ) {
                        // Business is open
                        $businessClosed = false;
                        $openingHoursMessage = "Open till " . date_format(new DateTime($hours->to),  'H:i');
                    } else {
                        $businessClosed = true;
                    }
                    if($businessClosed) {
                        // If business is closed, check to see if it's already been open for that day
                        if ($selected_time < date_format(new DateTime($hours->from),  'H:i:s')) {
                            $openingHoursMessage = "Opens at " . date_format(new DateTime($hours->from),  'H:i');
                        } else if ($selected_time > date_format(new DateTime($hours->to),  'H:i:s')) {
                            $openingHoursMessage = "Closed at " . date_format(new DateTime($hours->to),  'H:i');
                        }
                    }
                }
            }

            if ($request->order_type == 'delivery') {
                // find address
                $googleApiKey = config('geocoder.key');
                $googleGeocoding = 'https://maps.googleapis.com/maps/api/geocode/json?key=' . $googleApiKey . '&address=' . $request->address;
                $geocodingRequest = Http::get($googleGeocoding);
                $decodedResponse = json_decode($geocodingRequest->body(), true);

                $user_latitude = 0;
                $user_longitude = 0;
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

                    $user_latitude = $decodedResponse['results'][0]['geometry']['location']['lat'];
                    $user_longitude = $decodedResponse['results'][0]['geometry']['location']['lng'];
                    $userAddress = $decodedResponse['results'][0]['formatted_address'];
                    $restaurant->setAttribute('delivery_address', $request->address);
                    $restaurant->setAttribute('user_latitude', $user_latitude);
                    $restaurant->setAttribute('user_longitude', $user_longitude);


                } elseif ($decodedResponse['status'] == "ZERO_RESULTS") {
                    return redirect()->back()->withErrors(['message', 'Address not found, please check this is a valid address.']);
                } else {
                    return redirect()->back()->withErrors(['message', 'GEOCODING ERROR: ' . $decodedResponse['status'] . ' - ' . $decodedResponse['error_message']]);
                }
            }
        }

        // get order details
        public function index(Request $request)
        {

            if($request->session()->has('order')){
                $order = $request->session()->get('order');

                $restaurant = $request->session()->get('restaurant');
                $selected_items = session('selected_items');
                $order->load('items');
                return Inertia::render('CallCentreAdmin/Orders/Index', [
                    'order' => $order,
                    'restaurant' => $restaurant,
                    'selected_items' => $selected_items,
                ]);
            }else{
        // Validate the data
         $request->validate([
            'customer_name' => ['required', 'string', 'max:191'],
            'customer_contact_number' => 'phone:GB',
            'contact_number' => 'phone:GB',
            "role" => "required|exists:roles,name",
        ]);


        session()->forget('cart');
        session()->forget('restaurant');
        session()->forget('order');
        session()->forget('group_deal');
        session()->forget('group_deal_single_item');
        session()->forget('selected_items');

        $restaurant = Restaurant::with('menuCategories', 'menuItems', 'openingHours')->where('contact_number', $request->contact_number)->first();

        if(is_null($restaurant)) {
            return redirect()->back()->withErrors([
                'message' => 'Restaurant not found',
            ]);
        }
        // get opening hours
        $openingHours = OpeningHour::where('restaurant_id', $restaurant->id)->get();

        // check if restaurant exists
        if (!is_null($restaurant)) {
            // check if restaurant order type is in line with what is requested, if not, return error
            if ($request->order_type == 'delivery' && $restaurant->allows_delivery == 0) {
                return redirect()->back()->withErrors(['error', 'This business does not offer a delivery service.']);
            } else if ($request->order_type == 'collection' && $restaurant->allows_collection == 0)  {
                return redirect()->back()->withErrors(['error', 'This business does not offer a collection service.']);
            } else if ($request->order_type == 'table' && $restaurant->allows_table_orders == 0)  {
                return redirect()->back()->withErrors(['error', 'This business does not offer table service.']);
            }

            $openingHoursMessage = "";
            $selected_time = "";
            // check if restaurant delivery hours are within the time requested
            if ($request->when_radio == 'asap') {
                // if selected asap, check if restaurant is open
                $milliseconds =  date_format(new DateTime('+60 minutes'),  'H:i:s');
            } else {
                // if selected time, check if restaurant is open at the time selected
                $selected_time = date_format(new DateTime($request->selected_time),  'H:i:s');
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
                    if ( ($selected_time >= date_format(new DateTime($hours->from),  'H:i:s')) && ($selected_time < date_format(new DateTime($hours->to),  'H:i:s')) ) {
                        // Business is open
                        $businessClosed = false;
                        $openingHoursMessage = "Open till " . date_format(new DateTime($hours->to),  'H:i');
                    } else {
                        $businessClosed = true;
                    }
                    if($businessClosed) {
                        // If business is closed, check to see if it's already been open for that day
                        if ($selected_time < date_format(new DateTime($hours->from),  'H:i:s')) {
                            $openingHoursMessage = "Opens at " . date_format(new DateTime($hours->from),  'H:i');
                        } else if ($selected_time > date_format(new DateTime($hours->to),  'H:i:s')) {
                            $openingHoursMessage = "Closed at " . date_format(new DateTime($hours->to),  'H:i');
                        }
                    }
                }
            }

            if ($request->order_type == 'delivery') {
                // find address
                $googleApiKey = config('geocoder.key');
                $googleGeocoding = 'https://maps.googleapis.com/maps/api/geocode/json?key=' . $googleApiKey . '&address=' . $request->address;
                $geocodingRequest = Http::get($googleGeocoding);
                $decodedResponse = json_decode($geocodingRequest->body(), true);

                $user_latitude = 0;
                $user_longitude = 0;
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

                    $user_latitude = $decodedResponse['results'][0]['geometry']['location']['lat'];
                    $user_longitude = $decodedResponse['results'][0]['geometry']['location']['lng'];
                    $userAddress = $decodedResponse['results'][0]['formatted_address'];
                    $restaurant->setAttribute('delivery_address', $request->address);
                    $restaurant->setAttribute('user_latitude', $user_latitude);
                    $restaurant->setAttribute('user_longitude', $user_longitude);


                } elseif ($decodedResponse['status'] == "ZERO_RESULTS") {
                    return redirect()->back()->withErrors(['message', 'Address not found, please check this is a valid address.']);
                } else {
                    return redirect()->back()->withErrors(['message', 'GEOCODING ERROR: ' . $decodedResponse['status'] . ' - ' . $decodedResponse['error_message']]);
                }
            }

            // get restaurant logo
            $logo = $restaurant->logo ?? null;

            // set restaurant in delivery charge because the order type isn't delivery
            $restaurant->setAttribute('delivery_charge', 0);

            // test
            // $restaurant->company_drivers = 1;
            if ($restaurant->company_drivers == 1 && $request->order_type == 'delivery') {
                $configurations = Configuration::get()->toArray();

                $distance_in_miles = GeocoderPackage::getDistance($userAddress, $restaurant->getFullAddressAttribute());


                $raw_distance = (int)str_replace(' miles', '', $distance_in_miles);
                $delivery_time = GeocoderPackage::getDeliveryTime($restaurant->getFullAddressAttribute(), $userAddress);
                if($delivery_time === 'Zero results') {
                    return redirect()->back()->withErrors(['message', 'Delivery time could not be calculated.']);
                }
                $time_in_minutes = floor($delivery_time->value / 60);
                $fee = (($time_in_minutes * (int)$configurations[0]['minute']) + ($raw_distance * (int)$configurations[0]['mile']));
                $rounded_fee = round($fee, 2);
                $restaurant->setAttribute('delivery_charge', $rounded_fee);
                $restaurant->setAttribute('time_in_minutes', $time_in_minutes);
                $restaurant->setAttribute('distance_in_miles', $distance_in_miles);
            }




            $group_deals = GroupDeal::where('restaurant_id', $restaurant->id)->get();
            $menu_categories = MenuCategory::where('restaurant_id', $restaurant->id)->get();
            foreach ($menu_categories as $menu_category) {
                $menu_category->menu_items = MenuItem::where('menu_category_id', $menu_category->id)->with('extras', 'sizes')->get();
            }

            $restaurant->setAttribute('group_deals', $group_deals);
            $restaurant->setAttribute('menu', $menu_categories);
            $restaurant->setAttribute('opening_hours_message', $openingHoursMessage);
            $restaurant->setAttribute('chosen_order_type', $request->order_type);
            $restaurant->setAttribute('customer_name', $request->customer_name);
            $restaurant->setAttribute('customer_contact_number', $request->customer_contact_number);
            $restaurant->setAttribute('time_slot', date_format(new DateTime($selected_time),  'H:i:s')) ?? null;

            session()->put('restaurant', $restaurant);


            return Inertia::render('CallCentreAdmin/Orders/Index', [
                'restaurant' => $restaurant,
            ]);
        } else {
            return redirect()->back()->withErrors(['error', 'Business not found, please check the businesses number is correct.']);
        }
    }
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