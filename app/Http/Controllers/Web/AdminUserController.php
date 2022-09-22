<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class AdminUserController extends Controller
{
     /**
     * Handle the incoming request to get all the users.
     * The method will return all the users in the database.
     * The method will return an inertia view with the users.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {

        // Get all users, paginate through them using the "perPage" parameter. Search through the users, if the "search" parameter is present.
        $search = $request->search ?? null;

        if($search !== null){

            $users = User::whereRoleIs('admin')->where(function ($q) use ($search) {
               $q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $users = User::paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the users
        return Inertia::render('MainAdmin/AdminUsers/Index', [
            'users' => $users,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

      /**
     * Handle the incoming request to create a user.
     * The method will check if the user has the permission to create a permission.
     * The method will return an inertia view with the permission.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return Inertia::render('MainAdmin/AdminUsers/Create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate the request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "email_password_to_user" => "required|boolean"
        ]);
        // Get the role based on the name
        $role = Role::where('name', $request->role)->first();
        // Create User
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "role_id" => $role->id
        ]);

        // Assign user to a role using the laratrust package
        $user->attachRole($role);

        // Redirect back to the index page with a success message
        return redirect()->route('admin-user.index')->with('success', 'Admin User created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models$User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models$User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('MainAdmin/AdminUsers/Edit', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'address' => $user->address,
                'city' => $user->city,
                'state' => $user->state,
                'country' => $user->country,
                'zip_code' => $user->zip_code,
                'role' => $user->role,
                'permissions' => $user->permissions,
            ]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models$User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        // Validate the request
        //data = Request::validate([
                //'title' => ['required', 'max:90'],
                //'description' => ['required'],
            //]);
        $user->update(data);


        return Redirect::route('MainAdmin/AdminUsers/Index')->with;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models$User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::route('MainAdmin/AdminUsers/Index');
    }
}