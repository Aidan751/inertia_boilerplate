import { Link } from "@inertiajs/inertia-react";
import { Activity, ChevronDown } from "lucide-react";

export default function MobileDropdownLink(props){

    return (
        <>
            <li>
                {/* Dropdown Button Toggler */}
                <Link className="menu menu--active">
                    <div className="menu__icon">
                        {props.children}
                    </div>
                    <div className="menu__title">
                        {props.groupTitle}
                        <ChevronDown className="menu__sub-icon transform rotate-180" />
                    </div>
                </Link>
                {/* Dropdown Content */}
                <ul className="menu__sub-open">

                    {/* Dropdown Item */}
                    {
                        props.links && 
                        props.links.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="menu menu--active">
                                    <div className="menu__icon">
                                        <Activity />
                                    </div>
                                    <div className="menu__title">{link.title}</div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </li>
        </>
    )
}