import DropdownLink from "@/Components/DropdownLink";
import { Link } from "@inertiajs/inertia-react";
import { Home, ShieldAlert} from "lucide-react";
export default function SideBar(props){

    // Links for Site Admin to access course categories
    const linkArray = [
        {title:"Link Title",href:"/url"},
    ];

    // Links for user to access roles
    const adminUserLinks = [
        {title: "Add User", href: route("admin-user.create")},
        {title: "List Users", href: route("admin-user.index")},
    ];
    return (
        <>
        {/* Main Admin SideBar */}
            <nav className="side-nav">
                <Link href="/admin" className="intro-x flex items-center pl-5 pt-4">
                    <img alt="" className="w-6" src="/images/logo.svg" />
                    <span className="hidden xl:block text-white text-lg ml-3"> ORDER IT </span>
                </Link>
                <div className="side-nav__devider my-6"></div>
                <ul>

                    {/* <DropdownLink groupTitle="Dashboard" links={linkArray} active={props.activeGroup == 0 ? true:false}>
                        <Home />
                    </DropdownLink> */}

                    {/* Roles Menu Section */}
                    <DropdownLink groupTitle="Admin Users" links={adminUserLinks} active={props.activeGroup == 1 ? true:false}>
                        <ShieldAlert />
                    </DropdownLink>
                </ul>
            </nav>
            {/* End of Main Admin SideBar */}
        </>
    )
}
