import ApplicationLogo from '@/Images/logo_sml.png';
import MobileNavDropdown from '@/Midone/Components/MobileNavDropdown';
import MobileNavItem from '@/Midone/Components/MobileNavItem';
import { Link } from '@inertiajs/inertia-react';
import { Activity, BarChart2, Home, ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';


export default function MobileMenu(){

    const [isMenuOpen,setIsMenuOpen] = useState(false);

    const toggleMenu = (e) => {

        e.preventDefault();

        setIsMenuOpen(!isMenuOpen);

        console.log(isMenuOpen);
    }

    const links = [
        {
            href: "/hellow",
            title: "Get In"
        },
        {
            href: "michael",
            title: "United"
        }
    ];
    return(
        <>
            {/* BEGIN: Mobile Menu */}
                <div className="mobile-menu md:hidden">
                    <div className="mobile-menu-bar pt-5">
                        <Link href="/dashboard" className="flex mr-auto">
                        <img alt="South African Guild of Actors" className="h-10 w-auto" src={ApplicationLogo} />
                        </Link>
                        <button onClick={toggleMenu}>
                            <BarChart2 className='w-8 h-8 text-white transform -rotate-90' />
                        </button>
                    </div>
                    {
                        isMenuOpen &&

                            <>
                                <ul className="border-t border-white/[0.08] py-5">
                                    
                                    <MobileNavItem href="/dashboard" title="Dashboard">
                                        <Home />
                                    </MobileNavItem>

                                    <MobileNavDropdown title="Users" links={links}>
                                        <Users />
                                    </MobileNavDropdown>
                        
                                </ul>
                            </>
                    }
                </div>
            {/* END: Mobile Menu */}

        </>
    )
}