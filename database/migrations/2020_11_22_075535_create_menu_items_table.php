<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('menu_category_id');
            $table->unsignedInteger('restaurant_id');
            $table->string('title');
            $table->longText('description')->nullable();
            $table->longText('dietary_requirements')->nullable();
            $table->string('image')->nullable();
            $table->decimal('price', 10, 2);
            $table->timestamps();
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('menu_category_id')->references('id')->on('menu_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
    }
}