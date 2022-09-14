<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminApplicationsController extends Controller
{
    /**
     * Handle the incoming request to get all the adminApplication.
     * The method will return all the adminApplications in the database.
     * The method will check if the user has the adminApplication to get all the permissions.
     * The method will return a json response with the adminApplications.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
            // Get all the adminApplications
            $adminApplications = AdminApplication::all();

            // Return a json response with the permissions
            return response()->json($adminApplications,200);

    }

    /**
     * Handle the incoming request to get a adminApplication.
     * The method will return a adminApplication with the id passed in the request.
     * The method will check if the user has the adminApplication to get a permission.
     * The method will return a json response with the adminApplication.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function show(Request $request, $id){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for adminApplications
        $request->validate([
            'id' => 'required|integer|exists:adminApplications,id'
        ]);

        // Get the adminApplication $object with the id passed in the request
        $adminApplication = AdminApplication::find($id);
        if(!empty($adminApplication))
        {
            return response()->json($adminApplication);
        }
        else
        {
            return response()->json([
                "message" => "AdminApplication not found"
            ], 404);
        }



     }



    /**
     * Handle the incoming request to create a adminApplication.
     * The method will create a adminApplication with the name passed in the request.
     * The method will check if the user has the adminApplication to create a permission.
     * The method will return a json response with the adminApplication.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request){

        // Validate the request

        // Create a AdminApplication


          return response()->json([
            "message" => "AdminApplication Added."
        ], 201);

    }

    /**
     * Handle the incoming request to update a adminApplication.
     * The method will update a adminApplication with the id and name passed in the request.
     * The method will return a json response with the adminApplication.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request){

        // Validate the request

         if (AdminApplication::where('id', $id)->exists()) {
              // Update the model AdminApplication in the database
              return response()->json([
                  "message" => "AdminApplication Updated."
              ], 404);
          }else{
              return response()->json([
                  "message" => "AdminApplication Not Found."
              ], 404);
          }

         /**
     * Handle the incoming request to delete a adminApplication.
     * The method will delete a adminApplication with the id passed in the request.
     * The method will check if the user has the permission to delete a adminApplication.
     * The method will return a json response with the adminApplication.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

          public function destroy($id)
    {
        if(AdminApplication::where('id', $id)->exists()) {
            $adminApplication = AdminApplication::find($id);
            $adminApplication->delete();

            return response()->json([
              "message" => "record deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "AdminApplication not found."
            ], 404);
        }


    }

}