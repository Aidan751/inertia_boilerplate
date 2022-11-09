<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class CollectionTime extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'collection_times';

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function day() {
        return $this->hasOne(Day::class, 'id', 'day_id');
    }

}