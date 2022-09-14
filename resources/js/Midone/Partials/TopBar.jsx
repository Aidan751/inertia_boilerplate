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

export default function TopBar({auth}) {

    // Get the current user
    const user = auth.user;
    
    // Show the default image url
    const defaultImageUrl = user.profile_picture ?? "https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80";

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
            <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
                <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
                />
                <Search className="search__icon dark:text-slate-500" />
            </div>
            <a className="notification sm:hidden" href="">
                <Search className="notification__icon dark:text-slate-500" />
            </a>
            <div className="search-result">
                <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                    <a href="" className="flex items-center">
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                        <Inbox className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Mail Settings</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                        <Users className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Users & Permissions</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                        <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Transactions Report</div>
                    </a>
                </div>
                <div className="search-result__content__title">Users</div>
                
                <div className="search-result__content__title">Products</div>
                
                </div>
            </div>
            </div>
            {/* END: Search  */}
            {/* BEGIN: Notifications */}
            <Dropdown className="intro-x mr-auto sm:mr-6">
                
                <DropdownToggle tag="div" role="button" className="notification cursor-pointer" >
                    <Bell className="notification__icon dark:text-slate-500" />
                </DropdownToggle>

                <DropdownMenu className="notification-content pt-2">
                    <DropdownContent tag="div" className="notification-content__box">
                        <div className="notification-content__title">Notifications</div>
                    </DropdownContent>
                </DropdownMenu>

            </Dropdown>
            {/* END: Notifications  */}
            
            
            {/* BEGIN: Account Menu */}
            <Dropdown className="intro-x w-8 h-8">
                <DropdownToggle
                    tag="div"
                    role="button"
                    className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                    
                    <img src={defaultImageUrl} />
            </DropdownToggle>
            <DropdownMenu className="w-56">
                    <DropdownContent className="bg-primary text-white">
                        {/* Header */}
                        <DropdownHeader tag="div" className="!font-normal">
                            
                            {/* Name and Surname */}
                            <div className="font-semibold py-2 text-zinc-200">
                                {`${user.title} ${user.name} ${user.surname}`}
                            </div>
                            {/* User Role */}
                            <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                                {`${auth.roles_obj[0] ?? "User"}`}
                            </div>
                        </DropdownHeader>
                        <DropdownDivider className="border-white/[0.08]" />
                        {/* Links */}
                        <Link href="/profile" className="cursor-pointer dropdown-item hover:bg-white/5">
                            <User className="w-4 h-4 mr-2" /> Profile
                        </Link>
                        <a href="/" className="cursor-pointer dropdown-item hover:bg-white/5">
                            <Home className="w-4 h-4 mr-2" /> Home
                        </a>
                        <DropdownItem className="hover:bg-white/5">
                            <HelpCircle className="w-4 h-4 mr-2" /> Help
                        </DropdownItem>
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
