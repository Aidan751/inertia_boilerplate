<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ExtraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'additional_charge' => $this->faker->randomFloat(2, 0, 100),
            'restaurant_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
