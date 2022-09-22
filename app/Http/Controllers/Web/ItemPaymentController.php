<?php

namespace App\Http\Controllers\Web;


use App\Http\Controllers\Controller;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ItemPaymentController extends Controller
{

    public function index(Request $request) {

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key'),
        );

        $order = Order::with('restaurant')->where('order_reference', $request->get('ref'))
        ->first();

        if ($order != null) {
            if ($order->payment_status == 'pending') {

                $businessStripe = $order->restaurant->stripe_account_id;
                $intent = $stripe->paymentIntents->retrieve($order->payment_intent_id, [], ['stripe_account' => $businessStripe]);

                if ($intent->status == 'requires_capture') {
                    $order->payment_status = "paid";
                    $order->save();
                }
            }

            $data = [
                'order' => $order,
            ];

            return view('call.order.view_order')->with($data);
        }

    }

    public function store(Request $request) {

        $this->validate($request, [
            'paymentIntent' => 'required',
            'order' => 'required',
        ]);

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key'),
        );

        $order = Order::where('order_reference', $request->order)
        ->first();

        $intent = $stripe->paymentIntents->retrieve(
           $request->paymentIntent,
            []
          );

        if (!is_null($order)) {

            if ($intent->status == 'requires_capture') {
                $order->payment_intent_id = $request->paymentIntent;
                $order->payment_status = "paid";
                $order->save();
                return back()->with('success', 'Your order has now been paid for.');
            } else {
                return back()->with('fail', 'An error has occurred, you have not been charged.');
            }

        } else {
            return redirect()->back()->with('fail',
            'Order not found');
        }
    }


}