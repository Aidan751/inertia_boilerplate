<?php
namespace App\Http\Controllers\Web\Restaurant;

use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class StripeController extends Controller
{
    public function link(Request $request)
    {

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );

        $restaurant = Restaurant::find(Auth::user()->restaurant_id);


        if ($restaurant->stripe_status == "incomplete") {
            // Needs to connect with stripe

          $link = $stripe->accountLinks->create([
                'account' => $restaurant->stripe_account_id,
                'refresh_url' => 'https://orderit.createaclients.co.uk/restaurant/stripe',
                'return_url' => 'https://orderit.createaclients.co.uk/restaurant/stripe/complete',
                'type' => 'account_onboarding',
              ]);

            return redirect($link->url);
        } else {
            return Inertia::render('RestaurantAdmin/Stripe/Complete');
        }
    }
    //     if ($restaurant->stripe_status == "incomplete") {
    //         // Needs to connect with stripe
    //         $link = $stripe->accountLinks->create([
    //             'account' => $restaurant->stripe_account_id,
    //             'refresh_url' => $appURL . '/restaurant/stripe',
    //             'return_url' => $appURL . '/restaurant/stripe/complete',
    //             'type' => 'account_onboarding',
    //         ]);

    //         return redirect($link->url);
    //     } else {
    //         return Inertia::render('RestaurantAdmin/Stripe/Complete');
    //     }
    // }

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
                return Inertia::render('RestaurantAdmin/Stripe/Complete', [
                    'stripeAccount' => $stripeAccount,
                ]);
            } else {
              return $this->link($request);
            }
        } else {
           return $this->link($request);
        }

    }
}