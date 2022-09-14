import React, { useState } from 'react';
import ApplicationLogo from '@/Images/logo_sml.png';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/inertia-react';
import MobileMenu from '@/Components/MobileMenu';
import TopBar from '@/Components/TopBar';
import SideBar from '@/Components/SideBar';
import "@/Css/midone.css";

export default function AdminLayout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    //Declare Roles and Permissions Globally
    const userRoles = usePage().props.auth.roles;
    const userPermissions = usePage().props.auth.permissions;
    //Check if user has role or permissions
    const hasRoleOrPermission = (rolesOrPermissions) => {

    };

    return (
        <>
            <MobileMenu />
            <TopBar />

            {/* Sidebar and content */}
            <section className='flex overflow-hidden'>
                {/* Sidebar */}
                <SideBar />

                {/* Content */}
                <main className='content'>
                    {children}
                </main>
            </section>
        </>
    );
}
