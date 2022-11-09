<?php

namespace Database\Seeders;

use App\Models\Day;
use App\Models\Logo;
use App\Models\Size;
use App\Models\Extra;
use App\Models\Order;
use App\Models\Banner;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use App\Models\OpeningHour;
use App\Models\MenuCategory;
use App\Models\Configuration;
use App\Models\CollectionTime;
use Illuminate\Database\Seeder;
use App\Models\RestaurantCategory;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Call the laratrust seeder to initialize roles and permissions
        $this->call(LaratrustSeeder::class);
        // create 7 days
        $days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        foreach($days as $day) {
            Day::factory()->count(1)->create([
                'day_of_the_week' => $day,
            ]);
        }
        RestaurantCategory::factory()->create([
            'name' => 'Italian',
        ]);
        RestaurantCategory::factory()->create([
            'name' => 'Chinese',
        ]);
        RestaurantCategory::factory()->create([
            'name' => 'Indian',
        ]);
        RestaurantCategory::factory()->create([
            'name' => 'Fine Dining',
        ]);
        RestaurantCategory::factory()->create([
            'name' => 'Fast Food',
        ]);



        // $table->string('banner')->nullable();
        // $table->string('logo')->nullable();
        $restaurant = \App\Models\Restaurant::factory()->create([
            'name' => 'Test Restaurant',
            'contact_number' => '+447368360039',
            'front_facing_number' => '+447368360039',
            'address_line_1' => '26 Wilson Street',
            'town' => 'Larkhall',
            'county' => 'South Lanarkshire',
            'postcode' => 'ML9 2QF',
            'application_status' => 'approved',
            'stripe_status' => 'complete',
            'allows_delivery' => 1,
        ]);

        Logo::factory()->create();

        Banner::factory()->create();

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 1,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 2,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 3,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 4,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 5,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 6,
        ]);

        OpeningHour::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 7,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 1,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 2,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 3,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 4,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 5,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 6,
        ]);

        CollectionTime::factory()->create([
            'restaurant_id' => $restaurant->id,
            'from' => '10:00:00',
            'to' => '22:00:00',
            'day_id' => 7,
        ]);


        $user = \App\Models\User::factory()->create([
            "first_name" => "Aidan",
            "last_name" => "Clark",
            "email" => "aidan@app.com",
            "password" => bcrypt("password"),
            "role_id" => 2,
            "restaurant_id" => $restaurant->id,
        ]);

        $customer = \App\Models\User::factory()->create([
            "first_name" => "Customer",
            "last_name" => "Customer",
            "email" => "customers@app.com",
            "password" => bcrypt("password"),
            "role_id" => 3,
        ]);

        $callCentreUser = \App\Models\User::factory()->create([
            "first_name" => "Call",
            "last_name" => "Centre",
            "email" => "call@app.com",
            "password" => bcrypt("password"),
            "restaurant_id" => $restaurant->id,
            "role_id" => 3
        ]);

        $role = \App\Models\Role::where("name","restaurant_admin")->first();
        $call_centre_role = \App\Models\Role::where("name","call_centre_admin")->first();
        $admin_user_role = \App\Models\Role::where("name","admin")->first();

        $callCentreUser->attachRole($call_centre_role);
        $user->attachRole($role);


        MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Pizza',
            'notes' => 'Pizza notes',
        ]);
        MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Pasta',
            'notes' => 'Pasta notes',
        ]);
        MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Drinks',
            'notes' => 'Drinks notes',
        ]);
        MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Desserts',
            'notes' => 'Desserts notes',
        ]);
        MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Sides',
            'notes' => 'Sides notes',
        ]);


        MenuItem::factory()->create([
            'restaurant_id' => $restaurant->id,
            'menu_category_id' => 1,
            'title' => 'Pizza',
            'description' => 'Tomato sauce, mozzarella, basil',
            'dietary_requirements' => 'Vegetarian',
            'image' => "https://loremflickr.com/640/480/food",
            'price' => 5.00,
        ]);

        MenuItem::factory()->create([
            'restaurant_id' => $restaurant->id,
            'menu_category_id' => 2,
            'title' => 'Pasta',
            'description' => 'Tomato sauce, mozzarella, basil',
            'dietary_requirements' => 'Vegetarian',
            'image' => "https://loremflickr.com/640/480/food",
            'price' => 5.00,
        ]);

        MenuItem::factory()->create([
            'restaurant_id' => $restaurant->id,
            'menu_category_id' => 3,
            'title' => 'Coke',
            'description' => 'Coke',
            'dietary_requirements' => 'none',
            'image' => "https://loremflickr.com/640/480/food",
            'price' => 10.00,
        ]);

        MenuItem::factory()->create([
            'restaurant_id' => $restaurant->id,
            'menu_category_id' => 4,
            'title' => 'Ice Cream',
            'description' => 'Ice Cream',
            'dietary_requirements' => 'none',
            'image' => "https://loremflickr.com/640/480/food",
            'price' => 15.00,
        ]);

        Extra::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Cheese',
            'description' => 'Extra Cheese',
            'additional_charge' => 1.00,
        ]);

        Extra::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Sauce',
            'description' => 'Extra Sauce',
            'additional_charge' => 1.00,
        ]);

        Extra::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Pepperoni',
            'description' => 'Extra Pepperoni',
            'additional_charge' => 1.00,
        ]);

        Extra::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Pineapple',
            'description' => 'Extra Pineapple',
            'additional_charge' => 1.00,
        ]);

        Extra::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Mushrooms',
            'description' => 'Extra Mushrooms',
            'additional_charge' => 1.00,
        ]);

        Size::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Small',
            'additional_charge' => 1.00,
        ]);

        Size::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Medium',
            'additional_charge' => 2.00,
        ]);

        Size::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Large',
            'additional_charge' => 3.00,
        ]);

        Size::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Extra Large',
            'additional_charge' => 4.00,
        ]);

        Size::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Family',
            'additional_charge' => 5.00,
        ]);




        GroupDeal::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Pizza Deal',
            'description' => 'Pizza Deal',
            'group_deal_price' => 10.00,
        ]);

        GroupDeal::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Pasta Deal',
            'description' => 'Pasta Deal',
            'group_deal_price' => 10.00,
        ]);

        GroupDeal::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Drink Deal',
            'description' => 'Drink Deal',
            'group_deal_price' => 10.00,
        ]);

        GroupDeal::factory()->create([
            'restaurant_id' => $restaurant->id,
            'title' => 'Dessert Deal',
            'description' => 'Dessert Deal',
            'group_deal_price' => 10.00,
        ]);



        Order::factory(50)->create([
            "restaurant_id" => $restaurant->id,
            "customer_id" => $customer->id,
            'address' => $customer->address,
        ]);

        OrderItem::factory(1000)->create([
        ]);


        Configuration::factory()->create([
            'mile' => 0.00,
            'minute' => 0.00,
        ]);

        $extras = Extra::all();
        MenuItem::all()->each(function ($menuItem) use ($extras) {
            $menuItem->extras()->attach(
                $extras->random(rand(1, 5))->pluck('id', 'name', 'description', 'additional_charge', 'restaurant_id')->toArray()
            );
        });

        $sizes = Size::all();

        MenuItem::all()->each(function ($menuItem) use ($sizes) {
            $menuItem->sizes()->attach(
                $sizes->random(rand(1, 5))->pluck('id', 'name', 'additional_charge', 'restaurant_id')->toArray()
            );
        });



    }
}