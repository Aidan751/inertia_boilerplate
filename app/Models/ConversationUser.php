<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationUser extends Model
{
    protected $guarded = [];
    protected $table = 'conversation_users';

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
