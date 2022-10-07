<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'order_id' => $this->faker->numberBetween(1, 30),
            'item_id' => $this->faker->numberBetween(1, 100),
            'title' => $this->faker->sentence(3),
            'item_price' => $this->faker->randomFloat(2, 1, 100),
            'total_price' => $this->faker->randomFloat(2, 1, 100),
            'quantity' => $this->faker->numberBetween(1, 10),
            'notes' => $this->faker->paragraph(3)
        ];

    }
}