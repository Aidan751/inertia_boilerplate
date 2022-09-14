<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserStripeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_stripe', function (Blueprint $table) {
            $table->increments('id');
            $table->string('stripe_account_id');
            $table->string('payment_method_id')->nullable();
            $table->unsignedInteger('card_last_four')->nullable();
            $table->unsignedInteger('expiry_month')->nullable();
            $table->unsignedInteger('expiry_year')->nullable();

            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_stripe');
    }
}