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
    /**
     * Get all group deals
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $group_deals = GroupDeal::all();

        // loop through group deals
        foreach ($group_deals as $group_deal) {
          $group_deal->load('groupDealItems.groupDealSingleItems.menuItem.extras', 'groupDealItems.groupDealSingleItems.menuItem.sizes');
        }

        return response()->json($group_deals, Response::HTTP_OK);
    }

    /**
     * Get a single group deal
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $group_deal = GroupDeal::where('id', $id)->first();
        $group_deal->load('groupDealItems.groupDealSingleItems.menuItem.extras', 'groupDealItems.groupDealSingleItems.menuItem.sizes');

        return response()->json($group_deal, Response::HTTP_OK);
    }

    /**
     * Create a new group deal
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
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
            'group_deal_items' => 'required|array',
            'menu_items' => 'required|array',
        ]);

        // store the group deal
        $group_deal = GroupDeal::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->hasFile('image') ? ImagePackage::save($request->file('image'), 'group_deals') : null,
            'group_deal_price' => $request->group_deal_price,
            'restaurant_id' => $user->restaurant_id,
        ]);

        foreach (json_decode($request->group_deal_items[0]) as $key => $group_deal_item) {
            $group_deal_item = $group_deal->groupDealItems()->create([
                "title" => $group_deal_item->title,
            ]);

            foreach (json_decode($request->menu_items[0])[$key] as $item) {
                $group_deal_single_item = $group_deal_item->groupDealSingleItems()->create([
                    "menu_item_id" => $item->id,
                    "group_deal_id" => $group_deal->id,
                ]);
            }

        }

        // return the response
        return response()->json([
            'message' => 'Group deal created successfully',
            'group_deal' => $group_deal->load('groupDealItems.groupDealSingleItems.menuItem.extras', 'groupDealItems.groupDealSingleItems.menuItem.sizes'),
        ], Response::HTTP_CREATED);
    }

    /**
     * Update a group deal
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Delete a group deal
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $group_deal)
    {
        // get the group deal
        $group_deal = GroupDeal::where('id', $group_deal)->first();

        // delete the group deal
        $group_deal->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

}
