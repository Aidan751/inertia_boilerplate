<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LegalDocument;

class LegalDocumentController extends Controller
{
    public function get($document)
    {
        // Attempt to find the document
        $document = LegalDocument::where('title', '=', $document)->firstOrFail();

        if ($document === null) {
            return response()->json([
                "message" => "Document does not exist"
            ], 401);
        } else {
            return response($document, 200);
        }
    }
}
