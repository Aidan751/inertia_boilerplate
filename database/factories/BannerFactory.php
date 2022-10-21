<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'restaurant_id' => 1,
            'img_url' => "https://loremflickr.com/640/480/banner",
        ];
    }
}
