import React, { useState } from 'react';
import SideBar from '@/Partials/SideBar';
import MobileMenu from '@/Partials/MobileMenu';
import TopBar from '@/Partials/TopBar';
import Footer from '@/Components/Footer';
export default function Authenticated({ auth, header, children,activeGroup,secondActiveGroup }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <section className="py-5 px-2">

                {/* Mobile Menu */}
                <MobileMenu auth={auth} />

                {/* Content and Side Menu */}
                <section className='flex'>

                    {/* SideBar */}
                    <SideBar activeGroup={activeGroup} secondActiveGroup={secondActiveGroup} auth={auth} />

                    {/* Content Container */}
                    <main className='content'>
                        {/* TopBar */}
                        <TopBar auth={auth} />

                        {/* Content */}
                        <div className="grid grid-cols-12 gap-6"  scroll-region>
                            <div className="col-span-12 2xl:col-span-12">
                                <div className="grid grid-cols-12 gap-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>


                </section>
            </section>
        <Footer appName="Order It" />
        </>
    );
}
