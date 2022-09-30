import DropdownLink from "@/Components/DropdownLink";
import { hasRole } from "@/utils/Utils";
import { Link } from "@inertiajs/inertia-react";
import { BookOpen, Clock, ListChecks, Network, PhoneIncoming, PoundSterling, Table, Timer } from "lucide";
import { Car, Coins, DollarSign, Home, List, ListOrdered, PhoneCall, Server, ShieldAlert, UserCheck, UserPlus, Users} from "lucide-react";
export default function SideBar(props){
    // Get the current user
    const user = props.auth.user;

    // Links for Site Admin to access course categories
    const linkArray = [
        {title:"Link Title",href:"/url"},
    ];

    // Links for user to access admin users
    const adminUserLinks = [
        {title: "Add User", href: route("admin-user.create")},
        {title: "List Users", href: route("admin-user.index")},
    ];

    // Links for user to access call centre users
    const callCentreUserLinks = [
        {title: "Add User", href: route("admin-callcentreuser.create")},
        {title: "List Users", href: route("admin-callcentreuser.index")},
    ];

    // Links for user to access categories
    const categoryLinks = [
        {title: "Add Category", href: route("admin-restaurantcategories.create")},
        {title: "List Categories", href: route("admin-restaurantcategories.index")},
    ];

    // Links for user to access business managers
    const businessManagerLinks = [
        {title: "Add Business", href: route("admin-restaurants.create")},
        {title: "List Businesses", href: route("admin-restaurants.index")},
        {title: "List Applications", href: route("admin-applications.index")},
    ];

    // Links for user to access driver managers
    const driverManagerLinks = [
        {title: "Add Driver", href: route("admin-driver.create")},
        {title: "List Drivers", href: route("admin-driver.index")},
    ];

    // Links for user to access driver cost
    const driverCostLinks = [
        {title: "Driver Cost", href: route("admin-configurations.edit", {id: user.id})},
    ];

    // Links for user to access orders
    const orderLinks = [
        {title: "List Orders", href: route("orders.index")},
    ];

    // Links for user to access restaurant admins
    const restaurantAdminLinks = [
        {title: "Add User", href: route("admin-restaurants.create")},
        {title: "List Users", href: route("admin-restaurants.index")},
    ];

    // Links for user to access stripe gateways
    const stripeGatewayLinks = [
        {title: "Connect to Stripe", href: route("stripe.link")},
    ];

    // Links for user to access products
    const productLinks = [
        {title: "Add Category", href: route("menu-categories.create")},
        {title: "List Categories", href: route("menu-categories.index")},
        {title: "Add Product", href: route("menu-items.create")},
        {title: "List Products", href: route("menu-items.index")},
        // add new group deal
        {title: "Add Group Deal", href: route("group-deals.create")},
        // list group deals
        {title: "List Group Deals", href: route("group-deals.index")},
        // add new extra
        {title: "Add Extra", href: route("extras.create")},
        // list extras
        {title: "List Extras", href: route("extras.index")},
    ];

    // Links for user to access opening times
    const openingTimeLinks = [
        {title: "Manage Opening Times", href: route("operating-hours.index")},
    ];

    // Links for user to manage tables
    const tableLinks = [
        {title: "Manage Tables", href: route("tables.index")},
    ];

    // Links for user to manage offers/news
    const offerLinks = [
        {title: "Add New Offer/News", href: route("offers.create")},
        {title: "List Offers/News", href: route("offers.index")},
    ];

    // Links for user to manage company profile
    const companyProfileLinks = [
        {title: "Manage Profile", href: route("profile.edit")},
    ];

    // Links for user to manage making orders
    const makeOrderLinks = [
        {title: "Make Order", href: route("orders.create")},
    ];

    // Links for user to manage order history
    const orderHistoryLinks = [
        {title: "Order History", href: route("orders.index")},
    ];


    return (
        <>
        {/* Main Admin SideBar */}
            <nav className="side-nav">
                <Link href={user.role_id === 1 ? "/" : user.role_id === 2 ? "/restaurant-admin" : "/call-center-admin"} className="flex items-center pt-4 pl-5 intro-x">
                    <img alt="" className="w-6" src="/img/icons/logo.png" />
                    <span className="hidden ml-3 text-lg text-white xl:block"> ORDER IT </span>
                </Link>
                <div className="my-6 side-nav__devider"></div>
                <ul>

                    {/* <DropdownLink groupTitle="Dashboard" links={linkArray} active={props.activeGroup == 0 ? true:false}>
                        <Home />
                    </DropdownLink> */}
                    {
                        hasRole("admin") && (
                        <>
                            <DropdownLink groupTitle="Admin" links={adminUserLinks} active={props.activeGroup == 1 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Call Centre Users */}
                            <DropdownLink groupTitle="Call Centre" links={callCentreUserLinks} active={props.activeGroup == 2 ? true:false}>
                                <PhoneCall />
                            </DropdownLink>

                            {/* Categories */}
                            <DropdownLink groupTitle="Categories" links={categoryLinks} active={props.activeGroup == 3 ? true:false}>
                                <ListOrdered />
                            </DropdownLink>

                            {/* Business Managers */}
                            <DropdownLink groupTitle="Business Managers" links={businessManagerLinks} active={props.activeGroup == 4 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Driver Managers */}
                            <DropdownLink groupTitle="Driver Managers" links={driverManagerLinks} active={props.activeGroup == 5 ? true:false}>
                                <Car />
                            </DropdownLink>

                            {/* Driver Cost */}
                            <DropdownLink groupTitle="Driver Cost" links={driverCostLinks} active={props.activeGroup == 6 ? true:false}>
                                <Coins />
                            </DropdownLink>
                        </>
                        )
                    }
                    {/* Links for Role Restuarent Admin */}
                    {
                        hasRole("restaurant_admin") && (
                        <>
                            {/* View Orders */}
                            <DropdownLink groupTitle="View Orders" links={orderLinks} active={props.activeGroup == 1 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Restaurant Admin Users */}
                            <DropdownLink groupTitle="Admin Users" links={restaurantAdminLinks} active={props.activeGroup == 2 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Stripe Gateway */}
                            <DropdownLink groupTitle="Stripe Gateway" links={stripeGatewayLinks} active={props.activeGroup == 3 ? true:false}>
                                <Coins />
                            </DropdownLink>

                            {/* Products */}
                            <DropdownLink groupTitle="Products" links={productLinks} active={props.activeGroup == 4 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Opening Times */}
                            <DropdownLink groupTitle="Opening Times" links={openingTimeLinks} active={props.activeGroup == 5 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Table Service */}
                            <DropdownLink groupTitle="Table Service" links={tableLinks} active={props.activeGroup == 6 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Offers/News */}
                            <DropdownLink groupTitle="Offers/News" links={offerLinks} active={props.activeGroup == 7 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Company Profile */}
                            <DropdownLink groupTitle="Company Profile" links={companyProfileLinks} active={props.activeGroup == 8 ? true:false}>
                                <Users />
                            </DropdownLink>
                        </>
                        )
                    }
                    {
                        hasRole("call_centre_admin") && (
                        <>
                            <DropdownLink groupTitle="Make Order" links={makeOrderLinks} active={props.activeGroup == 1 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Order history links */}
                            <DropdownLink groupTitle="Orders History" links={orderHistoryLinks} active={props.activeGroup == 2 ? true:false}>
                                <Users />
                            </DropdownLink>


                        </>
                        )
                    }

                </ul>
            </nav>
            {/* End of Main Admin SideBar */}
        </>
    )
}
