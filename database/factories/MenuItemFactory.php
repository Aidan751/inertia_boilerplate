<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'menu_category_id' => $this->faker->numberBetween(1, 10),
            'restaurant_id' => $this->faker->numberBetween(1, 10),
            'title' => $this->faker->name,
            'description' => $this->faker->text,
            'dietary_requirements' => $this->faker->text,
            'price' => $this->faker->randomFloat(2, 0, 100),
        ];

    }
}