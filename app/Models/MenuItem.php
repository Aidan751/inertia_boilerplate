<?php

namespace App\Models;

use App\Models\Size;
use App\Models\Extra;
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
        'restaurant_id',
        'size_id',
        'image',
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

    public function extras()
    {
        return $this->belongsToMany(Extra::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class);
    }

    public function menuCategory()
    {
        return $this->hasOne(MenuCategory::class);
    }
}