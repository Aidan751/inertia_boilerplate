<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('restaurant_category_id');
            $table->enum('application_status', ['pending', 'approved', 'declined', 'suspended'])->default('pending');  
            $table->string('name');
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('town');
            $table->string('county');
            $table->string('postcode');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('contact_number')->nullable();
            $table->string('front_facing_number')->nullable();
            $table->longText('bio')->nullable();
            $table->decimal('minimum_order_value', 10, 2)->default(0);
            $table->decimal('delivery_charge', 10, 2)->nullable();
            $table->string('average_delivery_time')->nullable();  
            $table->string('stripe_account_id')->nullable();  
            $table->enum('stripe_status', ['incomplete', 'complete'])->default('incomplete');  
            $table->boolean('company_drivers')->default(0);
            $table->boolean('allows_table_orders')->default(0); 
            $table->boolean('allows_collection')->default(0); 
            $table->boolean('allows_delivery')->default(0); 
            $table->boolean('allows_call_centre')->default(0); 
            $table->timestamps();

            $table->foreign('restaurant_category_id')->references('id')->on('restaurant_categories')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurants');
    }
}
