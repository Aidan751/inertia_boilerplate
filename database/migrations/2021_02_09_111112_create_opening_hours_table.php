<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('restaurant_id');
            $table->unsignedInteger('day_id');
            $table->time('from');
            $table->time('to');
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });

        Schema::create('collection_times', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('restaurant_id');
            $table->unsignedInteger('day_id');
            $table->time('from');
            $table->time('to');
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opening_hours');
        Schema::dropIfExists('collection_times');
    }
}
