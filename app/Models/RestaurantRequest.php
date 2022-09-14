<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class RestaurantRequest extends Model implements HasMedia
{
    use  HasFactory, HasMediaTrait;


    public function registerMediaCollections()
    {
        $this->addMediaCollection('logos')
            ->singleFile();

        $this->addMediaCollection('banners')
            ->singleFile();
    }
}