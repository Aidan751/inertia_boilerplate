<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Models\Order;
use App\Models\UserDriver;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AdminDriverController extends Controller
{
      /**
        * Display a listing of the resource.
        *
        * @return \Illuminate\Http\Response
        */
        public function index(Request $request)
        {

                // Get all restaurants, paginate through them using the "perPage" parameter. Search through the restaurants, if the "search" parameter is present.
        $search = $request->search ?? null;

        if($search !== null){
            $drivers = User::where('role_id', 4)
                 ->where(function ($q) use ($search) {
                     $q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
                 })
                 ->latest()
                 ->paginate(10);
        }
        else {

            $drivers = User::where('role_id', 4)->paginate($request->perPage ?? 10);
        }




            return Inertia::render('MainAdmin/Drivers/Index', [
                'drivers' => $drivers,
                'search' => $search,
                'perPage' => $request->perPage ?? 10
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
         // Validate the data
         $request->validate([
             'first_name' => ['required', 'string', 'max:191'],
             'last_name' => ['required', 'string', 'max:191'],
             'email' => ['required', 'email', 'max:191', 'unique:users,email,'],
             'password' => ['required', 'confirmed', 'min:6'],
             'iCabbi' => ['required', 'string', 'max:191'],
         ]);

           // Create a model for this User
           $user = new User;

           // Update the parameters
           $user->role_id = 4;
           $user->first_name = $request->first_name;
           $user->last_name = $request->last_name;
           $user->email = $request->email;
           $user->password = bcrypt($request->password);

           // Save to the database
           $user->save();

           //If the notify checkbox was selected, send the new user an email
           if ($request->get('notify')) {
               $subject = 'Account Details';
               Mail::send('email.driverwelcome', array(
                 'name' => $request->first_name,
                 'password' => $request->password,
                 'email' => $request->email,
                 'subject' => $subject,
               ), function ($message) use ($request, $subject) {
                   $message->to($request->email);
                   $message->subject($subject);
               });
           }

         $driver = new UserDriver;
         $driver->user_id = $user->id;
         $driver->iCabbi = $request->iCabbi;

         // Save to the database
         $driver->save();


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


         // Redirect and inform the restaurant
         return redirect()->route('admin-driver.index')->with('success', 'The driver has been created.');
     }




        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create(Request $request)
        {
            $driver = new UserDriver;
            return Inertia::render('MainAdmin/Drivers/Create', [
                'driver' => $driver,
            ]);
        }


        /**
         * Display the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function show($id)
        {
            return redirect()->route('admin-driver.edit', $id);
        }

        /**
         * Show the form for editing the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function edit($id)
        {

             // Attempt to find the driver
             $driver = UserDriver::with('user')
             ->where('user_id', $id)
             ->first();


            // Load the view
            return Inertia::render('MainAdmin/Drivers/Edit', [
                'driver' => $driver,
            ]);
        }

        /**
         * Update the specified resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, UserDriver $driver)
        {

            // Validate the data
            $request->validate([
                'iCabbi' => ['nullable', 'string', 'max:191'],
                'first_name' => ['required', 'string', 'max:191'],
                'last_name' => ['required', 'string', 'max:191'],
            ]);

            // Update the parameters
            $driver->iCabbi = $request->iCabbi;
            $user = User::where('id', $driver->user_id)->first();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;

            $user->save();
            $driver->save();

            // Redirect and inform the user
            return redirect()->route('admin-driver.index')->with('success', 'Driver updated.');
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            // Find the model for this ID
            $user = User::find($id);

            // Delete the user
            $user->delete();

            return redirect()->route('admin-driver.index')->with('success', 'Driver deleted.');
        }
}