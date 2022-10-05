<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDriver extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'user_drivers';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}