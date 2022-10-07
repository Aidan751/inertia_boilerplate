<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupDeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'group_deal_price',
        'restaurant_id',
    ];

    

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function groupDealItems()
    {
        return $this->hasMany(GroupDealItem::class);
    }
}