<?php

namespace App\Models;

use App\Models\Extra;
use Illuminate\Database\Eloquent\Model;
// use Spatie\MediaLibrary\HasMedia\HasMedia;
// use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class MenuItem extends Model implements HasMedia
class MenuItem extends Model
{
    // use HasFactory, HasMediaTrait;
    use HasFactory;

    protected $guarded = [];
    protected $table = 'menu_items';

    public function category()
    {
        return $this->hasOne(MenuCategory::class, 'id', 'menu_category_id');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('items')
            ->singleFile();
    }

    public function extras()
    {
        return $this->hasMany(Extra::class, 'menu_item_id', 'id');
    }




}