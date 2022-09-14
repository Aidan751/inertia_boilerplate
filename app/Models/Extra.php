<?php

namespace App\Models;

use App\Models\Order;
use App\Models\MenuItem;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Extra extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'additional_charge',
        'description',
        'menu_item_id',
        'restaurant_id',
    ];

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}