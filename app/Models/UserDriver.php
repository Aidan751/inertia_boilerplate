<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;


class UserDriver extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $guarded = [];
    protected $table = 'user_drivers';

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function registerMediaCollections()
    {


    }

}