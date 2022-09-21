<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
     /**
     * Handle the incoming request to get all the roles.
     * The method will return all the roles in the database.
     * The method will check if the user has the permission to get all the roles.
     * The method will return an inertia view with the roles.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {

        // Get all users, paginate through them using the "perPage" parameter. Search through the users using the first_name, last_name or email if the "search" parameter is present.
        if($request->search !== null){

            $users = User::where(function ($q) use ($search) {
                $q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else{
            $users = User::paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the users
        return Inertia::render('MainAdmin/AdminUsers/Index', [
            'users' => $users,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

}