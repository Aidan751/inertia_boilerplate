<?php

namespace App\Models;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'additional_charge',
        'description',
        'menu_item_id',
        'restaurant_id',
    ];

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}