<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'order_reference' => $this->faker->unique()->randomNumber(8),
            'restaurant_id' => $this->faker->numberBetween(1, 10),
            'customer_id' => $this->faker->numberBetween(1, 10),
            'driver_id' => $this->faker->numberBetween(1, 10),
            'call_center_id' => 1,
            'driver_paid' => $this->faker->randomElement(['Y', 'N']),
            'pickup_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'time_slot' => $this->faker->time('H:i:s', 'now'),
            'order_method' => $this->faker->randomElement(['app', 'web', 'call', 'other']),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'delivery_price' => $this->faker->randomFloat(2, 1, 100),
            'payment_status' => $this->faker->randomElement(['pending', 'paid']),
            'payment_method' => $this->faker->randomElement(['cash', 'card']),
            'pickup_method' => $this->faker->randomElement(['collection', 'delivery', 'table']),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'driver-en-route', 'order-en-route', 'cancelled']),
            'address' => $this->faker->address,
            'address_line_1' => $this->faker->streetAddress,
            'address_line_2' => $this->faker->secondaryAddress,
            'town' => $this->faker->city,
            'county' => $this->faker->state,
            'postcode' => $this->faker->postcode,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'table_number' => $this->faker->randomNumber(2),
            'payment_intent_id' => $this->faker->uuid,
            'customer_name' => $this->faker->name,
            'customer_contact_number' => $this->faker->phoneNumber,
            'user_id' => 4,
        ];
    }
}