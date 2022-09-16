import DropdownLink from "@/Components/DropdownLink";
import { Link } from "@inertiajs/inertia-react";
import { Home} from "lucide-react";
export default function SideBar(props){
    
    // Links for Site Admin to access course categories
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
                    <DropdownLink groupTitle="Dashboard" links={linkArray} active={props.activeGroup == 0 ? true:false}>
                        <Home />
                    </DropdownLink>
                    
                </ul>
            </nav>
        </>
    )
}
