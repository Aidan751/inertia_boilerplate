<?php

namespace App\Http\Controllers\Web\Restaurant;

use Stripe\Product;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Extra;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Models\GroupDealItem;
use App\Packages\ImagePackage;
use App\Models\GroupDealSingleItem;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class GroupDealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get a list of Group Deals
        $group_deals = GroupDeal::where('restaurant_id', Auth::user()->restaurant_id)->get();

        // Apply a search to the model
        $search = $request->get('search', '');
        $perPage = $request->get('perPage', '');
        $groupDeals = GroupDeal::where('restaurant_id', Auth::user()->restaurant_id)
        ->where(function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        })->latest()->paginate($perPage ?? 10);

        return Inertia::render('RestaurantAdmin/GroupDeals/Index', [
            'groupDeals' => $groupDeals,
            'search' => $search ?? '',
            'perPage' => $perPage ?? 10,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // create a new Group Deal
        $groupDeal = new GroupDeal;
        $existingMenuItems = MenuItem::where('restaurant_id', Auth::user()->restaurant_id)->get();

        // return the view
        return Inertia::render('RestaurantAdmin/GroupDeals/Create', [
            'groupDeal' => $groupDeal,
            'existingMenuItems' => $existingMenuItems,
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
        // validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'group_deal_price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // create a new Group Deal
        $groupDeal = GroupDeal::create([
            'title' => $request->title,
            'description' => $request->description,
            'group_deal_price' => $request->group_deal_price,
            'image' => ImagePackage::save($request->image, 'group_deals'),
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);

        foreach ($request->groupDealItems as $key => $groupDealItem) {

            $groupDealItem = $groupDeal->groupDealItems()->create([
                "title" => $groupDealItem['title'],
            ]);

            foreach ($request->menuItems[$key] as $item) {
                $groupDealSingleItem = $groupDealItem->groupDealSingleItems()->create([
                    "menu_item_id" => $item['id'],
                    "group_deal_id" => $groupDeal->id,
                ]);
            }

        }

        // redirect to the Group Deal page
        return redirect()->route('restaurant.group-deals.index')->with('success', 'Group Deal created successfully');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GroupDeal  $groupDeal
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, GroupDeal $groupDeal)
    {
        // Load the Group Deal and its related items
        $groupDeal->load('groupDealItems.groupDealSingleItems.menuItem');

        // get a list of Menu Items
        $existingMenuItems = MenuItem::where('restaurant_id', Auth::user()->restaurant_id)->get();

        return Inertia::render('RestaurantAdmin/GroupDeals/Edit', [
            'groupDeal' => $groupDeal,
            'existingMenuItems' => $existingMenuItems,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GroupDeal  $groupDeal
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, GroupDeal $groupDeal)
    {
        // validate the request
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'group_deal_price' => 'required|numeric',
            "group_deal_items" => "required|array",
            "group_deal_single_items" => "required|array",
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // update the Group Deal
        $groupDeal->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => ImagePackage::save($request->image, 'group_deals'),
            'group_deal_price' => $request->group_deal_price,
        ]);

        foreach($groupDeal->groupDealItems as $groupDealItem) {

            $groupDealItem->deleteGroupDealSingleItems();

            $groupDealItem->delete();
        }

        foreach ($request->group_deal_items as $key => $groupDealItem) {

            $groupDealItem = $groupDeal->groupDealItems()->create([
                "title" => $groupDealItem['title'],
            ]);

            foreach ($request->group_deal_single_items[$key] as $item) {
                $groupDealSingleItem = $groupDealItem->groupDealSingleItems()->create([
                    "menu_item_id" => $item['id'],
                    "group_deal_id" => $groupDeal->id,
                ]);
            }

        }

        // redirect to the Group Deal page
        return redirect()->route('restaurant.group-deals.index')->with('success', 'Group Deal updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(GroupDeal $groupDeal)
    {
        // delete the Group Deal
        $groupDeal->delete();

        // redirect to the Group Deal page
        return redirect()->route('restaurant.group-deals.index')->with('success', 'Group Deal deleted successfully');
    }

}