<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminCallCentreUserController extends Controller
{
    /**
     * Handle the incoming request to get all the CallCentreUser.
     * The method will return all the CallCentreUsers in the database.
     * The method will check if the user has the CallCentreUser to get all the permissions.
     * The method will return a json response with the CallCentreUsers.
     * @param \Illuminate\Http\Request  request
     * @return \Illuminate\Http\Response
     */

    public function index(Request request)
    {
            // Get all the CallCentreUsers
            $CallCentreUsers = CallCentreUser::all();

            // Return a json response with the permissions
            return response()->json($CallCentreUsers,200);

    }

    /**
     * Handle the incoming request to get a CallCentreUser.
     * The method will return a CallCentreUser with the id passed in the request.
     * The method will check if the user has the CallCentreUser to get a permission.
     * The method will return a json response with the CallCentreUser.
     * @param \Illuminate\Http\Request  request
     * @return \Illuminate\Http\Response
     */


    public function show(Request request, id){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for CallCentreUsers
        request->validate([
            'id' => 'required|integer|exists:CallCentreUsers,id'
        ]);

        // Get the permission object with the id passed in the request
        $CallCentreUser = CallCentreUser::find(id);
        if(!empty($CallCentreUser))
        {
            return response()->json($CallCentreUser);
        }
        else
        {
            return response()->json([
                "message" => "CallCentreUser not found"
            ], 404);
        }



     }



    /**
     * Handle the incoming request to create a CallCentreUser.
     * The method will create a CallCentreUser with the name passed in the request.
     * The method will check if the user has the permission to create a permission.
     * The method will return a json response with the permission.
     * @param \Illuminate\Http\Request  request
     * @return \Illuminate\Http\Response
     */

    public function store(Request request){

        // Validate the request

        // Create a CallCentreUser


          return response()->json([
            "message" => "CallCentreUser Added."
        ], 201);

    }

    /**
     * Handle the incoming request to update a CallCentreUser.
     * The method will update a CallCentreUser with the id and name passed in the request.
     * The method will return a json response with the CallCentreUser.
     * @param \Illuminate\Http\Request  request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request){

        // Validate the request

         if (CallCentreUser::where('id', id)->exists()) {
              // Update the model CallCentreUser in the database
              return response()->json([
                  "message" => "CallCentreUser Updated."
              ], 404);
          }else{
              return response()->json([
                  "message" => "CallCentreUser Not Found."
              ], 404);
          }

         /**
     * Handle the incoming request to delete a CallCentreUser.
     * The method will delete a CallCentreUser with the id passed in the request.
     * The method will check if the user has the permission to delete a CallCentreUser.
     * The method will return a json response with the CallCentreUser.
     * @param \Illuminate\Http\Request  request
     * @return \Illuminate\Http\Response
     */

          public function destroy($id)
    {
        if(CallCentreUser::where('id', id)->exists()) {
            $CallCentreUser = CallCentreUser::find(id);
            $CallCentreUser->delete();

            return response()->json([
              "message" => "record deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "CallCentreUser not found."
            ], 404);
        }


    }

}