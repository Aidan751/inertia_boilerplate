<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OpeningHour extends Model
{
   use HasFactory;
    protected $table = 'opening_hours';

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function day() {
        return $this->hasOne(Day::class, 'id', 'day_id');
    }

}
