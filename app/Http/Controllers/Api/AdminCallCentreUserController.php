<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\OpeningHour;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminCallCentreUserController extends Controller
{


    public function index(Request $request)
    {
         $users = User::where('role_id', 3)->get();
         return response()->json($users);
    }


    public function store(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|string|min:6|confirmed',
            "email_password_to_user" => "required|boolean"
        ]);

          // Get the role based on the name
          $role = Role::where('id', 3)->first();

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "role_id" => $role->id
        ]);

        $user->attachRole('call_centre_admin');

        return response()->json(
            [
                "message" => "User created successfully",
                "user" => $user
            ]
        );
    }


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
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            "role" => "required|exists:roles,name",
            "email_password_to_user" => "required|boolean"
        ]);

        // Update the user
        $user->update($data);

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
