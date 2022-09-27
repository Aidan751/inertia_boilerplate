<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExtrasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('extras', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->decimal('additional_charge', 10, 2);
            $table->unsignedInteger('menu_item_id')->nullable();
            $table->unsignedInteger('restaurant_id');
            $table->timestamps();
            $table->foreign('menu_item_id')->references('id')->on('menu_items')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('restaurant_id')->references('id')->constrained()->on('restaurants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('extras');
    }
}