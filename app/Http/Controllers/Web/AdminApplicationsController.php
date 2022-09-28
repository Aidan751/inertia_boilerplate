<?php

namespace App\Http\Controllers\Web;


use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Models\RestaurantCategory;
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
          // Find the model for this ID
          $logo = $restaurant->logo()->first();
          $banner = $restaurant->banner()->first();
          $categories = RestaurantCategory::orderBy('name')->get();
 
          $restaurant->setAttribute('categories', $categories);
          $restaurant->setAttribute('edit', false);
 
              $restaurant->logo = $logo->img_url ?? null;
 
 
 
             $restaurant->banner = $banner->img_url ?? null;
 
 
          $url = '';//config('app.url');
 
        return Inertia::render('MainAdmin/RestaurantAdminApplicants/Show', [
            'restaurant' => $restaurant,
            'categories' => $categories,
        ]);
    }

    //  decline the restaurant application
    public function decline(Restaurant $restaurant)
    {
        $restaurant->application_status = 'declined';
        $restaurant->save();

        return redirect()->route('admin-applications.index')->with('success', 'Business application declined');
    }

    // approve the restaurant application
    public function approve(Restaurant $restaurant)
    {
        $restaurant->application_status = 'approved';
        $restaurant->save();

        return redirect()->route('admin-applications.index')->with('success', 'Business application approved');
    }
}