import DropdownLink from "@/Components/DropdownLink";
import { hasRole } from "@/utils/Utils";
import { Link } from "@inertiajs/inertia-react";
import { Car, Coins, ListOrdered, PhoneCall, Users, Menu, Cookie, CreditCard, Clock1, Table, Info, Settings, PersonStanding } from "lucide-react";
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

    // Links for restaurant user to access orders
    const restaurantOrderLinks = [
        {title: "List Orders", href: route("restaurant.orders.index", {id: user.id})},
    ];

    // Links for user to access restaurant admins
    const restaurantAdminLinks = [
        {title: "Add User", href: route("restaurant.users.create")},
        {title: "List Users", href: route("restaurant.users.index")},
    ];

    // Links for user to access stripe gateways
    const stripeGatewayLinks = [
        {title: "Connect to Stripe", href: route("restaurant.stripe.link")},
    ];

    // Links for user to access products
    const productLinks = [
        {title: "Add Category", href: route("restaurant.menu.categories.create")},
        {title: "List Categories", href: route("restaurant.menu.categories.index")},
        {title: "Add Product", href: route("restaurant.menu.items.create")},
        {title: "List Products", href: route("restaurant.menu.items.index")},
        // add new group deal
        {title: "Add Group Deal", href: route("restaurant.group-deals.create")},
        // list group deals
        {title: "List Group Deals", href: route("restaurant.group-deals.index")},
        // add new extra
        {title: "Add Extra", href: route("restaurant.extras.create")},
        // list extras
        {title: "List Extras", href: route("restaurant.extras.index")},
    ];

    // Links for user to access opening times
    const openingTimeLinks = [
        {title: "Manage Opening Times", href: route("restaurant.opening-hours.edit", {id: user.id})},
    ];

    // Links for user to manage tables
    const tableLinks = [
        {title: "Manage Tables", href: route("restaurant.tables.index")},
    ];

    // Links for user to manage offers/news
    const offerLinks = [
        {title: "Add New Offer/News", href: route("restaurant.offers.create")},
        {title: "List Offers/News", href: route("restaurant.offers.index")},
    ];

    // Links for user to manage company profile
    const companyProfileLinks = [
        {title: "Manage Profile", href: route("my.restaurant.edit")},
    ];

    // Links for user to manage making orders
    const makeOrderLinks = [
        {title: "Make Order", href: route("call-centre.orders.search", {id: user.id})},
    ];

    // Links for user to manage order history
    const orderHistoryLinks = [
        {title: "Order History", href: route("call-centre.orders.history", {id: user.id})},
    ];


    return (
        <>
        {/* Main Admin SideBar */}
            <nav className="side-nav">
                <Link href="/" className="flex items-center pt-4 pl-5 intro-x">
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
                            <DropdownLink groupTitle="View Orders" links={restaurantOrderLinks} active={props.activeGroup == 7 ? true:false}>
                                <Menu />
                            </DropdownLink>

                            {/* Restaurant Admin Users */}
                            <DropdownLink groupTitle="Admin Users" links={restaurantAdminLinks} active={props.activeGroup == 8 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Stripe Gateway */}
                            <DropdownLink groupTitle="Stripe Gateway" links={stripeGatewayLinks} active={props.activeGroup == 9 ? true:false}>
                                <CreditCard />
                            </DropdownLink>

                            {/* Products */}
                            <DropdownLink groupTitle="Products" links={productLinks} active={props.activeGroup == 10 ? true:false}>
                                <Cookie />
                            </DropdownLink>

                            {/* Opening Times */}
                            <DropdownLink groupTitle="Opening Times" links={openingTimeLinks} active={props.activeGroup == 11 ? true:false}>
                                <Clock1 />
                            </DropdownLink>

                            {/* Table Service */}
                            <DropdownLink groupTitle="Table Service" links={tableLinks} active={props.activeGroup == 13 ? true:false}>
                                <PersonStanding />
                            </DropdownLink>

                            {/* Offers/News */}
                            <DropdownLink groupTitle="Offers/News" links={offerLinks} active={props.activeGroup == 14 ? true:false}>
                                <Info />
                            </DropdownLink>

                            {/* Company Profile */}
                            <DropdownLink groupTitle="Company Profile" links={companyProfileLinks} active={props.activeGroup == 15 ? true:false}>
                                <Settings />
                            </DropdownLink>
                        </>
                        )
                    }
                    {
                        hasRole("call_centre_admin") && (
                        <>
                            <DropdownLink groupTitle="Make Order" links={makeOrderLinks} active={props.activeGroup == 16 ? true:false}>
                                <Users />
                            </DropdownLink>

                            {/* Order history links */}
                            <DropdownLink groupTitle="Orders History" links={orderHistoryLinks} active={props.activeGroup == 17 ? true:false}>
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
