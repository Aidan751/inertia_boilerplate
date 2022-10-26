<?php

namespace App\Http\Controllers\Web;

use Illuminate\Support\Facades\Mail;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\OpeningHour;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminCallCentreUserController extends Controller
{
     /**
     * Handle the incoming request to get all the users.
     * The method will return all the tables in the database.
     * The method will return an inertia view with the users.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {
         $user = User::whereRoleIs('call_centre_admin')->first();
         $search = $request->search ?? null;

         // Get all users, paginate through them using the "perPage" parameter. Search through the users, if the "search" parameter is present.
        if($search !== null){

            $users = User::where('role_id', 3)->where(function ($q) use ($search) {
               $q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $users = User::where('role_id', 3)->paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the users
        return Inertia::render('MainAdmin/CallCentreUsers/Index', [
            'users' => $users,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

       /**
     * Handle the incoming request to create a user.
     * The method will return an inertia view with the user.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return Inertia::render('MainAdmin/CallCentreUsers/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "email_password_to_user" => "required|boolean"
        ]);

          // Get the role based on the name
          $role = Role::where('name', $request->role)->first();

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            "role_id" => $role->id
        ]);

        $user->attachRole('call_centre_admin');


        //If the notify checkbox was selected, send the new user an email
        if ($request->get('email_password_to_user')) {

            $subject = "Welcome to Order It " . $user->first_name . " " . $user->last_name;
            Mail::send('emails.restaurant-user-mail', array(
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'password' => $request->password,
            ), function ($message) use ($user, $subject) {
                $message->to($user->email);
                $message->subject($subject);
            });

        }

        return redirect()->route('admin-callcentreuser.index')->with('success', 'User created successfully');
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
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('MainAdmin/CallCentreUsers/Edit', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
        ]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "email_password_to_user" => "required|boolean"
        ]);

        // Update the user
        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);


        //If the notify checkbox was selected, send the new user an email
        if ($request->get('email_password_to_user')) {

            $subject = "Welcome to Order It " . $user->first_name . " " . $user->last_name;
            Mail::send('emails.restaurant-user-mail', array(
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'password' => $request->password,
            ), function ($message) use ($user, $subject) {
                $message->to($user->email);
                $message->subject($subject);
            });

        }

        // Redirect the user to the users index page with a success message
        return redirect()->route('admin-callcentreuser.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin-callcentreuser.index')->with('success', 'User deleted successfully');
    }
}