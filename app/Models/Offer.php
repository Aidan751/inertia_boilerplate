<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Offer extends Model implements HasMedia
{
    use HasFactory, HasMediaTrait;

    protected $guarded = [];
    protected $table = 'offers';

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'id', 'restaurant_id');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('offers')
            ->singleFile();
    }
}
