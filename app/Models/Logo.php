<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Logo extends Model
{
    use HasFactory;

    protected $table = 'logo';
    protected $fillable = ['restaurant_id', 'img_url'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}