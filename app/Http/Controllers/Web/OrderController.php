<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
     /**
     * Handle the incoming request to get all the orders.
     * The method will return all the orders in the database.
     * The method will return an inertia view with the orders.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request, User $user)
    {
          // Get all users, paginate through them using the "perPage" parameter. Search through the users, if the "search" parameter is present.
          $search = $request->search ?? null;

          if($search !== null){

              $orders = Order::where('user_id', $user->id)->where(function ($q) use ($search) {
                 $q->where('customer_name', 'LIKE', '%' . $search . '%')->orWhere('customer_contact_number', 'LIKE', '%' . $search . '%')->orWhere('address_line_1', 'LIKE', '%' . $search . '%')->orWhere('address_line_2', 'LIKE', '%' . $search . '%')->orWhere('town', 'LIKE', '%' . $search . '%')->orWhere('postcode', 'LIKE', '%' . $search . '%')->orWhere('status', 'LIKE', '%' . $search . '%');
              })
              ->latest()
              ->paginate(10);
          }
          else {

              $orders = Order::where('user_id', $user->id)->paginate($request->perPage ?? 10);
          }


          // Return an inertia view with the users
          return Inertia::render('MainAdmin/Orders/Index', [
              'user' => $user,
              'orders' => $orders,
              "perPage" => $request->perPage ?? 10,
              "search" => $request->search ?? null
          ]);

    }

    /**
     * Handle the incoming request to get a single order.
     * The method will return a single order in the database.
     * The method will return an inertia view with the order.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function show(Request $request, Order $order)
    {
        $order_items = OrderItem::where('order_id', $order->id)->get();
        $user = User::find($order->user_id);
        // Return an inertia view with the order
        return Inertia::render('MainAdmin/Orders/Show', [
            'user' => $user,
            'order' => $order,
            'order_items' => $order_items
        ]);
    }
}