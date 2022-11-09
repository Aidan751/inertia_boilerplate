<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

use App\Models\Report;


class ReportController extends Controller
{
    public function add($id, Request $request)
    {

        $pastReports = Report::
        where('reported_by', auth('api')->user()->id)
        ->where('order_id', '=', $id)
        ->first();

        if ($pastReports === null) {
            $report = new Report;
            $report->reported_by = auth('api')->user()->id;
            $report->order_id = $id;
          
            try {
                $report->save();
            } catch (QueryException $ex) {
                $errorCode = $ex->errorInfo[1];
                if ($errorCode == 1062) {
                    return response()->json([
                        'message' => $ex->errorInfo[2],
                    ], 400);
                } else {
                    return response()->json([
                        'message' => $ex,
                    ], 422);
                }
            }
            return response()->json([
                "message" => "Report successfully sent!"
            ], 200);
        } else {
            return response()->json([
                "message" => "Duplicate report"
            ], 409);
        }
    }
}
