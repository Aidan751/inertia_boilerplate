import { Users,ShieldAlert, Key, Database, Home, UserCheck, Files,Contact,FileCheck2,CreditCard,Wrench } from "lucide-react";
import DropdownLink from "../SideMenu/DropdownLink";

export default function CustomerDesktopRoutes({activeGroup}){

    // Links for Site Admin to access dashboard
    const siteAdminLinks = [
        {title:"Dashboard",href:route("customer.dashboard")},
    ];

    // Links for Site Admin to access finance 
    const ordersGroup = [
        {title:"Orders",href:route("customer.orders")},
    ];

    // Links for Site Admin to access courses
    const coursesGroup = [
        {title:"My Courses",href:route("customer.courses")},
    ];


    return (
        <>
            <DropdownLink groupTitle="Dashboard" links={siteAdminLinks} active={activeGroup == 0 ? true:false}>
                <Home />
            </DropdownLink>

            {/* Finance */}
            <DropdownLink groupTitle="Finance" links={ordersGroup} active={activeGroup == 7 ? true:false}>
                <CreditCard />
            </DropdownLink>

            {/* Courses */}
            <DropdownLink groupTitle="Courses" links={coursesGroup} active={activeGroup == 9 ? true:false}>
                <FileCheck2 />
            </DropdownLink>

        </>
    )
}