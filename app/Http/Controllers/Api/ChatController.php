<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Message;
use App\Models\ConversationUser;
use Carbon\Carbon;
use Illuminate\Database\QueryException;


class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('chat');
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages($id)
    {

        $user = ConversationUser::where('order_id', '=', $id)
        ->where('user_id', auth('api')->user()->id)
        ->update(["last_active" => Carbon::now()]);

        return Message:://with('user')->
        where('order_id', '=', $id)
        ->orderBy('created_at', 'desc')
        ->paginate(10);  
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage($id, Request $request)
    {
        $user = auth('api')->user();

        $message = new Message;
        $message->order_id = $id;
        $message->message = $request->message;
        $message->user_id = $user->id;

        $pushNotificationUsers = ConversationUser::where('order_id', '=', $id)
        ->where('user_id', '!=', $user->id)
        ->pluck('user_id')
        ->toArray();

        try {
            $message->save();
            app('App\Services\PushNotification')->sendPush(config('app.name'), "You have received a new message", $pushNotificationUsers, 'message', $id);

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
            "message" => "Message sent"
        ], 200); 
    }

    public function refresh($id, Request $request) {
        $user = ConversationUser::where('order_id', '=', $id)
        ->where('user_id', auth('api')->user()->id)
        ->update(["last_active" => Carbon::now()]);

        return Message::where('order_id', '=', $id)
        ->where('created_at', '>', $request->date)
        ->orderBy('created_at', 'desc')
        ->get();
    }

    public function calculateUnread($id) {
        $user = ConversationUser::where('order_id', '=', $id)
        ->where('user_id', auth('api')->user()->id)
        ->first();

        return Message::where('order_id', '=', $id)
        ->where('created_at', '>', $user->last_active) 
        ->count();
    }
}
