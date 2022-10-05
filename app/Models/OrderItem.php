<?php

namespace App\Models;

use App\Models\Extra;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;
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