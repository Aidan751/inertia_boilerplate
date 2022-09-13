<?php

namespace App\Http\Controllers\Web;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RolesController extends Controller
{
    /**
     * Handle the incoming request to get all the roles.
     * The method will return all the roles in the database.
     * The method will check if the user has the permission to get all the roles.
     * The method will return an inertia view with the roles.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        // Check if the user has the permission to get all the roles
        if($this->hasAnyPermission(['read-roles'])){
            // Get all the roles
            $roles = Role::all();

            // Return an inertia view with the roles
            return Inertia::render('Roles/Index', [
                'roles' => $roles,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to get all the roles.',
        ]);
    }

    /**
     * Handle the incoming request to get a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to get a role.
     * The method will return an inertia view with the role.
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
        if($this->hasAnyPermission(['read-roles'])){
            // Return an inertia view with the role
            return Inertia::render('Roles/Show', [
                'role' => $role,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to get the role.',
        ]);
    }

    /**
     * Handle the incoming request to create a role.
     * The method will return an inertia view with the permissions.
     * The method will check if the user has the permission to create a role.
     * The method will return an inertia view with the permissions.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        // Validate the request to see if the name is passed and if it is a string
        $request->validate([
            'name' => 'required|string',
            'display_name' => 'required|string',
            'description' => 'required|string',
        ]);

        // Check if the user has the permission to create a role
        if($this->hasAnyPermission(['create-roles'])){
            // Create the role
            $role = Role::create([
                'name' => $request->name,
                'display_name' => $request->display_name,
                'description' => $request->description,
            ]);

            // Return an inertia view with the role
            return Inertia::render('Roles/Show', [
                'role' => $role,
            ]);
        } else {
            // Return an inertia view with the error message if the user does't have the permission
            return Inertia::render('Error', [
                'error' => 'You don\'t have the permission to create a role.',
            ]);
        }
    }

    /**
     * Handle the incoming request to update a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to update a role.
     * The method will return an inertia view with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request)
    {
        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for roles
        $request->validate([
            'id' => 'required|integer|exists:roles,id',
            'name' => 'required|string',
            'display_name' => 'required|string',
            'description' => 'required|string',
        ]);

        // Get the role $object with the id passed in the request
        $role = Role::where('id', $request->id)->first();

        // Check if the user has the permission to update a role
        if($this->hasAnyPermission(['update-roles'])){
            // Update the role
            $role->update([
                'name' => $request->name,
                'display_name' => $request->display_name,
                'description' => $request->description,
            ]);

            // Return an inertia Index view with a success message and all the roles.
            return Inertia::render('Roles/Index', [
                'success' => 'The role has been updated.',
                'roles' => Role::all(),
            ]);

        } else {
            // Return an inertia Index view with the error message if the user doesn't have the permission with all roles.
            return Inertia::render('Roles/Index', [
                'error' => 'You don\'t have the permission to update a role.',
                'roles' => Role::all(),
            ]);

        }
    }

    /**
     * Handle the incoming request to delete a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to delete a role.
     * The method will return an inertia view with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request)
    {
        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for roles
        $request->validate([
            'id' => 'required|integer|exists:roles,id'
        ]);

        // Get the role $object with the id passed in the request
        $role = Role::where('id', $request->id)->first();

        // Check if the user has the permission to delete a role
        if($this->hasAnyPermission(['delete-roles'])){
            // Delete the role
            $role->delete();

            // Return an inertia Index view with a success message and all the roles
            return Inertia::render('Roles/Index', [
                'success' => 'The role has been deleted.',
                'roles' => Role::all(),
            ]);
        } else {
            // Return an inertia Index view with the error message if the user does't have the permission
            return Inertia::render('Roles/Index', [
                'error' => 'You don\'t have the permission to delete the role.',
                'roles' => Role::all(),
            ]);
        }
    }
}