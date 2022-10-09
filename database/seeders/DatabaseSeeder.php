<?php

namespace Database\Seeders;

use App\Models\Day;
use App\Models\Extra;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use App\Models\MenuCategory;
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
        Day::factory()->count(7)->create();
        RestaurantCategory::factory(10)->create();
        $restaurant = \App\Models\Restaurant::factory()->create([
            'name' => 'Test Restaurant',
            'contact_number' => '123456789',
        ]);

        $user = \App\Models\User::factory()->create([
            "first_name" => "Aidan",
            "last_name" => "Clark",
            "email" => "aidan@app.com",
            "password" => bcrypt("password"),
            "role_id" => 2,
            "restaurant_id" => $restaurant->id,
        ]);

        $callCentreUser = \App\Models\User::factory()->create([
            "first_name" => "Call",
            "last_name" => "Centre",
            "email" => "call@app.com",
            "password" => bcrypt("password"),
            "role_id" => 3
        ]);

        $role = \App\Models\Role::where("name","restaurant_admin")->first();
        $callCentreRole = \App\Models\Role::where("name","call_centre_admin")->first();

        $callCentreUser->attachRole($callCentreRole);
        $user->attachRole($role);

        MenuCategory::factory(50)->create([
            "restaurant_id" => $restaurant->id,
        ]);
        MenuItem::factory(50)->create();
        Extra::factory(50)->create([
            "restaurant_id" => $restaurant->id,
        ]);
        GroupDeal::factory(50)->create([
            "restaurant_id" => $restaurant->id,
        ]);
        Order::factory(50)->create([
            "restaurant_id" => $restaurant->id,
        ]);
        OrderItem::factory(100)->create([
        ]);
    }
}