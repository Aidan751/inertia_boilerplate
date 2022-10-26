<?php

namespace App\Models;

use App\Models\Day;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OpeningHour extends Model
{
   use HasFactory;
    protected $table = 'opening_hours';

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'restaurant_id',
        'day_id',
        'to',
        'from',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function days() {
        return $this->hasMany(Day::class, 'id', 'day_id');
    }

}
