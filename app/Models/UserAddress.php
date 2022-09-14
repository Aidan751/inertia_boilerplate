<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;


class UserAddress extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $guarded = [];
    protected $table = 'user_addresses';

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
