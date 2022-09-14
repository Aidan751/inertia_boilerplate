import { Link } from "@inertiajs/inertia-react";

export default function NavItem(props){

    return(
        <>
            <li>
                <Link href={props.href} className={"side-menu " + (props.active ? "side-menu--active" : "")}>
                    <div className="side-menu__icon">
                        {props.children}
                    </div>
                    <div className="side-menu__title">
                        {props.title}
                    </div>
                </Link>

            </li>
        </>
    )
}