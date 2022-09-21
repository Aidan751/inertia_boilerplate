<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        if($request->search !== null){

            $users = User::where(function ($q) use ($search) {
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
            'users' => users,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create(
            Request::validate([
                'title' => ['required', 'max:90'],
                'description' => ['required'],
            ])
        );

        return Redirect::route('MainAdmin/AdminUsers/Index');
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

            ]
        ]);
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


        return Redirect::route('MainAdmin/AdminUsers/Index');
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
