<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PermissionsController extends Controller
{
    /**
     * Handle the incoming request to get all the permissions.
     * The method will return all the permissions in the database.
     * The method will check if the user has the permission to get all the permissions.
     * The method will return a json response with the permissions.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        // Check if the user has the permission to get all the permissions
        if($this->hasAnyPermission(['read-permissions'])){
            // Get all the permissions
            $permissions = Permission::all();

            // Return a json response with the permissions
            return response()->json($permissions,200);
        }
        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to get all the permissions.'],401);
    }

    /**
     * Handle the incoming request to get a permission.
     * The method will return a permission with the id passed in the request.
     * The method will check if the user has the permission to get a permission.
     * The method will return a json response with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function show(Request $request){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for permissions
        $request->validate([
            'id' => 'required|integer|exists:permissions,id'
        ]);
        // Get the permission $object with the id passed in the request
        $permission = Permission::find($request->id);

        // Check if the user has the permission to get a permission
        if($this->hasAnyPermission(['read-permissions',"read-permission-{$permission->name}"])){
            // Return a json response with the permission
            return response()->json($permission,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to get the permission.'],401);
    }

    /**
     * Handle the incoming request to create a permission.
     * The method will create a permission with the name passed in the request.
     * The method will check if the user has the permission to create a permission.
     * The method will return a json response with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request){

        // Validate the request to see if the name is passed and if it is a string
        $request->validate([
            'name' => 'required|string'
        ]);

        // Check if the user has the permission to create a permission
        if($this->hasAnyPermission(['create-permissions'])){
            // Create the permission
            $permission = Permission::create([
                'name' => $request->name
            ]);

            // Return a json response with the permission
            return response()->json($permission,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to create the permission.'],401);
    }

    /**
     * Handle the incoming request to update a permission.
     * The method will update a permission with the id and name passed in the request.
     * The method will check if the user has the permission to update a permission.
     * The method will return a json response with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for permissions
        $request->validate([
            'id' => 'required|integer|exists:permissions,id'
        ]);

        // Get the permission $object with the id passed in the request
        $permission = Permission::find($request->id);

        // Check if the user has the permission to update a permission
        if($this->hasAnyPermission(['update-permissions',"update-permission-{$permission->name}"])){
            // Update the permission
            $permission->update([
                'name' => $request->name
            ]);

            // Return a json response with the permission
            return response()->json($permission,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to update the permission.'],401);
    }

    /**
     * Handle the incoming request to delete a permission.
     * The method will delete a permission with the id passed in the request.
     * The method will check if the user has the permission to delete a permission.
     * The method will return a json response with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for permissions
        $request->validate([
            'id' => 'required|integer|exists:permissions,id'
        ]);

        // Get the permission $object with the id passed in the request
        $permission = Permission::find($request->id);

        // Check if the user has the permission to delete a permission
        if($this->hasAnyPermission(['delete-permissions',"delete-permission-{$permission->name}"])){
            // Delete the permission
            $permission->delete();

            // Return a json response with the permission
            return response()->json($permission,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to delete the permission.'],401);

    }


}