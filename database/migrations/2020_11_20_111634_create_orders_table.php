<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('order_reference')->unique();
            $table->unsignedInteger('restaurant_id');
            $table->unsignedInteger('customer_id')->nullable();
            $table->unsignedInteger('driver_id')->nullable();
            $table->unsignedInteger('call_center_id')->nullable();
            $table->enum('driver_paid', ['Y', 'N'])->default('N');
            $table->dateTime('pickup_date');
            $table->time('time_slot');

            $table->enum('order_method', ['app','web', 'call', 'other'])->default('app');

            $table->decimal('price', 10, 2);
            $table->decimal('delivery_price', 10, 2)->nullable();
            $table->enum('payment_status', ['pending','paid'])->default('pending');
            $table->enum('payment_method', ['cash','card'])->default('cash');
            $table->enum('pickup_method', ['collection','delivery', 'table'])->default('delivery');
            $table->enum('status', ['pending', 'confirmed', 'driver-en-route', 'order-en-route', 'completed', 'cancelled'])->default('pending');


            // Delivery Address

            $table->string('address')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('town')->nullable();
            $table->string('county')->nullable();
            $table->string('postcode')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();



            $table->string('table_number')->nullable();

            $table->string('payment_intent_id')->nullable();

            // Call center orders only
            $table->string('customer_name')->nullable();
            $table->string('customer_contact_number')->nullable();


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
        Schema::dropIfExists('orders');
    }
}
