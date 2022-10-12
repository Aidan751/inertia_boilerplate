<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // return all 7 days of the week just once
        return [
            'day_of_the_week' => $this->faker->unique()->dayOfWeek,
        ];
    }
}
