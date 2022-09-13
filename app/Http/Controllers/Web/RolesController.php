<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolesController extends Controller
{
    /**
     * Handle the incoming request to get all the roles.
     * The method will return all the roles in the database.
     * The method will check if the user has the permission to get all the roles.
     * The method will return an inertia view with the roles.
     * @return \Inertia\Response
     */

    public function index()
    {
        // Check if the user has the permission to get all the roles if not abort the request
        $this->validateWebPermission(['roles-read']);

        // Get all the roles
        $roles = Role::all();

        // Return an inertia view with the roles
        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Handle the incoming request to get a role.
     * The method will check if the user has the permission to get a role.
     * The method will return an inertia view with the role.
     * @param \App\Models\Role  $role
     * @return \Inertia\Response
     */
    public function show(Role $role){

        // Check if the user has the permission to get a role if not abort the request
        $this->validateWebPermission(['roles-read']);

        // Return an inertia view with the role
        return Inertia::render('Roles/Show', [
            'role' => $role,
        ]);
    }


    /**
     * Handle the incoming request to create a role.
     * The method will check if the user has the permission to create a role.
     * The method will return an inertia view with the permissions.
     * @return \Inertia\Response
     */
    public function create(){
        
        // Check if the user has the permission to create a role if not abort the request
        $this->validateWebPermission(['roles-create']);

        // Get all the permissions
        $permissions = Permission::all();

        // Return an inertia view with the permissions
        return Inertia::render('Roles/Create', [
            'permissions' => $permissions,
        ]);
    }
    /**
     * Handle the incoming request to save a role to the database.
     * The method will return an inertia view with the permissions.
     * The method will check if the user has the permission to create a role.
     * The method will return an inertia view with the permissions.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function store(Request $request)
    {   

        // Check if the user has the permission to create a role if not abort the request
        $this->validateWebPermission(['roles-create']);

        // Validate the request to see if the name is passed and if it is a string
        $request->validate([
            'name' => 'required|string',
            'display_name' => 'required|string',
            'description' => 'required|string',
            'permissions' => 'required|array',
        ]);

        // Create the role
        $role = Role::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);

        // Attach the permissions to the role
        $role->attachPermissions($request->permissions);

        // Redirect back to the index page with a success message 
        return redirect()->route('roles.index')->with('success', 'Role created successfully');
    }

    /**
     * Handle the incoming request to update a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to update a role.
     * The method will return an inertia view with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function update(Request $request, Role $role)
    {

        // Check if the user has the permission to update a role if not abort the request
        $this->validateWebPermission(['roles-update']);

        // Validate the request...
        $request->validate([
            "name" => "required|string|unique:roles,name,".$role->id,
            'display_name' => 'required|string',
            'description' => 'required|string',
        ]);


        // Update the role
        $role->update([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);
        
        // Redirect back to the index page with a success message 
        return redirect()->route('roles.index')->with('success', 'Role updated successfully');
    }

    /**
     * Handle the incoming request to delete a role.
     * The method will return a role with the id passed in the request.
     * The method will check if the user has the permission to delete a role.
     * The method will return an inertia view with the role.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function destroy(Role $role)
    {
        // Check if the user has the permission to delete a role if not abort the request
        $this->validateWebPermission(['roles-delete']);

        // Delete the role
        $role->delete();

        // Redirect back to the index page with a success message
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully');
    }
}