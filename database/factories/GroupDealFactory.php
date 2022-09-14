<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GroupDealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->text,
            'group_deal_price' => $this->faker->numberBetween(1, 100),
            'restaurant_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}