import { Link } from "@inertiajs/inertia-react";
import { ChevronDown,Activity } from "lucide-react";
import { useState } from "react";

export default function NavDropdown(props){

    const [dropdownActive,setDropdownActive] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setDropdownActive(!dropdownActive);
        console.log(dropdownActive)
    }
    return(
        <>
        <li>
            <button onClick={toggleMenu} className="side-menu w-full">
                
                {/* Icon */}
                <div className="side-menu__icon">
                    {props.children}
                </div>
                
                {/* Title */}
                <div className="side-menu__title">
                    {props.title}
                    <div className="side-menu__sub-icon ">
                        <ChevronDown className="" />
                    </div>
                </div>
            </button>
            {
                dropdownActive &&
                <ul className="side-menu__sub-open">
                    {
                        props.links && 

                            props.links.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="side-menu">
                                        
                                        <div className="side-menu__icon">
                                            <Activity />
                                        </div>
                                        
                                        <div className="side-menu__title">
                                            {link.title}
                                        </div>
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
            }
                
        </li>
        </>
    )

}