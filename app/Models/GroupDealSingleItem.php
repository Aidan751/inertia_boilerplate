<?php

namespace App\Models;

use App\Models\GroupDealItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupDealSingleItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'group_deal_item_id'
    ];

    public function groupDealItem()
    {
        return $this->belongsTo(GroupDealItem::class);
    }
}