<?php



namespace App\Http\Controllers\Admin\Restaurant;


use App\Models\User;
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
        // get a list of Extras
            // Apply a search to the model
            $search = $request->get('search', '');

            $extras = Extra::where('restaurant_id', Auth::user()->restaurant_id)
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })->latest()->paginate(10);
        return Inertia::render('RestaurantAdmin/Extras/Index', [
            'extras' => $extras,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {
        $extra = new Extra;
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
            'additional_charge' => $request->additional_charge,
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
        $extra->delete();
        return redirect()->route('restaurant.extras.index')->with('success', 'Extra deleted successfully');
    }

}