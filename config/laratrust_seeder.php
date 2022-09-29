<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => true,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'admin' => [
            "roles" => "c,r,u,d,e",
            "permissions" => "c,r,u,d,e",
            'admin_users' => 'c,r,u,d,e',
            'call_center' => 'c,r,u,d,e',
            'categories' => 'r,u,e',
            'business_manager' => 'c,r,u,d,e',
            'driver_manager' => 'c,r,u,d,e',
            'driver_cost' => 'c,r,u,d,e',
            'orders' => 'c,r,u,d,e',
            ""
        ],

        'restaurant_admin' => [
            'orders' => 'c,r,u,d,e',
            'restaurant_admin_users' => 'c,r,u,d,e',
            'stripe' => 'r,u,e',
            'products' => 'c,r,u,d,e',
            'categories' => 'c,r,u,d,e',
            'products' => 'c,r,u,d,e',
            'group_deals' => 'c,r,u,d,e',
            'extras' => 'c,r,u,d,e',
            'opening_times' => 'c,r,u,d,e',
            'table_service' => 'c,r,u,d,e',
            'offers_and_news' => 'c,r,u,d,e',
            'company_profile' => 'c,r,u,d,e',
        ],

        'call_centre_admin' => [
            'make_order' => 'c,r,u,d,e',
            'orders_history' => 'c,r,u,d,e',
        ],
        "driver" => [
            "driver" => "c,r,u,d,e",
        ],
        "customer" => [
            "customer" => "c,r,u,d,e",
        ],

    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        'e' => 'export'
    ]
];
