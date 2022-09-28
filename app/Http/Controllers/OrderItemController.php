<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    // show an order item
    public function show(OrderItem $orderItem)
    {
        return Inertia::render('MainAdmin/OrderItems/Show', [
            'orderItem' => $orderItem
        ]);
    }
}