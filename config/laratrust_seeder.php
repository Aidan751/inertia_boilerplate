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
        'superadministrator' => [
            'users' => 'c,r,u,d,e',
            'payments' => 'c,r,u,d,e',
            'profile' => 'r,u,e',
            'roles' => 'c,r,u,d,e',
            'permissions' => 'c,r,u,d,e',
            'settings' => 'c,r,u,d,e',
            'home' => 'r,e',
        ],
        // 'role_name' => [
        //     'module_1_name' => 'c,r,u,d',
        // ]
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        'e' => 'export'
    ]
];
