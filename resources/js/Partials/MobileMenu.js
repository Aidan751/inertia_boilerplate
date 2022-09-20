import MobileDropdownLink from "@/Components/MobileDropdownLink";
import { Menu,Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import { BarChart2, Home } from "lucide-react";
import { Fragment } from "react";





export default function MobileMenu(props){

    return (
        <>
        <Menu as={"div"} className="mobile-menu md:hidden">
            <div className="mobile-menu-bar">
                {/* Mobile Menu Logo */}
                
                <Link href="/dashboard" className="flex mr-auto">
                    
                    {/* TODO Import App logo */}
                    <img alt="Order it" className="w-6" src="/images/logo.svg" />
                
                </Link>

                {/* Mobile Menu Toggler */}
                <Menu.Button id="mobile-menu-toggler">
                   <BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
                </Menu.Button>
            </div>

            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >

                <Menu.Items as="ul" className="border-t border-white/[0.08] py-5">
                    <Menu.Item>

                        {/* TODO Add Dropdown link for mobile menu */}
                        <MobileDropdownLink href={"/"} links={[]} title="Dashboard">
                            <Home />
                        </MobileDropdownLink>

                    </Menu.Item>
                    
                </Menu.Items>
            </Transition>
            
        </Menu>

        </>
    )
}