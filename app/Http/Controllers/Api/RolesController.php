<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    /**
     * Handle the incoming request to get all the roles.
     * The method will return all the roles in the database.
     * The method will check if the user has the permission to get all the roles.
     * The method will return a json response with the roles.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Check if the user has the permission to get all the roles
        if($this->hasAnyPermission(['read-roles'])){
            // Get all the roles
            $roles = Role::all();
            
            // Return a json response with the roles
            return response()->json($roles,200);
        }
        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to get all the roles.'],401);
    }

    /**
     * Handle the incoming request to get a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to get a role.
     * The method will return a json response with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request){

        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for roles
        $request->validate([
            'id' => 'required|integer|exists:roles,id'
        ]);
        // Get the role $object with the id passed in the request
        $role = Role::find($request->id);

        // Check if the user has the permission to get a role
        if($this->hasAnyPermission(['read-roles',"read-role-{$role->name}"])){
            // Return a json response with the role
            return response()->json($role,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to get the role.'],401);
    }

    /**
     * Handle the incoming request to create a role.
     * The method will create a role with the name passed in the request.
     * The method will check if the user has the permission to create a role.
     * The method will return a json response with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){

        // Validate the request to see if the name is passed and if it is a string
        $request->validate([
            'name' => 'required|string',
            "display_name" => 'required|string',
            "description" => 'required|string',
        ]);

        // Check if the user has the permission to create a role
        if($this->hasAnyPermission(['create-roles'])){
            
            // Create the role
            $role = Role::create([
                'name' => $request->name,
                'display_name' => $request->display_name,
                'description' => $request->description,
            ]);

            // Create permission to read the specific role created.
            $permission = Permission::create([
                'name' => "read-role-{$role->name}",
                'display_name' => "Read {$role->display_name} role",
                'description' => "Read {$role->display_name} role",
            ]);

            // Return a json response with the role and a message that a new role and corrosponding permission have been created
            return response()->json(['role' => $role, 'message' => 'A new role and corrosponding permission have been created.'],200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to create a role.'],401);
    }

    /**
     * Handle incoming request to update a role
     * The method will update the role that is passed in the request.
     * The method will check if the user has the permission to update role.
     * The method will update the role and also update the single permissions for the role
     * The method will return a response with the update role and permission
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){

        // Validate request to see if the role_id has been passed and all other required fields
        $request->validate([
            "role_id" => "required|integer|exists:roles,id",
            'name' => 'required|string',
            "display_name" => 'required|string',
            "description" => 'required|string',
        ]);

        // Check if the user has the permission to update a role
        if($this->hasAnyPermission(['update-roles'])){
            // Get the role object with the id passed in the request
            $role = Role::find($request->role_id);
            // Get the permission object with the name passed in the request
            $permission = Permission::where('name',"read-role-{$role->name}")->first();
            // Update the role
            $role->update([
                'name' => $request->name,
                'display_name' => $request->display_name,
                'description' => $request->description,
            ]);
            // Update the permission for the role
            $permission->update([
                'name' => "read-role-{$role->name}",
                'display_name' => "Read {$role->display_name} role",
                'description' => "Read {$role->display_name} role",
            ]);
            // Return a json response with the role
            return response()->json($role,200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to update a role.'],401);
    }

    /**
     * Handle incoming request to delete a role
     * The method will delete the role that is passed in the request.
     * The method will check if the user has the permission to delete role.
     * The method will delete the role and also delete the single permissions for the role
     * The method will return a response with the delete role and permission
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request){

        // Validate request to see if the role_id has been passed and all other required fields
        $request->validate([
            "role_id" => "required|integer|exists:roles,id",
        ]);

        // Check if the user has the permission to delete a role
        if($this->hasAnyPermission(['delete-roles'])){
            // Get the role object with the id passed in the request
            $role = Role::find($request->role_id);
            // Get the permission object with the name passed in the request
            $permission = Permission::where('name',"read-role-{$role->name}")->first();
            // Delete the role
            $role->delete();
            // Delete the permission for the role
            $permission->delete();
            // Return a json response with the message that the role has been deleted
            return response()->json(['message' => 'The role has been deleted.'],200);
        }

        // Return a json response with the error message if the user does't have the permission
        return response()->json(['error' => 'You don\'t have the permission to delete a role.'],401);
    }
}
