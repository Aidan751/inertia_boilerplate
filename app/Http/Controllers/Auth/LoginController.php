<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    // create login form
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    // login user
    public function store(Request $request)
    {
        // validate form
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // attempt to log the user in
        if (!Auth::attempt($request->only('email', 'password'), $request->remember)) {
            return back()->with('status', 'Invalid login details');
        }

        // redirect
        return redirect()->route('dashboard');
    }
}