<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'restaurant_id' => $this->faker->numberBetween(1, 10),
            'title' => $this->faker->sentence(3),
            'image' => $this->faker->imageUrl(640, 480, 'food', true),
            'description' => $this->faker->paragraph(3),
        ];
    }
}