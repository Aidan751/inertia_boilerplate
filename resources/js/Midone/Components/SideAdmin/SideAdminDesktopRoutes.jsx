import { hasRole } from "@/utils/Utils";
import { Users,ShieldAlert, Key, Database, Home, UserCheck, Files,Contact,FileCheck2,CreditCard,Wrench } from "lucide-react";
import DropdownLink from "../SideMenu/DropdownLink";

export default function SideAdminDesktopRoutes({activeGroup}){

    // Links for Site Admin to access dashboard
    const siteAdminLinks = [
        {title:"Dashboard",href:route("site-admin.dashboard")},
    ];            
    // Links for Distribution Admin to access dashboard
    const distributionAdminLinks = [
        {title:"Dashboard",href:route("distribution.dashboard")},
    ];

    // Links for Site Admin to access permissions
    const permissionsGroup = [
        {title:"Permissions",href:route("site-admin.permissions.index")},
        {title:"Add Permissions",href:route("site-admin.permissions.create")},
    ];

    // Links for Site Admin to access roles
    const rolesGroup = [
        {title:"Roles",href:route("site-admin.roles.index")},
        {title:"Add Role",href:route("site-admin.roles.create")},
    ];

    // Links for Site Admin to access users
    const usersGroup = [
        {title:"Users",href:route("site-admin.users.index")},
        {title:"Add User",href:route("site-admin.users.create")},
    ];

    // Links for Site Admin to access form builder
    const formBuilderGroup = [
        {title:"Forms",href:route("site-admin.dynamic-forms.index")},
        {title:"Add Form",href:route("site-admin.dynamic-forms.create")},
    ];

    // Links for Site Admin to access members
    const membersGroup = [
        {title:"Members",href:route("site-admin.members.index")},
        {title:"Add Member",href:route("site-admin.members.create")},
    ];

    // Links for Site Admin to access customers
    const customersGroup = [
        {title:"Customers",href:"/site-admin/customers"},
        {title:"Add Customer",href:"/site-admin/customers/create"},
    ];

    // Links for Site Admin to access finance 
    const ordersGroup = [
        {title:"Orders",href:route("site-admin.orders.index")},
        {title:"Invoices",href:"/site-admin/invoices"},
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

    // Links for Site Admin to access settings
    const settingsGroup = [
        {title:"Payment Settings",href:"/site-admin/settings/payment-settings"},
        {title:"Google Analytics",href:"/site-admin/settings/google-analytics"},
    ];


    return (
        <>
            {
                hasRole("distribution") && (
                    <>
                    <DropdownLink groupTitle="Dashboard" links={distributionAdminLinks} active={activeGroup == 0 ? true:false}>
                        <Home />
                    </DropdownLink>
                    </>
                )
            }

            {
                hasRole("site-admin") && 
                <>
                <DropdownLink groupTitle="Dashboard" links={siteAdminLinks} active={activeGroup == 0 ? true:false}>
                    <Home />
                </DropdownLink>
                <DropdownLink groupTitle="Roles" links={rolesGroup} active={activeGroup == 1 ? true:false}>
                    <ShieldAlert />
                </DropdownLink>
                <DropdownLink groupTitle="Permissions" links={permissionsGroup} active={activeGroup == 2 ? true:false}>
                    <Key />
                </DropdownLink>
                </>
            }

            
            
            {/* Form Builder */}
            <DropdownLink groupTitle="Form Builder" links={formBuilderGroup} active={activeGroup == 3 ? true:false}>
                <Database />
            </DropdownLink>

            {/* Users */}
            <DropdownLink groupTitle="User Management" links={usersGroup} active={activeGroup == 4 ? true:false}>
                <Users />
            </DropdownLink>

            {/* Members */}
            <DropdownLink groupTitle="Members" links={membersGroup} active={activeGroup == 5 ? true:false}>
                <UserCheck />
            </DropdownLink>

            {/* Customers */}
            {/* <DropdownLink groupTitle="Customers" links={customersGroup} active={activeGroup == 6 ? true:false}>
                <Contact />
            </DropdownLink> */}

            {/* Finance */}
            <DropdownLink groupTitle="Finance" links={ordersGroup} active={activeGroup == 7 ? true:false}>
                <CreditCard />
            </DropdownLink>

            {/* Course Categories */}
            <DropdownLink groupTitle="Course Categories" links={courseCategoriesGroup} active={activeGroup == 8 ? true:false}>
                <Files />
            </DropdownLink>

            {/* Courses */}
            <DropdownLink groupTitle="Courses" links={coursesGroup} active={activeGroup == 9 ? true:false}>
                <FileCheck2 />
            </DropdownLink>

            {/* Site Admin Setting */}
            <DropdownLink groupTitle="Settings" links={settingsGroup} active={activeGroup == 10 ? true:false}>
                <Wrench />
            </DropdownLink>
        
        </>
    )
}