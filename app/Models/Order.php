<?php

namespace App\Models;

use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'order_status',
        'order_total',
    ];
 

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function unread($query) {

        
        $user = ConversationUser::where('order_id', '=', 'id')
        ->where('user_id', auth('api')->user()->id)
        ->first();

        return Message::where('order_id', '=', 'id')
        ->where('created_at', '>', $user->last_active) 
        ->count();
    }


    public function conversationUsers()
    {
        return $this->hasMany(ConversationUser::class, );
    }

}