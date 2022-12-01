<?php

namespace App\Http\Controllers\Api;

use App\Models\Extra;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ExtraController extends Controller
{


    /**
     * Get all extras
     * @param Request $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $extras = Extra::all();

        return response()->json($extras, Response::HTTP_OK);
    }

    /**
     * Get a single extra
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Extra $extra)
    {
        // return the response
        return response()->json($extra, Response::HTTP_OK);
    }

    /**
     * Create a new extra
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // get the user
        $user = Auth::user();

        // validate the request
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'additional_charge' => 'nullable',
        ]);

        // store the extra
        $extra = Extra::create([
            'name' => $request->name,
            'description' => $request->description,
            'additional_charge' => $request->additional_charge,
            'restaurant_id' => $user->restaurant_id,
        ]);

        // return the response
        return response()->json($extra, Response::HTTP_CREATED);
    }

    /**
     * Update an extra
     * @param Request $request
     * @param $extra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Extra $extra)
    {
        // get the user
        $user = Auth::user();

        // validate the request
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'additional_charge' => 'nullable',
        ]);

        // update the extra
        $extra->update([
            'name' => $request->name,
            'description' => $request->description,
            'additional_charge' => $request->additional_charge,
        ]);

        // return the response
        return response()->json($extra, Response::HTTP_OK);
    }

    /**
     * Delete an extra
     * @param Request $request
     * @param $extra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Extra $extra)
    {
        // delete the extra
        $extra->delete();

        // return the response
        return response()->json(null, Response::HTTP_OK);
    }
}