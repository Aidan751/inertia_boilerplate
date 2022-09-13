<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PermissionsController extends Controller
{
    /**
     * Handle the incoming request to get all the permissions.
     * The method will return all the permissions in the database.
     * The method will check if the user has the permission to get all the permissions.
     * The method will return an inertia view with the permissions.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Check if the user has the permission to get all the permissions
        if($this->hasAnyPermission(['read-permissions'])){
            // Get all the permissions
            $permissions = Permission::all();

            // Return an inertia view with the permissions
            return Inertia::render('Permissions/Index', [
                'permissions' => $permissions,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to get all the permissions.',
        ]);
    }

    /**
     * Handle the incoming request to get a permission.
     * The method will return a permission with the id passed in the request.
     * The method will check if the user has the permission to get a permission.
     * The method will return an inertia view with the permission.
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
        if($this->hasAnyPermission(['read-permissions'])){
            // Return an inertia view with the permission
            return Inertia::render('Permissions/Show', [
                'permission' => $permission,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to get a permission.',
        ]);
    }

    /**
     * Handle the incoming request to create a permission.
     * The method will check if the user has the permission to create a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request){
        // Check if the user has the permission to create a permission
        if($this->hasAnyPermission(['create-permissions'])){
            // Return an inertia view with the permission
            return Inertia::render('Permissions/Create');
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to create a permission.',
        ]);

    }

    /**
     * Handle the incoming request to store a permission.
     * The method will store a permission in the database.
     * The method will check if the user has the permission to store a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request){
        // Validate the request to see if the name is passed, if the name is a string and if it exists in the database table for permissions
        $request->validate([
            'name' => 'required|string|unique:permissions,name'
        ]);

        // Check if the user has the permission to store a permission
        if($this->hasAnyPermission(['create-permissions'])){
            // Create a permission object
            $permission = new Permission();
            // Set the name of the permission
            $permission->name = $request->name;
            // Save the permission in the database
            $permission->save();

            // Return an inertia view with the permission
            return Inertia::render('Permissions/Show', [
                'permission' => $permission,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to store a permission.',
        ]);

    }

    /**
     * Handle the incoming request to edit a permission.
     * The method will return a permission with the id passed in the request.
     * The method will check if the user has the permission to edit a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request){
        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for permissions
        $request->validate([
            'id' => 'required|integer|exists:permissions,id'
        ]);
        // Get the permission $object with the id passed in the request
        $permission = Permission::find($request->id);

        // Check if the user has the permission to edit a permission
        if($this->hasAnyPermission(['update-permissions'])){
            // Return an inertia view with the permission
            return Inertia::render('Permissions/Edit', [
                'permission' => $permission,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to edit a permission.',
        ]);
    }

    /**
     * Handle the incoming request to update a permission.
     * The method will update a permission in the database.
     * The method will check if the user has the permission to update a permission.
     * The method will return an inertia view with the permission.
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

        // Validate the request to see if the name is passed, if the name is a string and if it exists in the database table for permissions
        $request->validate([
            'name' => 'required|string|unique:permissions,name'
        ]);

        // Check if the user has the permission to update a permission
        if($this->hasAnyPermission(['update-permissions'])){
            // Set the name of the permission
            $permission->name = $request->name;
            // Save the permission in the database
            $permission->save();

            // Return an inertia view with the permission
            return Inertia::render('Permissions/Show', [
                'permission' => $permission,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to update a permission.',
        ]);
    }

    /**
     * Handle the incoming request to delete a permission.
     * The method will delete a permission in the database.
     * The method will check if the user has the permission to delete a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function delete(Request $request){
        // Validate the request to see if the id is passed, if the id is an integer and if it exists in the database table for permissions
        $request->validate([
            'id' => 'required|integer|exists:permissions,id'
        ]);
        // Get the permission $object with the id passed in the request
        $permission = Permission::find($request->id);

        // Check if the user has the permission to delete a permission
        if($this->hasAnyPermission(['delete-permissions'])){
            // Delete the permission in the database
            $permission->delete();

            // Return an inertia view with the permission
            return Inertia::render('Permissions/Show', [
                'permission' => $permission,
            ]);
        }
        // Return an inertia view with the error message if the user does't have the permission
        return Inertia::render('Error', [
            'error' => 'You don\'t have the permission to delete a permission.',
        ]);
    }
}