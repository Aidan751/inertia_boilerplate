<?php

namespace App\Models;

use App\Models\Size;
use App\Models\MenuImage;
use App\Models\MenuCategory;
use App\Models\GroupDealSingleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class MenuItem extends Model implements HasMedia
class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'menu_category_id',
        'restaurant_id',
        'size_id',
        'menu_image',
    ];

    protected $casts = [
        'extras' => 'array',
        'sizes' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(MenuCategory::class, 'menu_category_id', 'id');
    }

    public function groupDealSingleItem()
    {
        return $this->hasOne(GroupDealSingleItem::class);
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('items')
            ->singleFile();
    }
}
