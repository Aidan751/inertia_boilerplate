<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
   
    
    protected $guarded = [];
    protected $table = 'days';
    /**
     * Set timestamps off
     */
    public $timestamps = false;
}
