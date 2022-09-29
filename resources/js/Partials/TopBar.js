import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import { Bell, CreditCard, Edit, HelpCircle, Home, Inbox, Lock, Search, ToggleRight, User, Users } from "lucide-react";
import { Link, usePage } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function TopBar({auth}) {

    // Get the current user
    const user = auth.user;
    // Show the default image url
    const defaultImageUrl = user.image ?? "https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80";

    // Show the state of the search dropdown menu
    const [searchDropdown, setSearchDropdown] = useState(false);
    const showSearchDropdown = () => {
        setSearchDropdown(true);
    };
    const hideSearchDropdown = () => {
        setSearchDropdown(false);
    };

    return (
        <>
            {/* BEGIN: Top Bar */}
            <div className="top-bar">

                {/* BEGIN: Breadcrumb */}
                <nav aria-label="breadcrumb" className="-intro-x mr-auto hidden sm:flex" ></nav>
                {/* END: Breadcrumb */}

                {/* BEGIN: Search */}
                <div className="intro-x relative mr-4 sm:mr-6">
                    Welcome - {user.first_name} {user.last_name}
                </div>
                {/* END: Search  */}


                {/* BEGIN: Account Menu */}
                <Dropdown className="intro-x w-8 h-8">

                    {/* Dropdown Toggler */}
                    <DropdownToggle
                        tag="div"
                        role="button"
                        className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                        <ApplicationLogo />
                    </DropdownToggle>

                    {/* Dropdown Menu */}
                    <DropdownMenu className="w-56">

                        <DropdownContent className="bg-primary text-white">
                            {/* Header */}
                            <DropdownHeader tag="div" className="!font-normal">

                                {/* Name and Surname */}
                                <div className="font-semibold py-2 text-zinc-200">
                                    {/* TODO Add user name  */}
                                    {user.first_name} {user.last_name}
                                </div>
                                {/* User Role */}
                                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                                    {/* TODO Add user role */}
                                    {user.role_id === 1 ? "Admin" : user.role_id === 2 ? "Business Admin" : "Call Centre Admin"}
                                </div>
                            </DropdownHeader>
                            <DropdownDivider className="border-white/[0.08]" />

                                <Link href={user.role_id === 1 ? "/" : user.role_id === 2 ? "/restaurant-admin" : "/call-center-admin"} className="cursor-pointer dropdown-item hover:bg-white/5">
                                    <User className="w-4 h-4 mr-2" /> Home
                                </Link>

                                <DropdownDivider className="border-white/[0.08]" />
                                <Link href={route("logout")} action="/logout" method="POST" className="cursor-pointer dropdown-item hover:bg-white/5">
                                    <ToggleRight className="w-4 h-4 mr-2" /> Logout
                                </Link>
                        </DropdownContent>

                    </DropdownMenu>

                </Dropdown>
                {/* END: Account Menu */}
            </div>
            {/* END: Top Bar */}
        </>
    );
}
