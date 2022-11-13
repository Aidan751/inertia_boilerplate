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

    /**
     * Variables that are mass assignable
     * 
     * @var array
     */
    protected $fillable = [
        'order_id',
        'item_id',
        'title',
        'item_price',
        'total_price',
        'data',
        'quantity',
        'notes',
    ];

    /**
     * Variables that should be cast to native types
     * 
     * @var array
     */
    protected $casts = [
        'data' => 'array',
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function extras()
    {
        return $this->hasMany(Extra::class);
    }
 
}