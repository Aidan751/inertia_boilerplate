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
        'image',
        'group_deal_price',
        'restaurant_id',
    ];



    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the group deal items for the group deal.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function groupDealItems()
    {
        return $this->hasMany(GroupDealItem::class,"group_deal_id","id");
    }


    /**
     *
     */
}