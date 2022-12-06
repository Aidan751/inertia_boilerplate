<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\UserDriver;
use App\Models\Configuration;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Cashier\Billable as CashierBillable;
use ExpDev07\CashierConnect\Contracts\StripeAccount;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use ExpDev07\CashierConnect\Billable as ConnectBillable;

class User extends Authenticatable implements StripeAccount
{
    use LaratrustUserTrait;
    use HasApiTokens, HasFactory, Notifiable, Billable;

    use CashierBillable;
    use ConnectBillable;

    public $commission_type = 'percentage';
    public $commission_rate = 15;

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
        "role_id",
        "restaurant_id",
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

    // user belongs to many restaurants
    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'user_restaurant');
    }

    // user belongs to one driver
    public function driver()
    {
        return $this->hasOne(UserDriver::class);
    }
}
