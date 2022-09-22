<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Extra;
use App\Models\MenuItem;
use App\Models\GroupDeal;
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
        User::factory(10)->create();
        RestaurantCategory::factory(10)->create();
        Restaurant::factory(10)->create();
        MenuCategory::factory(10)->create();
        MenuItem::factory(50)->create();
        Extra::factory(50)->create();
        GroupDeal::factory(50)->create();
    }
}