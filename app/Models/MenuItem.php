<?php

namespace App\Models;

use App\Models\MenuImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class MenuItem extends Model implements HasMedia
class MenuItem extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'menu_items';

    protected $casts = [
        'extras' => 'array',
    ];

    public function category()
    {
        return $this->hasOne(MenuCategory::class, 'id', 'menu_category_id');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('items')
            ->singleFile();
    }
}
