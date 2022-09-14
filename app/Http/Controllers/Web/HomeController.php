<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
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
        // Check if the user has the permission to get the home page if not abort the request
        $this->validateWebPermission(['home-read']);

        // Return an inertia view with the home page
        return Inertia::render('Dashboard');
    }
}