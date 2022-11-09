<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;


use App\Models\User;
use App\Models\UserToken;
use App\Models\UserStripe;
use Illuminate\Support\Facades\Http;



class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator =
            Validator::make(
                $request->all(),
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',    
                    'password' => 'required',
                    'password_confirmation' => 'required|same:password',
                ]
            );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // Create the User table entry

        $user = new User;

        if (is_null($request->role_id)) {
            $user->role_id = 3;
        } else {
            $user->role_id = $request->role_id;
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        $user->save();

        if (!is_null($request->profile_picture)) {
            $user->addMediaFromRequest('profile_picture')->toMediaCollection('profile_picture');
        }

        $stripe = new \Stripe\StripeClient(
            config('services.stripe_secret_key')
        );
    
        $stripeCustomerAccount = $stripe->customers->create([
                'email' => $user->email,
            ]);

        $stripeUser = new UserStripe;
        $stripeUser->user_id = $user->id;
        $stripeUser->stripe_account_id = $stripeCustomerAccount->id;

        $stripeUser->save();

         // Create the token for all future requests to the API for this user
         $accessToken = $user->createToken('authToken')->plainTextToken;
        
        return response()->json([
            "status" => "Success",
            "message" => "User successfully created!",
            "user" => $user,
            "access_token" => $accessToken,
        ], 200);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!Auth::attempt($loginData)){
            return response()->json([
                "message" => 'Incorrect email or password'
            ], 401);
        }

        $user = $request->user();
         // Create the token for all future requests to the API for this user
         $accessToken = $user->createToken('authToken')->plainTextToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }

    


    public function logout(Request $request)
    {
        $token = UserToken::where('user_id', '=', auth('api')->user()->id)->where('token', '=', $request->token)->delete();
        $user = $request->user();

        $user->token()->delete();

        return response()->json([
            "message" => "Success",
        ], 200);
    }


    public function token(Request $request)
    {

        if (UserToken::where('user_id', '=', auth('api')->user()->id)->where('token', '=', $request->token)->exists()) {

            return response()->json([
                "message" => "Token already exists"
            ], 403);
        } else {

            $token = new UserToken;
            $token->user_id = auth('api')->user()->id;
            $token->token = $request->token;
            $token->platform = $request->platform;
            $token->version = $request->version;

            try {
                $token->save();
            } catch (QueryException $ex) {
                $errorCode = $ex->errorInfo[1];
                if ($errorCode == 1062) {
                    return response()->json([
                        'message' => $ex->errorInfo[2],
                    ], 400);
                } else {
                    return response()->json([
                        'message' => $ex,
                    ], 422);
                }
            }
            return response()->json([
                "message" => "Token successfully registered!"
            ], 200);
        }
    }

    public function get()
    {
        // Attempt to find the user
        $user = User::with('restaurant', 'stripe')->where('id', auth('api')->user()->id)->firstOrFail();
        $url = '';//config('app.url');
        $profilePic = $user->getMedia('profile_picture');

        if(!$profilePic->isEmpty()){
            $user->setAttribute('profile_picture', $url . $profilePic[0]->getFullUrl());
        }
        else{
            $user->setAttribute('profile_picture', null);
        }

        if ($user === null) {
            return response()->json([
                "message" => "User not logged in"
            ], 401);
        } else {
            return response($user, 200);
        }
    }

    public function update(Request $request)
    {
        // Attempt to find the user
        $user = User::where('id', auth('api')->user()->id)->first();

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;

        if (!is_null($request->profile_picture)) {
          
            $user->addMediaFromRequest('profile_picture')->toMediaCollection('profile_picture');
        }


        if (!is_null($request->current_password)) {
            if (Hash::check($request->current_password, $user->password)) {
                if (!is_null($request->email) && $request->email != $user->email) {
                    if (User::where('email', '=', $request->email)->exists()) {
                        return response()->json([
                        'message' => "This email is taken. Please enter a different email address.",
                    ], 400);
                    } else {
                        $user->email = $request->email;
                    }
                }

                if (!is_null($request->new_password)) {
                    $user->password = bcrypt($request->new_password);
                }

            
                try {
                    $user->push();
                } catch (QueryException $ex) {
                    $errorCode = $ex->errorInfo[1];
                    if ($errorCode == 1062) {
                        return response()->json([
                        'message' => $ex->errorInfo[2],
                    ], 400);
                    } else {
                        return response()->json([
                        'message' => $ex,
                    ], 422);
                    }
                }
                return response()->json([
                "message" => "User successfully updated!"
            ], 201);
            } else {
                return response()->json([
                "message" => "Your current password is incorrect"
            ], 401);
            }
        } else {
            $user->save();
            return response()->json([
                "message" => "User successfully updated!"
            ], 201);
        }
    }

    public function delete()
    {
        if (User::where('id', auth('api')->user()->id)->exists()) {
            $user = User::find(auth('api')->user()->id);

            if (count($user->media) > 0) {
                $user->media[0]->delete();
            }
            $user->delete();

            return response()->json([
                "message" => "Record Deleted"
            ], 200);
        } else {
            return response()->json([
                "message" => "User record not found"
            ], 404);
        }
    }


}
