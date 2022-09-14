import { Link } from "@inertiajs/inertia-react";
import { ChevronDown,Activity } from "lucide-react";
import { useState } from "react";

export default function MobileNavDropdown(props){

    const [dropdownActive,setDropdownActive] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setDropdownActive(!dropdownActive);
        console.log(dropdownActive)
    }
    return(
        <>
        <li>
            <button onClick={toggleMenu} className="menu">
                
                {/* Icon */}
                <div className="menu__icon">
                    {props.children}
                </div>
                
                {/* Title */}
                <div className="menu__title">
                    {props.title}
                    <ChevronDown className="menu__sub-icon"></ChevronDown>
                </div>
            </button>
            
            {
                dropdownActive &&

                <ul>
                    {
                        props.links && 

                            props.links.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="menu">
                                        
                                        <div className="menu__icon">
                                            <Activity />
                                        </div>
                                        
                                        <div className="menu__title">
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