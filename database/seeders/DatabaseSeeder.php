<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Extra;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use App\Models\Restaurant;
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
        User::factory(100)->create();
        RestaurantCategory::factory(150)->create();
        Restaurant::factory(10)->create();
        MenuCategory::factory(10)->create();
        MenuItem::factory(50)->create();
        Extra::factory(50)->create();
        GroupDeal::factory(50)->create();
        Order::factory(300)->create();
        OrderItem::factory(700)->create();
    }
}