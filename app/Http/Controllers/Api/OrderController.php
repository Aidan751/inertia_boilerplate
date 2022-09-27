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

        $user = User::whereRoleIs('restaurant_admin')->first();

        $customer = $request->get('customer', '');
        $status = $request->get('status', '');
        $from = $request->get('from', '');
        $to = $request->get('to', '');

        $customers = User::whereHas('orders', function ($q) use($user) {
            $q->where('restaurant_id', Auth::user()->restaurant_id);
        })->orderBy('last_name')->get();
        $customersArray = [];
        array_push($customersArray, ["placeholder" => true, "text" => "Select a customer"]);

        foreach ($customers as $user) {

            $selected = false;

            if ($customer == $user->id) {
                $selected = true;
            }

            array_push($customersArray, ["text" => $user->getFullName(), "value" => $user->id, "selected" =>  $selected]);

        }

        $order = new Order;

        $orders = $order->with('customer', 'driver')
            ->where('restaurant_id', Auth::user()->restaurant_id)
            ->when($from, function($q) use ($from) {
                $q->whereDate('pickup_date', '>=', $from);
            })
            ->when($to, function($q) use ($to) {
                $q->whereDate('pickup_date', '<=', $to);
            })
            ->when('customer' != null, function($q) use ($customer) {
                if ($customer != null) {
                    $q->where('id', $customer);
                }
            })
             ->where('payment_status', 'paid')
             ->where(function ($q) use ($status) {

                 if ($status == 'complete') {
                     $q->where('status', 'completed');
                 } else if ($status == 'incomplete') {
                     $q->where('status', '!=', 'completed');
                 }
             })
             ->latest()
             ->paginate(10)->appends(request()->query());


        // Return an inertia view with the orders
        return Inertia::render('RestaurantAdmin/Orders/Index', [
            'orders' => $orders,
            'customer' => $customer,
            'status' => $status,
            'from' => $from,
            'to' => $to,
            'customers' => $customersArray,
            'user' => $user
        ]);
    }
}