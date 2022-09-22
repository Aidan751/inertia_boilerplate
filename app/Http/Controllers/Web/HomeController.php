<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     * The method will check if the user has the permission to get the home page.
     * The method will return an inertia view with the home page.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if($request->user()->hasRole('main_admin')){
            return Inertia::render('MainAdmin/Dashboard');
        }
        else if($request->user()->hasRole('restaurant_admin')){
            return Inertia::render('RestaurantAdmin/Dashboard');
        }
        else if($request->user()->hasRole('call_center_admin')){
            return Inertia::render('CallCenterAdmin/Dashboard');
        }
        else {
            Auth::logout();
        }

    }
}