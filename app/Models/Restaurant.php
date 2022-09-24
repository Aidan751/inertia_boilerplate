<?php

namespace App\Models;

use App\Models\GroupDeal;
use Illuminate\Database\Eloquent\Model;
// use Spatie\MediaLibrary\HasMedia\HasMedia;
// use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class Restaurant extends Model implements HasMedia
class Restaurant extends Model
{
    use  HasFactory;
    // use  HasFactory, HasMediaTrait;


    protected $guarded = [];
    protected $table = 'restaurants';

    public function scopeIsWithinMaxDistance($query, $latitude, $longitude, $radius) {

        $haversine = "(3959 * acos(cos(radians(" . $latitude . "))
                        * cos(radians(`latitude`))
                        * cos(radians(`longitude`)
                        - radians(" . $longitude . "))
                        + sin(radians(" . $latitude . "))
                        * sin(radians(`latitude`))))";


        return $query->select()
                     ->selectRaw("{$haversine} AS distance")
                     ->whereRaw("{$haversine} < ?", [$radius])->orderBy('distance');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('logos')
            ->singleFile();

        $this->addMediaCollection('banners')
            ->singleFile();

    }

    public function openingHours() {
        return $this->hasMany(OpeningHour::class)->orderBy('day_id', 'ASC')->orderBy('from', 'ASC');
    }

    public function collectionTimes() {
        return $this->hasMany(CollectionTime::class)->orderBy('day_id', 'ASC')->orderBy('from', 'ASC');
    }

    public function menuItems() {
        return $this->hasMany(MenuItem::class, 'restaurant_id', 'id')->orderBy('menu_category_id', 'ASC');
    }

    public function offers() {
        return $this->hasMany(Offer::class, 'restaurant_id', 'id')->select(['id', 'title', 'description', 'restaurant_id'])->orderBy('created_at', 'DESC');
    }

    public function menuCategories() {
        return $this->hasMany(MenuCategory::class, 'restaurant_id', 'id')->select(['restaurant_id', 'id', 'title'])->has('items')->orderBy('title', 'ASC');
    }

    public function tableNumbers() {
        return $this->hasMany(TableNumber::class)->orderBy('created_at', 'ASC');
    }


    public function groupDeals() {
        return $this->hasMany(GroupDeal::class)->orderBy('created_at', 'DESC');
    }

    // add media from request
    public function addMediaFromRequest($request, $collection = 'default') {
        if ($request->hasFile('logo')) {
            $this->addMedia($request->file('logo'))->toMediaCollection('logos');
        }

        if ($request->hasFile('banner')) {
            $this->addMedia($request->file('banner'))->toMediaCollection('banners');
        }
    }


}
