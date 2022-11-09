<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AddItemToTableController extends Controller
{
    public function getInfo($id)
    {
      $fill = DB::table('menu_items')->where('id', $id)->get();


      return response()->json([
        'message' => 'Success',
        'data' => $fill
      ], 200);
    
    }
}