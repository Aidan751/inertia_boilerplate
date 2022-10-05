<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    /**
     * Handle the incoming api authentication request.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validate the request...
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        // Get the credentials from the request
        $credentials = request(['email', 'password']);

        // Check if the credentials are correct
        if (!Auth::attempt($credentials)) {

            // If the credentials are incorrect return a 401
            return response()->json([
                'message' => 'Password or email is incorrect'
            ], 401);
        }
        // Get the user from the request
        $user = $request->user();

        // Create a token for the user
        $tokenResult = $user->createToken('Personal Access Token');

        // Get the token from the token result
        $token = $tokenResult->plainTextToken;
        // Check if the remember me checkbox was checked
        if ($request->remember_me){
            $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();
        }
        // Return the token
        return response()->json([
            "user" => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Handle the incoming api logout request.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request){
        // Get the user from the request
        $user = $request->user();
        // Revoke the current access token for this device
        $user->token()->revoke();
        // Return a message
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Handle the incoming api refresh token request.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function refresh(Request $request){
        // Get the user from the request
        $user = $request->user();
        // Revoke the current access token for this device
        $user->token()->revoke();
        // Create a new token for the user
        $tokenResult = $user->createToken('Personal Access Token');
        // Get the token from the token result
        $token = $tokenResult->token;
        // Check if the remember me checkbox was checked
        if ($request->remember_me){
            $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();
        }
        // Return the token
        return response()->json([
            "user" => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Handle the incoming api user request.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request){
        // Get the user from the request
        $user = $request->user();
        // Return the user
        return response()->json([
            "user" => $user
        ]);
    }

    /**
     * Handle the incoming api user delete request.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request){
        // Get the user from the request
        $user = $request->user();
        // Delete the user
        $user->delete();
        // Return a message
        return response()->json([
            'message' => 'Successfully deleted user'
        ]);
    }
}
