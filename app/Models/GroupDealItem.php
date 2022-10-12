<?php

namespace App\Models;

use App\Models\GroupDeal;
use App\Models\GroupDealSingleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupDealItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'group_deal_id',
    ];

    protected $casts = [
        'items' => 'array'
    ];

    public function groupDeal()
    {
        return $this->belongsTo(GroupDeal::class);
    }

    public function groupDealSingleItems()
    {
        return $this->hasMany(GroupDealSingleItem::class,"group_deal_item_id","id");
    }

    public function deleteGroupDealSingleItems()
    {
        foreach($this->groupDealSingleItems as $groupDealSingleItem){
            $groupDealSingleItem->delete();
        }
    }
}