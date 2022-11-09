<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class GroupDealController extends Controller
{

// add group deal items
public function addGroupDealItems(Request $request)
{

    $list = range(1, 2);

 
    return response()->json([
        'message' => 'Success',
        'data' => 'hey',
    ], 200);
}

}