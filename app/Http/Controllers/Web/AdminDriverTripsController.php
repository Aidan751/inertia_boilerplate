<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminDriverTripsController extends Controller
{
    /**
        * Display a listing of the resource.
        *
        * @return \Illuminate\Http\Response
        */
        public function index(Request $request, User $driver)
        {
                $from = $request->get('from', '');
                $to = $request->get('to', '');

                $orders = Order::with('restaurant')->where('user_id', $driver->id)
                ->when($from, function($q) use ($from) {
                   $q->whereDate('pickup_date', '>=', $from);
               })
               ->when($to, function($q) use ($to) {
                   $q->whereDate('pickup_date', '<=', $to);
               })
                ->latest()
                ->paginate($request->perPage ?? 10);




            return Inertia::render('MainAdmin/Drivers/Trips/Index', [
                'orders' => $orders,
                'driver' => $driver,
                'from' => $request->from ?? '',
                'to' => $request->to ?? '',
                'perPage' => $request->perPage ?? 10
            ]);
        }
}