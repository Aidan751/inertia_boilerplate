<?php

namespace App\Models;

use App\Models\Logo;
use App\Models\Order;
use App\Models\Banner;
use App\Models\GroupDeal;
use App\Models\OpeningHour;
use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// class Restaurant extends Model implements HasMedia
class Restaurant extends Model
{
    use  HasFactory;


    protected $fillable = [
        'name',
        'description',
        'address',
        'phone',
        'email',
        'website',
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'logo',
        'banner',
        'group_deal',
        'opening_hours',
        'user_id',
        'category_id',
        'city_id',
        'country_id',
        'state_id',
        'status',
    ];

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

    // orders belonging to restaurant
    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function menuItems() {
        return $this->hasMany(MenuItem::class, 'restaurant_id', 'id')->orderBy('menu_category_id', 'ASC');
    }

    public function offers() {
        return $this->hasMany(Offer::class, 'restaurant_id', 'id')->select(['id', 'title', 'description', 'restaurant_id'])->orderBy('created_at', 'DESC');
    }

    public function menuCategories() {
        return $this->hasMany(MenuCategory::class, 'restaurant_id', 'id');
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


            // get media function
            public function getMedia($collection = 'default') {
                return $this->getMedia($collection);
            }

            // banner
            public function banner() {
                return $this->hasOne(Banner::class);
            }

            // logo
            public function logo() {
                return $this->hasOne(Logo::class);
            }


// get restaurant full address
// public function getFullAddressAttribute() {
//     return $this->address_line_1 . ', ' . $this->town . ', ' . $this->postcode;
// }
public function getFullAddressAttribute() {
    // todo: change before testing
    return '26 Wilson Street, Larkhall, South Lanarkshire, ML9 2QF';
}
}