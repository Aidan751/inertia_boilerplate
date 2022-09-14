<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantCategory extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'restaurant_categories';

    public function restaurant() {
        return $this->hasMany(Restaurant::class);
    }

   
}