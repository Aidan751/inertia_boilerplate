<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'restaurant_category_id' => $this->faker->numberBetween(1, 10),
            'application_status' => $this->faker->randomElement(['pending', 'approved', 'declined', 'suspended']),
            'name' => $this->faker->company,
            'address_line_1' => $this->faker->streetAddress,
            'address_line_2' => $this->faker->secondaryAddress,
            'town' => $this->faker->city,
            'county' => $this->faker->state,
            'postcode' => $this->faker->postcode,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'contact_number' => $this->faker->phoneNumber,
            'front_facing_number' => $this->faker->phoneNumber,
            'bio' => $this->faker->paragraph,
            'minimum_order_value' => $this->faker->randomFloat(2, 0, 100),
            'delivery_charge' => $this->faker->randomFloat(2, 0, 100),
            'average_delivery_time' => $this->faker->randomElement(['15', '30', '45', '60', '75', '90', '105', '120']),
            'stripe_account_id' => $this->faker->uuid,
            'stripe_status' => $this->faker->randomElement(['incomplete', 'complete']),
            'company_drivers' => $this->faker->boolean,
            'allows_table_orders' => $this->faker->boolean,
            'allows_collection' => $this->faker->boolean,
            'allows_delivery' => $this->faker->boolean,
            'allows_call_center' => $this->faker->boolean,
        ];
    }
}
