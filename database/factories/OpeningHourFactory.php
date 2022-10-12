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
        // Schema::create('opening_hours', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedInteger('restaurant_id');
        //     $table->unsignedInteger('day_id');
        //     $table->time('from');
        //     $table->time('to');
        //     $table->timestamps();

        //     $table->foreign('day_id')->references('id')->on('days');
        //     $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        // });

        // Schema::create('collection_times', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedInteger('restaurant_id');
        //     $table->unsignedInteger('day_id');
        //     $table->time('from');
        //     $table->time('to');
        //     $table->timestamps();
        //     $table->foreign('day_id')->references('id')->on('days');
        //     $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        // });
        return [

        ];
    }
}