import DropdownLink from "@/Components/DropdownLink";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Home, ShieldAlert} from "lucide-react";
import { hasRole } from "@/utils/Utils.js";
export default function SideBar(props){


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
                    {/* Home */}
                    
                    {/* Restaurant Admin */}
                    {
                        hasRole("restaurant_admin") && (
                            <SideAdminDesktopRoutes activeGroup={props.activeGroup} />
                        )
                    }

                    {/* Call Centre Admin */}
                    {
                        hasRole("main_admin")&& (
                            <SideAdminDesktopRoutes activeGroup={props.activeGroup} />
                        )
                    }

                    {/* Main Admin */}
                    {
                        hasRole("main_admin") && (
                            <>
                                <DropdownLink groupTitle="Dashboard" links={excoAdminLink} active={props.activeGroup == 0 ? true:false}>
                                    <Home />
                                </DropdownLink>
                                {/* Members */}
                                <DropdownLink groupTitle="Members" links={excoMemberLink} active={props.activeGroup == 5 ? true:false}>
                                    <UserCheck />
                                </DropdownLink>
                                 {/* Course Categories */}
                                <DropdownLink groupTitle="Course Categories" links={courseCategoriesGroup} active={props.activeGroup == 8 ? true:false}>
                                    <Files />
                                </DropdownLink>

                                {/* Courses */}
                                <DropdownLink groupTitle="Courses" links={coursesGroup} active={props.activeGroup == 9 ? true:false}>
                                    <FileCheck />
                                </DropdownLink>
                            </>
                        )
                    }
                    
                   
                </ul>
            </nav>
        </>
    )
}

