<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GroupDealSingleItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'group_deal_item_id' => $this->faker->numberBetween(1, 50),
            'group_deal_id' => $this->faker->numberBetween(1, 4),
            'menu_item_id' => $this->faker->numberBetween(1, 40),
        ];
    }
}