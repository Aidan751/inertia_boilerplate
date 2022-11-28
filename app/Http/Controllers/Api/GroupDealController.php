<?php

namespace App\Http\Controllers\Api;


use App\Models\GroupDeal;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Packages\ImagePackage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GroupDealController extends Controller
{
    public function index(Request $request)
    {

        $group_deals = DB::table('group_deals')->get();

        return response()->json($group_deals, Response::HTTP_OK);
    }

    public function show(Request $request, $id)
    {
        $group_deal = DB::table('group_deals')->where('id', $id)->first();

        return response()->json($group_deal, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        // get the user
        $user = Auth::user();

        // validate the request
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'image' => 'nullable',
            'group_deal_price' => 'string|required',
        ]);

        // store the group deal
        $group_deal = GroupDeal::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->hasFile('image') ? ImagePackage::save($request->file('image'), 'group_deals') : null,
            'group_deal_price' => $request->group_deal_price,
            'restaurant_id' => $user->restaurant_id,
        ]);

        // return the response
        return response()->json($group_deal, Response::HTTP_CREATED);
    }

    public function update(Request $request)
    {

        // get the user
        $user = Auth::user();

        // validate the request
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'image' => 'nullable',
            'group_deal_price' => 'required',
        ]);

        // get the group deal
        $group_deal = GroupDeal::where('id', $request->id)->first();

        // update the group deal
        $group_deal->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->hasFile('image') ? ImagePackage::save($request->file('image'), 'group_deals') : null,
            'group_deal_price' => $request->group_deal_price,
            'restaurant_id' => $user->restaurant_id,
        ]);

        return response()->json($group_deal, Response::HTTP_OK);
    }

    public function destroy(Request $request, $group_deal)
    {
        // get the group deal
        $group_deal = GroupDeal::where('id', $group_deal)->first();

        // delete the group deal
        $group_deal->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

}