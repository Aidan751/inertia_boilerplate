<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'restaurant_id',
    ];

    protected $guarded = [];
    protected $table = 'menu_categories';

    public function items()
    {
        return $this->hasMany(MenuItem::class)->orderBy('title');
    }
}