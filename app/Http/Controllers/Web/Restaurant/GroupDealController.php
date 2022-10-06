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
        })->latest()->paginate(10 ?? $perPage);

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
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'group_deal_price' => 'required|numeric',
            'groupItemList' => 'required|array',
            'groupItemKey' => 'required|array',
            'name' => 'required|array',

        ]);

    //   todo: I need to figure out how I am going to do this






        // redirect to the Group Deal page
        return redirect()->route('restaurant.group-deals.index')->with('success', 'Group Deal created successfully');

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, GroupDeal $groupDeal)
    {
        $groupDealItems = $groupDeal->groupDealItems;

        // todo: this needs to be planned properly then built



        return Inertia::render('RestaurantAdmin/GroupDeals/Edit', [
            'groupDeal' => $groupDeal,
            'groupDealItems' => $groupDealItems,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, GroupDeal $groupDeal)
    {
        // todo: this needs to be planned properly then built
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
        $group_deal->delete();

        // redirect to the Group Deal page
        return redirect()->route('restaurant.group-deals.index')->with('success', 'Group Deal deleted successfully');
    }

}