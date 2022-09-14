import {Link} from "@inertiajs/inertia-react";

export function menuLinks(href,title,icon,active=false){
    return (
        <>
            <li>
                <Link href={href} className={active ? "menu menu--active" : "menu"}>
                    <div className="menu__icon">
                        <i data-lucide={icon}></i>
                    </div>
                    <div className="menu__title">
                        {title}
                    </div>
                </Link>
            </li>
        </>
    )
}

export function menuDropdown(links,href,title,icon,active=false){
    return (
        <>
            <li>
                <Link href={href} className={active ? "menu menu--active" : "menu"}>
                    <div className="menu__icon">
                        <i data-lucide={icon}></i>
                    </div>
                    <div className="menu__title">
                        {title}
                    </div>
                    {/* Dropdown   */}
                    <ul className={ active ? 'menu__sub-open' : '' }>
                        {
                            links && links.map(link => (
                                <li>
                                    <Link href={link.href} class="menu">
                                        <div className="menu__icon">
                                            <i data-lucide={link.icon}></i>
                                        </div>

                                        <div className="menu__title">
                                            {link.title}
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </Link>
            </li>
        </>
    )
}

