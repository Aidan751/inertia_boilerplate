import { Link } from "@inertiajs/inertia-react";

export default function MobileNavItem(props){

    return(
        <>
            <li>
                <Link href={props.href} className="menu menu--active">
                    <div className="menu__icon">
                        {props.children}
                    </div>
                    <div className="menu__title">
                        {props.title}
                    </div>
                </Link>

            </li>
        </>
    )
}