<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
   
    
    protected $guarded = [];
    protected $table = 'configurations';
    /**
     * Set timestamps off
     */
    public $timestamps = false;
}
