import { Link, usePage } from "@inertiajs/inertia-react";
import { Users, Database, UserCheck, Files, Home, FileCheck} from "lucide-react";
import DropdownLink from "../Components/SideMenu/DropdownLink";
import SideAdminDesktopRoutes from "../Components/SideAdmin/SideAdminDesktopRoutes";
import {hasRole} from "@/utils/Utils"
import CustomerDesktopRoutes from "../Components/Customer/CustomerDesktopRoutes";
export default function SideBar(props){

    const isSuper = usePage().props.auth.isSuper;
    const isAdmin = usePage().props.auth.isAdmin;
    const isMember = usePage().props.auth.isMember;
    // Dashboard Links
    const excoAdminLink = [
        {title:"Overview",href:route("exco-admin.dashboard")},
    ];
    const excoLink = [
        {title:"Overview",href:route("exco.dashboard")},
    ];

    const memberLink = [
        {title:"Overview",href:route("member.dashboard")},
    ]


    // Links for exco admin to access members
    const excoMemberLink = [
        {title:"Overview",href:route("site-admin.members.index")},
    ];

    // Links for Site Admin to access course categories
    const courseCategoriesGroup = [
        {title:"Course Categories",href:route("site-admin.categories.index")},
        {title:"Add Course Category",href:route("site-admin.categories.create")},
    ];

    // Links for Site Admin to access courses
    const coursesGroup = [
        {title:"Courses",href:route("site-admin.courses.index")},
        {title:"Add Course",href:route("site-admin.courses.create")},
    ];
    // Links for the Exco Role to access the course categories
    const categoryLinks = [
        {title:"Course Categories",href:route("site-admin.categories.index")},
    ];
    // Links for the Exco Role to access the courses
    const courseLinks = [
        {title:"Courses",href:route("site-admin.courses.index")},
    ];

    // Links for the Member Role to access the categories
    const memberCategoryLinks = [
        {title:"Course Categories",href:route("member.dashboard.categories")},
    ];

    // Links for the Member Role to access the courses
    const memberCourseLinks = [
        {title:"Courses",href:route("member.dashboard.courses")},
    ];

    const currentUserLinks = [
        {title:"Profile",href:"/profile"},
    ];

   
    return (
        <>
            <nav className="side-nav w-full">
                <Link href="/admin" className="intro-x flex items-center pl-5 pt-4">
                    <img alt="" className="w-6" src="/images/logo.svg" />
                    <span className="hidden xl:block text-white text-lg ml-3"> SAGA Skill Portal </span> 
                </Link>
                <div className="side-nav__devider my-6"></div>
                <ul>
                    {/* Home */}
                    

                    {/* Site Admin */}
                    {
                        hasRole("site-admin")&& (
                            <SideAdminDesktopRoutes activeGroup={props.activeGroup} />
                        )
                    }
                    {/* Distribution Admin */}
                    {
                        hasRole("distribution") && (
                            <SideAdminDesktopRoutes activeGroup={props.activeGroup} />
                        )
                    }

                    {/* Exco Admin */}
                    {
                        hasRole("exco-admin") && (
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
                    
                    {/* Exco Role */}
                    {
                        hasRole("exco") && (
                            <>
                                <DropdownLink groupTitle="Dashboard" links={excoLink} active={props.activeGroup == 0 ? true:false}>
                                    <Home />
                                </DropdownLink>
                                {/* Course Categories */}
                                <DropdownLink groupTitle="Course Categories" links={categoryLinks} active={props.activeGroup == 8 ? true:false}>
                                    <Files />
                                </DropdownLink>

                                {/* Courses */}
                                <DropdownLink groupTitle="Courses" links={courseLinks} active={props.activeGroup == 9 ? true:false}>
                                    <FileCheck />
                                </DropdownLink>
                            </>
                        )
                    }

                    {
                        hasRole("member") && (
                            <>
                                <DropdownLink groupTitle="Dashboard" links={memberLink} active={props.activeGroup == 0 ? true:false}>
                                    <Home />
                                </DropdownLink>
                                {/* Course Categories */}
                                <DropdownLink groupTitle="Course Categories" links={memberCategoryLinks} active={props.activeGroup == 8 ? true:false}>
                                    <Files />
                                </DropdownLink>

                                {/* Courses */}
                                <DropdownLink groupTitle="Courses" links={memberCourseLinks} active={props.activeGroup == 9 ? true:false}>
                                    <FileCheck />
                                </DropdownLink>
                            </>
                        )
                    }
                    {
                        hasRole("customer") &&
                            <CustomerDesktopRoutes activeGroup={props.activeGroup} />
                    }
                    {/* Account */}
                    <DropdownLink groupTitle="Account" links={currentUserLinks} active={props.activeGroup == 15 ? true:false}>
                        <UserCheck />
                    </DropdownLink>
                </ul>
            </nav>
        </>
    )
}
