<?php

namespace App\Http\Controllers\Web;

use Stripe\Product;
use App\Models\User;
use App\Models\Extra;
use App\Models\MenuItem;
use App\Models\GroupDeal;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
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
        $group_deals = GroupDeal::where('restaurant_id', Auth::user()->restaurant_id)
        ->where(function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        })->latest()->paginate(10);

        return view('restaurant.groupdeals.index', compact('group_deals', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $group_deal = new GroupDeal;
        $products = MenuItem::where('restaurant_id', Auth::user()->restaurant_id)->get();

        $group_deal_items = $group_deal->groupDealItems()->get();

        $list = range(1, count($group_deal_items) + 2);


        return view('restaurant.groupdeals.create', compact('group_deal', 'list', 'products'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // dd($request->all());
        // validate the request
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'group_deal_price' => 'required|numeric',
            'groupItemList' => 'required|array',
            'groupItemKey' => 'required|array',
            'name' => 'required|array',

        ]);

        // create a new Group Deal
        $group_deal = GroupDeal::create([
            'title' => $request->title,
            'description' => $request->description,
            'group_deal_price' => $request->group_deal_price,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);

        // create a new Group Deal Item
        foreach ($request->name as $key => $value) {

            $group_deal->groupDealItems()->create([
                'title' => $request->name[$key],
                'group_deal_id' => $group_deal->id,
            ]);
        }

        // create single group deal items
        foreach ($request->groupItemList as $key => $value) {
            $menu_item = MenuItem::where('id', $request->groupItemList[$key])->first();
            $single_item = GroupDealSingleItem::create([
                'name' => $menu_item->title,
                'group_deal_item_id' => $request->groupItemKey[$key],
            ]);
        }






        // redirect to the Group Deal page
        return redirect()->route('groupdeals.index')->with('success', 'Group Deal created successfully');

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, $id)
    {
        $group_deal = GroupDeal::where('id', $id)->first();
        $group_deal_items = $group_deal->groupDealItems;

        $group_deal_single_items = [];
        foreach ($group_deal_items as $item) {
            $group_deal_single_item = GroupDealSingleItem::where('group_deal_item_id', $item->id)->get();
            array_push($group_deal_single_items, $group_deal_single_item);
        }

        $list = range(1, count($group_deal_items) + 2);



        $products = MenuItem::where('restaurant_id', Auth::user()->restaurant_id)->get();
        return view('restaurant.groupdeals.edit', compact('group_deal', 'group_deal_items', 'group_deal_single_items', 'list', 'products'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    // public function update(Request $request, $id)
    // {
    //     // validate the request
    //     $this->validate($request, [
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string|max:255',
    //         'group_deal_price' => 'required|integer',
    //     ]);

    //     // find the Group Deal
    //     $group_deal = GroupDeal::find($id);
    //     $group_deal->title = $request->title;
    //     $group_deal->description = $request->description;
    //     $group_deal->group_deal_price = $request->group_deal_price;
    //     $group_deal->group_deal_items = $request->group_deal_items;
    //     $group_deal->save();
    //     return redirect()->route('groupdeals.index')->with('success', 'Group Deal updated successfully');
    // }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $group_deal = GroupDeal::find($id);
        $group_deal->delete();
        return redirect()->route('groupdeals.index')->with('success', 'Group Deal deleted successfully');
    }

}