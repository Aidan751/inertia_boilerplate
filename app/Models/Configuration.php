<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Configuration extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'configurations';
    /**
     * Set timestamps off
     */
    public $timestamps = false;

    //configuration belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}