<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


use App\Models\User;
use App\Models\UserPasswordReset;



class ForgotPasswordController extends Controller
{
    public function create(Request $request) {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $record = UserPasswordReset::where('user_id', $user->id)->delete();
            $verification = new UserPasswordReset;
            $verification->user_id = $user->id;
            $six_digit_random_number = mt_rand(100000, 999999);
            $verification->verification_code = $six_digit_random_number;

            $verification->save();

            $subject = config('app.name') . ' Forgotten Password Request';

            Mail::send('email.password-reset', array(
                'code' => $six_digit_random_number,
                'subject' => $subject
              ), function ($message) use ($user, $subject) {
                  $message->to($user->email);
                  $message->subject($subject);
              });

            

            return response()->json([
                "message" => "Success"
            ], 200);
        } else {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }
    }

    public function submit(Request $request) {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $record = UserPasswordReset::where('user_id', $user->id)->where('verification_code', $request->code)->first();

            if ($record != null) {
                $user->password = bcrypt($request->password);
                $user->save();

                return response()->json([
                    "message" => "Success, your password has been updated."
                ], 200);
            } else {
                return response()->json([
                    "message" => "Your verification code is incorrect"
                ], 404);
            }     
        } else {
            return response()->json([
                "message" => "No user has been found with this email address"
            ], 404);
        }
    }
}
