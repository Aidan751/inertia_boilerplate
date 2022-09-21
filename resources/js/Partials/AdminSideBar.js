import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import ListHeading from '@/Partials/SideBarListHeading'
import ListItem from '@/Partials/SideBarListItem'



export default function AdminSideBar(props) {
    return (
        <ul className="list-unstyled sidebar-nav  sidebar-offcanvas">
            <ListHeading title="Admin Users" />

            <ListItem title="Add User" url="admin-user.create" />
            <ListItem title="List Users" url="admin-user.index" />

            <ListHeading title="Call Center" />

            <ListItem title="Add User" url="admin-CallCentreuser.create" />
            <ListItem title="List Users" url="admin-callcentreuser.index" />

            <ListHeading title="Categories" />

            <ListItem title="Add Category" url="admin-restaurantcategories.create" />
            <ListItem title="List Categories" url="admin-restaurantcategories.index" />


            <ListHeading title="Business Manager" />

            <ListItem title="Add Business" url="admin-restaurants.create" />
            <ListItem title="List Businesses" url="admin-restaurants.index" />
            <ListItem title="List Application" url="admin-applications.index" />

            <ListHeading title="Driver Manager" />

            <ListItem title="Add Driver" url="admin-driver.create" />
            <ListItem title="List Drivers" url="admin-driver.index" />

            <ListHeading title="Delivery Settings" />

            <ListItem title="Delivery Costs" url="admin-configurations.index" />

        </ul>



    )
}
