<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    /**
     * Create a method to check if the user has a permissions in an array. 
     * The method will use laratrust to check if the user has the permission.
     * The method will return true if the user has any permission in the array.
     * The method will return false if the user does't have any permission.
     * @param array $permissions
     * @return boolean
     */
    public function hasAnyPermission(array $permissions){

        // Check if the user has any permission in the array. Itearte through the array and check if the user has the permission.
        foreach($permissions as $permission){

            // Get the current user
            $user = User::find(auth()->user()->id);

            // Check if the user has the permission
            if($user->isAbleTo($permission)){
                // Return true if the user has the permission
                return true;
            }
        }

        // Return false if the user does't have any permission
        return false;
    }
}
