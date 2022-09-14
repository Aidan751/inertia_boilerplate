<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLocation extends Model
{
    protected $guarded = [];
    protected $table = 'user_locations';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeIsWithinMaxDistance($query, $latitude, $longitude, $radius) {

        $haversine = "(3959 * acos(cos(radians(" . $latitude . ")) 
                        * cos(radians(`latitude`)) 
                        * cos(radians(`longitude`) 
                        - radians(" . $longitude . ")) 
                        + sin(radians(" . $latitude . ")) 
                        * sin(radians(`latitude`))))";

                      
    
        return $query->select()
                     ->selectRaw("{$haversine} AS distance")
                     ->whereRaw("{$haversine} < ?", [$radius]);
    }

 
}
