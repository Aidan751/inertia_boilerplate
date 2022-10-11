<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupDealSingleItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_deal_single_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_deal_item_id')->references('id')->on('group_deal_items');
            $table->foreignId('group_deal_id')->references('id')->on('group_deals');
            $table->foreignId('menu_item_id')->references('id')->on('menu_items')->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_deal_single_items');
    }
}