<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function list(Request $request) {

        $filter = $request->category;
        $limit = intval($request->limit);
        $url =  '';//config('app.url');

        $query = MenuItem::with('media')->orderBy('title')
            ->when($filter != null && $filter != 0, function($query) use ($filter) {
                return $query->where('menu_category_id', '=', $filter);
              })
            ->paginate($limit);

            foreach ($query as $item) {
                $image = $item->getMedia('items');
            
                if (!$image->isEmpty()) {
                    $item->setAttribute('image', $url . $image[0]->getFullUrl());
                } else {
                    $item->setAttribute('image', null);
                }
            }
            
        return response($query, 200);
    }
}
