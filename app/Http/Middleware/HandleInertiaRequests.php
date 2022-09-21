<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                "roles" => $request->user() ? $request->user()->roles()->pluck('name')->toArray() : [],
                "permissions" => $request->user() ? $request->user()->permissions()->pluck('name')->toArray() : [],
                "roles_object" => $request->user() ? $request->user()->roles()->pluck("display_name")->toArray() : [],

            ],
            'ziggy' => function () {
                return (new Ziggy)->toArray();
            },
            "success" => session("success"),
        ]);
    }
}