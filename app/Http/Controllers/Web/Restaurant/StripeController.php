<?php
namespace App\Http\Controllers\Web\Restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;

use Illuminate\Support\Facades\Auth;


class StripeController extends Controller
{
    public function link(Request $request)
    {

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        $appURL = config('app.url');
        $restaurant = Auth::user()->restaurant;

        // $stripeAccount = $stripe->accounts->retrieve($restaurant->stripe_account_id);

        if ($restaurant->stripe_status == "incomplete") {
            // Needs to connect with stripe

          $link = $stripe->accountLinks->create([
                'account' => $restaurant->stripe_account_id,
                'refresh_url' => $appURL . '/admin/restaurant/stripe',
                'return_url' => $appURL . '/admin/restaurant/stripe/complete',
                'type' => 'account_onboarding',
              ]);

            return redirect($link->url);
        } else {
            return redirect('stripe.complete')->with('success', 'Your Stripe account is already connected.');
        }
    }

    public function complete(Request $request) {

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        $restaurant = Auth::user()->restaurant;
        $account = $restaurant->stripe_account_id;
        $id = $restaurant->id;

        if ($account != '') {
            $stripeAccount = $stripe->accounts->retrieve($account);
            if ($stripeAccount != null && $stripeAccount->charges_enabled == true) {
                Restaurant::find($id)->update(['stripe_status' => 'complete']);
                return view('restaurant.stripe.stripe');
            } else {
              return $this->link($request);
            }
        } else {
           return $this->link($request);
        }

    }
}