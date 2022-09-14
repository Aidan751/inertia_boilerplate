import ApplicationLogo from '@/Images/logo_sml.png';
import { Link ,usePage} from '@inertiajs/inertia-react';
import { Edit, Search, ToggleRight } from 'lucide-react';
import { useState } from 'react';


export default function TopBar(){
    const page = usePage().props;
    const [dropdown,setDropdown] = useState(false);
    console.log(page)
    return (
        <>
            <div className="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] -mt-7 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
                <div className="h-full flex items-center">
                    
                    {/* BEGIN: Logo */}
                    <Link href="" className="logo -intro-x hidden md:flex xl:w-[180px] block">
                        <img alt="South African Guild of Actors " className="logo__image h-10 w-auto" src={ApplicationLogo} />
                    </Link>
                    {/* END: Logo */}
                    
                    {/* BEGIN: Breadcrumb */}
                    <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
                        <ol className="breadcrumb breadcrumb-light">
                            <li className="breadcrumb-item">
                                <Link href="">Application</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Dashboard
                            </li>
                        </ol>
                    </nav>
                    {/* END: Breadcrumb */}
                    
                    {/* BEGIN: Search */}
                    <div className="intro-x relative mr-3 sm:mr-6">

                        {/* Search */}
                        <div className="search hidden sm:block">
                            <input type="text" className="search__input form-control border-transparent" placeholder="Search..." />
                            <Search className="search__icon" />
                        </div>
                    
                        <Link className="notification notification--light sm:hidden">
                            <Search className="notification__icon" />
                        </Link>
                    
                    <div className="search-result">
                        <div className="search-result__content">
                            
                            <div className="search-result__content__title">Pages</div>
                        <div className="mb-5">
                            <a href="" className="flex items-center">
                            <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="inbox" /> </div>
                            <div className="ml-3">Mail Settings</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="users" /> </div>
                            <div className="ml-3">Users &amp; Permissions</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="credit-card" /> </div>
                            <div className="ml-3">Facilitators</div>
                            </a>
                        </div>
                        <div className="search-result__content__title">Users</div>
                        <div className="mb-5">
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="South African Guild of Actors " className="rounded-full" src="/images/profile-2.jpg" />
                            </div>
                            <div className="ml-3">Al Pacino</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">alpacino@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="South African Guild of Actors " className="rounded-full" src="/images/profile-8.jpg" />
                            </div>
                            <div className="ml-3">Leonardo DiCaprio</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">leonardodicaprio@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="South African Guild of Actors " className="rounded-full" src="/images/profile-4.jpg" />
                            </div>
                            <div className="ml-3">Robert De Niro</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">robertdeniro@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="South African Guild of Actors " className="rounded-full" src="/images/profile-9.jpg" />
                            </div>
                            <div className="ml-3">Johnny Depp</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">johnnydepp@left4code.com</div>
                            </a>
                        </div>
                        <div className="search-result__content__title">Workshops</div>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                            <img alt="South African Guild of Actors " className="rounded-full" src="/images/preview-5.jpg" />
                            </div>
                            <div className="ml-3">John Doe - Workshop 1</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Workshop</div>
                        </a>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                            <img alt="South African Guild of Actors " className="rounded-full" src="/images/preview-5.jpg" />
                            </div>
                            <div className="ml-3">John Doe - Workshop 2</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Workshop</div>
                        </a>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                            <img alt="South African Guild of Actors " className="rounded-full" src="/images/preview-5.jpg" />
                            </div>
                            <div className="ml-3">John Doe - Workshop 3</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Workshop</div>
                        </a>
                        </div>
                    </div>
                    </div>
                    {/* END: Search */}
                    {/* BEGIN: Notifications */}
                    <div className="intro-x dropdown mr-4 sm:mr-6">
                    <div className="dropdown-toggle notification notification--bullet cursor-pointer" role="button" aria-expanded="false" data-tw-toggle="dropdown"> <i data-lucide="bell" className="notification__icon dark:text-slate-500" /> </div>
                    <div className="notification-content pt-2 dropdown-menu">
                        <div className="notification-content__box dropdown-content">
                        <div className="notification-content__title">Notifications</div>
                        <div className="cursor-pointer relative flex items-center ">
                            <div className="w-12 h-12 flex-none image-fit mr-1">
                            <img alt="South African Guild of Actors " className="rounded-full" src="/images/profile-2.jpg" />
                            <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white" />
                            </div>
                            <div className="ml-2 overflow-hidden">
                            <div className="flex items-center">
                                <a href="#" className="font-medium truncate mr-5">John Doe</a>
                                <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                            </div>
                            <div className="w-full truncate text-slate-500 mt-0.5">
                                Facilitator has completed a flawed invoice form, please contact him to fix this
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* END: Notifications */}
                    {/* BEGIN: Account Menu */}
                    <div className="intro-x dropdown w-8 h-8">
                    <div onClick={e => setDropdown(!dropdown)} className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <img alt="" src="/images/profile-4.jpg" />
                    </div>
                    {
                        dropdown &&
                        <div className=" w-56 absolute right-0">
                            <ul className="right-0 bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                            <li className="p-2">
                                <div className="font-medium">{page.auth.user.first_name} {page.auth.user.last_name}</div>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]" />
                            </li>
                            {/* <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <Edit data-lucide="user" className="w-4 h-4 mr-2" /> Profile </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="edit" className="w-4 h-4 mr-2" /> Add Account </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="lock" className="w-4 h-4 mr-2" /> Reset Password </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="help-circle" className="w-4 h-4 mr-2" /> Help </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]" />
                            </li> */}
                            <li>
                                <Link href={'/logout'} method="post" as="button" className=" font-bold flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-white/5">
                                    <ToggleRight data-lucide="toggle-right" className="w-4 h-4 mr-2" />
                                    Logout
                                </Link>
                            </li>
                            </ul>
                        </div>
                    }
                    
                    </div>
                    {/* END: Account Menu */}
                </div>
            </div>

        </>
    )
}