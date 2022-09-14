import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import MobileMenu from '@/Midone/Partials/MobileMenu';
import SideBar from '@/Midone/Partials/SideBar';
import TopBar from '@/Midone/Partials/TopBar';

export default function Authenticated({ auth, header, children,activeGroup,secondActiveGroup }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <section className="py-5 px-2">

            {/* Mobile Menu */}
            <MobileMenu />

            {/* Content and Side Menu */}
            <section className='flex'>
                
                {/* SideBar */}
                <SideBar activeGroup={activeGroup} secondActiveGroup={secondActiveGroup} />

                {/* Content Container */}
                <main className='content'>
                    {/* TopBar */}
                    <TopBar />

                    {/* Content */}
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 2xl:col-span-12">
                            <div className="grid grid-cols-12 gap-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>


            </section>
        </section>
    );
}
