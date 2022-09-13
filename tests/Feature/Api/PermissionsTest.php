<?php

class ExampleTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function PermissionIndexTest()
    {
        $this->get('/api/permissions')
             ->seeJson([
                'name' => 'read-permissions',
                 'created_at' => '2018-01-01 00:00:00',
             ]);
    }
}