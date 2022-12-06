<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UserStripe;
use Illuminate\Support\Facades\Log;


class StripeController extends Controller
{
    public function cancelSession(Request $request) {
        return view('cancel');
    }


    public function createSession(Request $request) {

        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $stripe = new \Stripe\StripeClient(config('stripe.sk'));

        $user = auth('api')->user();
        $stripeObject = auth('api')->user()->stripe;
        $customer = "";

        $appURL = config('app.url');

        if ($stripeObject == null) {
            // Create stripe customer account if one doesn't exist already
            $stripeCustomerAccount = $stripe->customers->create([
                    'email' => $user->email,
            ]);
            $stripeUser = new UserStripe;
            $stripeUser->user_id = $user->id;
            $stripeUser->stripe_account_id = $stripeCustomerAccount->id;
            $stripeUser->save();
            $customer = $stripeCustomerAccount->id;
        } else {
            $customer = $stripeObject->stripe_account_id;
        }

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'mode' => 'setup',
            'customer' => $customer,
            'success_url' => $appURL . '/stripe/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' =>  $appURL . '/stripe/cancel',
          ]);

          return response()->json([
            "data" => $session->url
        ], 200);
    }

    public function retrieveSession(Request $request) {

        $stripe = new \Stripe\StripeClient(config('services.stripe_secret_key'));

        $session = $stripe->checkout->sessions->retrieve(
            $request->get('session_id'),
            []
        );

        $setupIntentId = $session->setup_intent;
        $setupIntent =  $stripe->setupIntents->retrieve($setupIntentId, []);
        $paymentMethodId = $setupIntent->payment_method;
        $customer = $session->customer;


        $attach = $stripe->paymentMethods->attach($paymentMethodId, [
            'customer' => $customer
        ]);

        $update = $stripe->customers->update($customer, ['invoice_settings' => ['default_payment_method' => $paymentMethodId]]);
        $stripeDetails =  UserStripe::where('stripe_account_id', $customer)->first();
        if ($stripeDetails != null) {

        $stripeDetails->update([
            "payment_method_id" => $paymentMethodId,
            "expiry_year" => $attach->card->exp_year,
            "expiry_month" => $attach->card->exp_month,
            "card_last_four" => $attach->card->last4,
        ]);
        }

        return view('success');
    }



    public function addPaymentMethod(Request $request){

        $request->validate([
            'payment_method_id' => ['required'],
        ]);

        $stripe = new \Stripe\StripeClient(
            config('stripe.sk')
        );

        $user = auth('api')->user();
        $stripeObject = auth('api')->user()->stripe;
        $customer = "";
        $paymentMethodID = $request->payment_method_id;
        if ($stripeObject == null) {
            // Create stripe customer account if one doesn't exist already
            $stripeCustomerAccount = $stripe->customers->create([
                    'email' => $user->email,
            ]);
            $stripeUser = new UserStripe;
            $stripeUser->user_id = $user->id;
            $stripeUser->stripe_account_id = $stripeCustomerAccount->id;

            $stripeUser->save();

            $customer = $stripeCustomerAccount->id;
        } else {
            $customer = $stripeObject->stripe_account_id;
        }

        $setupIntent = $stripe->setupIntents->create([
            'customer' => $customer,
            'payment_method_types' => ['card'],
            'payment_method' => $paymentMethodID,

        ]);

        // Attach payment method to stripe customer

        $attach = $stripe->paymentMethods->attach($paymentMethodID, [
            'customer' => $customer
        ]);

        // Set payment method as default payment option

        $update = $stripe->customers->update($customer, ['invoice_settings' => ['default_payment_method' => $paymentMethodID]]);



        // // // Attach billing address to payment method

        //  $paymentMethod = $stripe->paymentMethods->update(
        //     $paymentMethodID,
        //     ['billing_details' =>
        //         [
        //             'email' => $user->email,
        //             'name' => $request->name,
        //             'address' => [
        //                 'line1' => $request->line1,
        //                 'line2' => $request->line2,
        //                 'city' => $request->town_city,
        //                 'state' => $request->county,
        //                 'country' => $request->country,
        //                 'postal_code' => $request->postcode,
        //             ],
        //         ],
        //     ],
        //   );

        $updateStripeDetails = null;

        if ($stripeObject != null) {
            $updateStripeDetails = $user->stripe;
        } else {
            $updateStripeDetails =   UserStripe::where('user_id', $user->id)->first();
        }

        $updateStripeDetails->update([
            "payment_method_id" => $paymentMethodID,
            "expiry_year" => $attach->card->exp_year,
            "expiry_month" => $attach->card->exp_month,
            "card_last_four" => $attach->card->last4,
        ]);


        return response()->json([
            'setupIntent' => $setupIntent,
        ], 200);
    }
}