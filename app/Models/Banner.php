<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Banner extends Model
{
    use HasFactory;

    protected $table = 'banner';
    protected $fillable = ['restaurant_id', 'img_url'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}