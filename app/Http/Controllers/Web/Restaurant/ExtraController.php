<?php



namespace App\Http\Controllers\Web\Restaurant;


use App\Models\User;
use Inertia\Inertia;
use App\Models\Extra;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;




class ExtraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
            // Apply a search to the model
            $search = $request->get('search', '');
            $perPage = $request->get('perPage', 10);
            $from = $request->get('from', '');
            $to = $request->get('to', '');


            // get the Extras
            $extras = Extra::where('restaurant_id', Auth::user()->restaurant_id)
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })->latest()->paginate($perPage ?? 10);

        // return the view with the list of Extras
        return Inertia::render('RestaurantAdmin/Extras/Index', [
            'extras' => $extras,
            'search' => $search,
            'perPage' => $perPage,
            'from' => $from,
            'to' => $to,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {
        // initialize the Extra
        $extra = new Extra;

        // return the view with the Extra
        return Inertia::render('RestaurantAdmin/Extras/Create', [
            'extra' => $extra,
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
            'name' => ['required', 'string', 'max:191'],
            'description' => ['nullable', 'string', 'max:191'],
            'additional_charge' => ['nullable', 'numeric'],
        ]);

        // Create a new extra
        $extra = Extra::create([
            'name' => $request->name,
            'description' => $request->description,
            'additional_charge' => $request->additional_charge ?? 0,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);

        // Redirect to the extra page
        return redirect()->route('restaurant.extras.index')->with('success', 'Extra created successfully.');



    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        // Get the extra
        $extra = Extra::findOrFail($id);
        return Inertia::render('RestaurantAdmin/Extras/Show', [
            'extra' => $extra,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, Extra $extra)
    {
        return Inertia::render('RestaurantAdmin/Extras/Edit', [
            'extra' => $extra,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, Extra $extra)
    {
        // Validate the data
        $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'description' => ['required', 'string', 'max:191'],
            'additional_charge' => ['nullable', 'numeric'],
        ]);

        // Update the extra
        $extra->update([
            'name' => $request->name,
            'description' => $request->description,
            'additional_charge' => $request->additional_charge,
        ]);

        return redirect()->route('restaurant.extras.index')->with('success', 'Extra updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(Extra $extra)
    {
        // delete the extra with the specified id from the menu item that has it
        $menu_items = MenuItem::where('restaurant_id', Auth::user()->restaurant_id)->get();
        foreach ($menu_items as $menu_item) {
            foreach ($menu_item->extras as $key => $menu_item_extra) {
                if ($menu_item_extra['id'] == $extra->id) {
// todo: try and get extras to delete from menu item extras as well as from admin panel
                    array_splice($menu_item->extras,$menu_item->extras[$key], 1);
                }
            }
        }


        $extra->delete();

        dd($menu_items);

        return redirect()->route('restaurant.extras.index')->with('success', 'Extra deleted successfully');
    }

}
