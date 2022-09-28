<?php

namespace App\Http\Controllers\Web;


use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminApplicationsController extends Controller
{
    // list all the restaurants that have applied for the admin to approve
    public function index(Request $request)
    {
        $search = $request->search ?? null;

        if($search !== null){
            $restaurants = Restaurant::where('application_status', 'pending')
            ->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', '%' . $search . '%');
            })
            ->orderBy('name', 'asc')
            ->paginate(10);
        } else {
            $restaurants = Restaurant::where('application_status', 'pending')
            ->orderBy('name', 'asc')
            ->paginate($request->perPage ?? 10);
        }

        return Inertia::render('MainAdmin/RestaurantAdminApplicants/Index', [
            'restaurants' => $restaurants,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

    // show the restaurant application
    public function show(Restaurant $restaurant)
    {
        return Inertia::render('MainAdmin/RestaurantAdminApplicants/Show', [
            'restaurant' => $restaurant
        ]);
    }
}