import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'


export default function AdminSideBar(props) {
    return (
        <ul class="list-unstyled sidebar-nav  sidebar-offcanvas">
            <div style="background: #D4D4D4">
                <li style="padding: 20px; font-weight: bold;">Admin Users</li>
            </div>

            <li>
                <a href={ route('admin-user.create') } class="text-dark">Add User</a>
            </li>
            <li>
                <a href={ route('admin-user.index') } class="text-dark">List Users</a>
            </li>
            <div style="background: #D4D4D4"><li style="padding: 20px; font-weight: bold;">Call Centre</li></div>
            <li>
                <a href={ route('admin-callcentreuser.create') } class="text-dark">Add User</a>
            </li>
            <li>
                <a href={ route('admin-callcentreuser.index') } class="text-dark">List Users</a>
            </li>
            <div style="background: #D4D4D4"><li style="padding: 20px; font-weight: bold;">Categories</li></div>

            <li>
                <a href={ route('admin-restaurantcategories.create') } class="text-dark">Add Category</a>
            </li>
            <li>
                <a href={ route('admin-restaurantcategories.index') } class="text-dark">List Categories</a>
            </li>
            <div style="background: #D4D4D4"><li style="padding: 20px; font-weight: bold;">Business Manager</li></div>

            <li>
                <a href={ route('admin-restaurants.create') } class="text-dark">Add Business</a>
            </li>
            <li>
                <a href={ route('admin-restaurants.index') } class="text-dark">List Business</a>
            </li>
            <li>
                <a href={ route('admin-applications.index') } class="text-dark">List Application</a>
            </li>
            <div style="background: #D4D4D4"><li style="padding: 20px; font-weight: bold;">Driver Manager</li></div>

            <li>
                <a href={ route('admin-driver.create') } class="text-dark">Add Drivers</a>
            </li>
            <li>
                <a href={ route('admin-driver.index') } class="text-dark">List Drivers</a>
            </li>
            <div style="background: #D4D4D4"><li style="padding: 20px; font-weight: bold;">Delivery Settings</li></div>
            <li>
                <a href={ route('admin-configurations.index') } class="text-dark">Delivery Costs</a>
            </li>
</ul>



    )
}
