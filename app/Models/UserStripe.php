<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class UserStripe extends Model
{
    protected $guarded = [];
    protected $table = 'user_stripe';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}