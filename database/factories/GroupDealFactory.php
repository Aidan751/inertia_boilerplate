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
            // 'items' => $this->faker->text,
            'group_deal_price' => $this->faker->randomFloat(2, 0, 100),
            'restaurant_id' => 1,
        ];
    }
}