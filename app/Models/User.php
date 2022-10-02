<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Order;
use App\Models\Configuration;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use LaratrustUserTrait;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'contact_number',
        'email',
        'email_verified_at',
        'password',
        'is_suspended',
        "role_id"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // user has many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // user has one configuration
    public function configuration()
    {
        return $this->hasOne(Configuration::class);
    }

    // get user full name
    public function getFullName()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}