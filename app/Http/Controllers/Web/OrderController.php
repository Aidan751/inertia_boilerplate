<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
     /**
     * Handle the incoming request to get all the orders.
     * The method will return all the orders in the database.
     * The method will return an inertia view with the orders.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {

        // Get all orders, paginate through them using the "perPage" parameter. Search through the orders, if the "search" parameter is present.
        if($request->search !== null){

            $orders = Order::where(function ($q) use ($search) {
               // Add your own filter values here
               //$q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $orders = Order::paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the orders
        return Inertia::render('RestaurantAdmin/Orders/Index', [
            'orders' => $orders,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }
}