<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StripePayment extends Model
{
    protected $guarded = [];
    protected $table = 'stripe_payments';
   

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
