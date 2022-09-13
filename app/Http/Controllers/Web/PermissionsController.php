<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        // Check if the user has the permission to get all the permissions if not abort the request
        $this->validateWebPermission(['permissions-read']);
        
        // Get all the permissions
        $permissions = Permission::all();

        // Return an inertia view with the permissions
        return Inertia::render('Permissions/Index', [
            'permissions' => $permissions,
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
    public function show(Permission $permission){
        
        // Check if the user has the permission to get a permission if not abort the request
        $this->validateWebPermission(['permissions-read']);
        
        // Return an inertia view with the permission
        return Inertia::render('Permissions/Show', [
            'permission' => $permission,
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
        
        // Check if the user has the permission to create a permission if not abort the request
        $this->validateWebPermission(['permissions-create']);

        // Return an inertia view with the permission
        return Inertia::render('Permissions/Create');
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

        // Check if the user has the permission to create a permission if not abort the request
        $this->validateWebPermission(['permissions-create']);
        
        // Validate the request
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
            'display_name' => 'required|string',
            'description' => 'required|string',
        ]);

        // Create the permission
        $permission = Permission::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);

        // Return an inertia view with the permission
        return Inertia::render('Permissions/Show', [
            'permission' => $permission,
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
    public function edit(Permission $permission){
        
        // Check if the user has the permission to edit a permission if not abort the request
        $this->validateWebPermission(['permissions-update']);

        // Return an inertia view with the permission
        return Inertia::render('Permissions/Edit', [
            'permission' => $permission,
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
    public function update(Request $request, Permission $permission){

        // Check if the user has the permission to update a permission if not abort the request
        $this->validateWebPermission(['permissions-update']);

        // Validate the request
        $request->validate([
            'name' => 'required|string|unique:permissions,name,'.$permission->id,
            'display_name' => 'required|string',
            'description' => 'required|string',
        ]);

        // Update the permission
        $permission->update([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);

        // Return an inertia view with the permission
        return Inertia::render('Permissions/Show', [
            'permission' => $permission,
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
    public function delete(Permission $permission){

        // Check if the user has the permission to delete a permission if not abort the request
        $this->validateWebPermission(['permissions-delete']);

        // Delete the permission in the database
        $permission->delete();

        // Return an inertia view with the permission
        return Inertia::render('Permissions/Show', [
            'permission' => $permission,
        ]);
    }
}