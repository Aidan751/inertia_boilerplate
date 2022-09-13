<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

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
        // \App\Models\User::factory(10)->create();
    }
}
