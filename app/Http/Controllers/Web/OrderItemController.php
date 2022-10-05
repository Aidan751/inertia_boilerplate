<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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