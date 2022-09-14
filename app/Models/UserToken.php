<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    protected $guarded = [];
    protected $table = 'user_tokens';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
