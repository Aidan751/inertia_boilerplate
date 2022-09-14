<?php

namespace App\Models;

use App\Models\Extra;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $guarded = [];
    protected $table = 'order_items';
    public $timestamps = false;


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function extras()
    {
        return $this->hasMany(Extra::class);
    }
 
}