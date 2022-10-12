<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OpeningHourFactory extends Factory
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
            'day_id' => $this->faker->numberBetween(1, 7),
            'from' => $this->faker->time('H:i:s', 'now'),
            'to' => $this->faker->time('H:i:s', 'now'),
        ];
    }
}
