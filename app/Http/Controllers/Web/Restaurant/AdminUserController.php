<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Models\Configuration;
use App\Http\Controllers\Controller;
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

    public function index(Request $request, $id)
    {
        // Get all users, paginate through them using the "perPage" parameter. Search through the users, if the "search" parameter is present.
        $search = $request->search ?? null;

        if($search !== null){

            $users = User::where('role_id', 2)->where('restaurant_id', $id)->where(function ($q) use ($search) {
               $q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $users = User::where('role_id', 2)->where('restaurant_id', $id)->paginate($request->perPage ?? 10);
        }



        // Return an inertia view with the users
        return Inertia::render('RestaurantAdmin/AdminUsers/Index', [
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
    public function create($id){
        return Inertia::render('RestaurantAdmin/AdminUsers/Create', [
            'restaurant' => Restaurant::find($id)
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {

        // get the restaurant
        $restaurant = Restaurant::find($id);
        // validate the request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "restaurant_id" => "required|integer",
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
            "role_id" => $role->id,
            "restaurant_id" => $request->restaurant_id
        ]);

        // Assign user to a role using the laratrust package
        $user->attachRole($role);
        if($user->role_id == 2){
            $configuration = Configuration::create([
                "user_id" => $user->id,
            ]);
        }

        // Redirect back to the index page with a success message
        return redirect()->route('restaurant.users.index', ['id' => $request->restaurant_id])->with('success', 'Admin User created successfully');
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
        return Inertia::render('RestaurantAdmin/AdminUsers/Edit', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
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
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "email_password_to_user" => "required|boolean"
        ]);

        $user->update($data);


        return redirect()->route('restaurant.users.index', ['id' => $user->restaurant_id])->with('success', 'Admin user updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models$User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $restaurant = Restaurant::where('id', $user->restaurant_id)->first();
        $user->delete();

        return redirect()->route('restaurant.users.index', ['id' => $restaurant->id])->with('success', 'Admin user deleted successfully');
    }
}