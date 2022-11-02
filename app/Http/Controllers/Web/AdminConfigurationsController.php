<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Configuration;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminConfigurationsController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request)
       {

            // get configuration belonging to the user
            $configuration =  Configuration::first();
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
        // Validate the request
        $request->validate([
            'mile' => 'required',
            'minute' => 'required',
        ]);

        $configuration = Configuration::first();

        $configuration->update(["mile" => $request->mile,
        "minute" => $request->minute]);



        // Redirect back to the index page with a success message
        return redirect()->route('admin-configurations.edit')->with('success', 'Configuration updated successfully');
    }

}