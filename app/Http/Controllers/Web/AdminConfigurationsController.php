<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Configuration;
use App\Http\Controllers\Controller;

class AdminConfigurationsController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, User $user)
       {

            // get configuration belonging to the user
            $configuration = Configuration::where('user_id', $user->id)->first();
           // Load the view
           return Inertia::render('MainAdmin/Configurations/Edit', [
               'configuration' => $configuration,
           ]);
       }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $configuration = Configuration::where('user_id', Auth::user()->id)->first();
        // Validate the request
        $request->validate([
            'mile' => 'required',
            'minute' => 'required',
        ]);

        // Update the configuration
        $configuration->update([
            'mile' => $request->mile,
            'minute' => $request->minute,
        ]);


        // Redirect back to the index page with a success message
        return redirect()->route('admin-configurations.edit', ['user' => Auth::user()->id])->with('success', 'Configuration updated successfully');
    }

}