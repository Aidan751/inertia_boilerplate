import { Link } from "@inertiajs/inertia-react";
import { Activity, ChevronDown, ChevronUp } from "lucide-react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";


export default function DropdownLink(props){

    const [isShowing,setIsShowing] = useState(props.active);

    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsShowing(!isShowing);
    }

    return (
        <>
            <li>
                {/* Main Menu Toggler */}
                <Link onClick={toggleDropdown} className={props.active ? "side-menu side-menu--active": "side-menu"}>
                    <div className="side-menu__icon">
                        {props.children}
                    </div>
                    
                    <div className="side-menu__title">
                        {props.groupTitle} 
                        <div className="side-menu__sub-icon transform rotate-180">
                            {
                                isShowing && 
                                <ChevronDown />
                            }
                            {
                                isShowing == false &&
                                <ChevronUp />
                            }
                        </div>
                    </div>
                </Link>
                

                <Transition
                    as={Fragment}
                    show={isShowing}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <ul className={ "side-menu__sub-open"}>
                        
                        {
                            props.links &&
                            props.links.map(link => (

                                <li key={link.href}>
                                    <Link href={link.href} className="side-menu side-menu--active">
                                        <div className="side-menu__icon">
                                            <Activity />
                                        </div>
                                        <div className="side-menu__title">{link.title}</div>
                                    </Link>
                                </li>
                            ))
                        }
                                
                    </ul>

                </Transition>
                
            </li>
        </>
    )
}