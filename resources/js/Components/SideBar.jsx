import NavDropdown from '@/Midone/Components/NavDropdown';
import NavItem from '@/Midone/Components/NavItem';
import { usePage } from '@inertiajs/inertia-react';
import { Activity, BarChart2, Home, ChevronDown, Edit, Users, Inbox, HardDrive, MessageSquare, Calendar, Archive, GraduationCap, Columns } from 'lucide-react';
import { useState } from 'react';

const adminUsersLinks = [
    {
        href: "/dashboard/admin/users",
        title: "Overview"
    },
    {
        href: "/dashboard/admin/user/create",
        title: "Add User"
    },
]

const memberUsersLinks = [
    {
        href: "/dashboard/member/users",
        title: "Overview"
    },
    {
        href: "/dashboard/member/user/create",
        title: "Add User"
    },
]

const customerUsersLinks = [
    {
        href: "/dashboard/customer/users",
        title: "Overview"
    },
    {
        href: "/dashboard/customer/user/create",
        title: "Add User"
    },
]

const adminCourseCategoryLinks = [
    {
        href: "/dashboard/admin/course-categories",
        title: "Overview"
    },
    {
        href: "/dashboard/admin/course-categories/create",
        title: "Create Category"
    }
]

const courseManagementLinks = [
    {
        href: "/dashboard/admin/courses",
        title: "Overview"
    },
    {
        href: "/dashboard/admin/courses/create",
        title: "Create Course"
    },
]


export default function SideBar(){


    // TODO Add Course Category from db
    const [isAdmin,setIsAdmin] = useState(usePage().props.auth.isAdmin ?? false);
    const [isMember,setIsMember] = useState(usePage().props.auth.isMember ?? false);
    
    const [dropdown,setDropdown] = useState(false);
    
    console.log(isAdmin)
    return (
        <>
            <nav className="side-nav">
                <ul>

                    {/* Home Dashboard */}
                    <NavItem href="/dashboard" title="Dashboard" active={true}>
                        <Home />
                    </NavItem>
                    
                    {
                        isAdmin  &&
                            <NavDropdown title="Admin Users" links={adminUsersLinks}>
                                <Users />
                            </NavDropdown>
                    }
                    
                    {
                        isAdmin  &&
                        <>
                            {/* Members */}
                            <NavDropdown title="Members" links={memberUsersLinks}>
                                <Users />
                            </NavDropdown>
                        </>
                    }

                    {
                        isAdmin  &&
                        <>
                            {/* Users */}
                            <NavDropdown title="Non Members" links={customerUsersLinks}>
                                <Users />
                            </NavDropdown>
                        </>
                    }
                    
                    {
                        isAdmin  &&
                        <>
                            {/* Course Groups */}
                            <NavDropdown title="Course Categories" links={adminCourseCategoryLinks}>
                                <GraduationCap />
                            </NavDropdown>
                        </>
                    }

                    {
                        isAdmin  &&
                            <NavDropdown title="Courses" links={courseManagementLinks}>
                                <GraduationCap />
                            </NavDropdown>
                    }
                    {
                        isMember && 
                            <NavItem href="/dashboard/categories" title="Categories" active={false}>
                                <Columns />
                            </NavItem>
                    }
                    
                    
                    

                    
                </ul>
            </nav>

        </>
    )
}