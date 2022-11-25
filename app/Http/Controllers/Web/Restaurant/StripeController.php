<?php
namespace App\Http\Controllers\Web\Restaurant;

use App\Models\Order;
use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use URL;

class StripeController extends Controller
{

    public function connection(){
        $user = User::find(Auth::id());
        $stripe = null;
        try {
            $stripe = $user->asStripeAccount();
        }catch (\Exception $e){

        }

        return Inertia::render('RestaurantAdmin/Stripe/Connection', [
            'stripe' => $stripe
        ]);
    }

    /**
     * Creates an onboarding link and redirects the user there.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function board(Request $request): RedirectResponse
    {

       /* $user = User::find(2);
        $user->transferToStripeAccount(1000);

        dd('check');*/
      /*  $user = User::find(2);
        dd($user->asStripeAccount());*/

        return $this->handleBoardingRedirect($request->user());
    }

    /**
     * Handles returning from completing the onboarding process.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function returning(Request $request): RedirectResponse
    {
        return $this->handleBoardingRedirect($request->user());
    }

    /**
     * Handles refreshing of onboarding process.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function refresh(Request $request): RedirectResponse
    {
        return $this->handleBoardingRedirect($request->user());
    }

    /**
     * Handles the redirection logic of Stripe onboarding for the given user. Will
     * create account and redirect user to onboarding process or redirect to account
     * dashboard if they have already completed the process.
     *
     * @param User $user
     * @return RedirectResponse
     */
    private function handleBoardingRedirect(User $user): RedirectResponse
    {
        // Redirect to dashboard if onboarding is already completed.
        if ($user->hasStripeAccountId() && $user->hasCompletedOnboarding()) {
            return $user->redirectToAccountDashboard();
        }



        // Delete account if already exists and create new express account with
        // weekly payouts.
        $user->deleteAndCreateStripeAccount('express', [
            'capabilities' => [
                'card_payments' => ['requested' => true],
                'transfers' => ['requested' => true],
            ],
            'settings' => [
                'payouts' => [
                    'schedule' => [
                        'interval' => 'weekly',
                        'weekly_anchor' => 'friday',
                    ]
                ]
            ]
        ]);


        // Redirect to Stripe account onboarding, with return and refresh url, otherwise.
        return $user->redirectToAccountOnboarding(
            /*URL::to('/api/stripe/return?api_token=' . $user->api_token),
            URL::to('/api/stripe/refresh?api_token=' . $user->api_token)*/
            URL::to('/restaurant/stripe/connection?api_token=' . $user->api_token),
            URL::to('/restaurant/stripe/connection?api_token=' . $user->api_token)
        );
    }

}
