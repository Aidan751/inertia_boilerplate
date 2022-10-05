<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{


    protected $guarded = [];
    protected $table = 'configurations';
    /**
     * Set timestamps off
     */
    public $timestamps = false;

    //configuration belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
