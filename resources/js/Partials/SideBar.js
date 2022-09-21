import DropdownLink from "@/Components/DropdownLink";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Home, ShieldAlert} from "lucide-react";
export default function SideBar(props){

    const isAdmin = usePage().props.auth.isAdmin;
    const isRestaurantAdmin = usePage().props.auth.isRestaurantAdmin;
    const isCallCentreAdmin = usePage().props.auth.isCallCentreAdmin;

    // Links for Site Admin
    const adminLink = [
        {title:"Admin Area",href:route("mainAdmin.dashboard")},
    ];

    // Links for Restaurant Admin
    const restaurantAdminLink = [
        {title:"Restaurant Admin Area",href:route("restaurantAdmin.dashboard")},
    ];

    // Links for Call Center Admin
    const CallCentreAdminLink = [
        {title:"Call Center Admin Area",href:route("CallCentreAdmin.dashboard")},
    ];

    // Links for user to access roles
    const rolesLinks = [
        {title: "Roles", href: route("roles.index")},
        {title: "Create Role", href: route("roles.create")},
    ];

    const linkArray = [
        {title:"Link Title",href:"/url"},

    ];



    return (
        <>
            <nav className="side-nav">
                <Link href="/admin" className="intro-x flex items-center pl-5 pt-4">
                    <img alt="" className="w-6" src="/images/logo.svg" />
                    <span className="hidden xl:block text-white text-lg ml-3"> ORDER IT </span>
                </Link>
                <div className="side-nav__devider my-6"></div>
                <ul>

                    <DropdownLink groupTitle="Dashboard" links={linkArray} active={props.activeGroup == 0 ? true:false}>
                        <Home />
                    </DropdownLink>

                    {/* Roles Menu Section */}
                    <DropdownLink groupTitle="Roles" links={rolesLinks} active={props.activeGroup == 1 ? true:false}>
                        <ShieldAlert />
                    </DropdownLink>
                </ul>
            </nav>
        </>
    )
}
