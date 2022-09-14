import { Link, usePage } from "@inertiajs/inertia-react";
import { Edit2, Eye, MoreVertical, PlusSquare, Trash, Trash2 } from "lucide-react";
import { useState } from "react";

export default function MidoneMemberCategory(props){
    const [dropdown,setDropdown] = useState(false);
    const isAdmin = usePage().props.auth.isAdmin;
    const trimText = (text,length) => {

        var trimmedString = text.length > length ?
        text.substring(0, length - 3) + "..." :
        text

        return trimmedString;
    }
    return (
        <>
            <div key={props.id} className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box">

                {/* Actions */}
                <div className="flex items-center justify-end border-b border-slate-200/60 px-5 py-4">
                    
                    {/* Dropdown Container */}
                    <div className="dropdown ml-3">
                        {/* Toggle */}
                        <button onClick={e => setDropdown(!dropdown)} className="dropdown-toggle w-5 h-5 text-slate-500" aria-expanded="false" data-tw-toggle="dropdown">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                        {/* Action Links */}
                        {
                            dropdown &&
                            <div className="z-50 absolute w-40 show right-0">
                                <ul className=" rounded-md relative bg-white shadow-2xl p-2 w-full mt-5">
                                    
                                    {
                                        isAdmin  ?
                                        <>
                                            <li>
                                                <Link href={"/dashboard/admin/course-categories/edit/" + props.id} className="hover:bg-slate-200/60 font-bold flex items-center p-2 transition duration-300 ease-in-out rounded-md text-green-600">
                                                    <Eye lassName="w-4 h-4 mr-2 " />
                                                        Edit
                                                </Link>
                                            </li>
                                            <li>
                                                <Link as="button" method="DELETE" action={"/dashboard/admin/course-categories/delete/" + props.id} href={"/dashboard/admin/course-categories/delete/" + props.id} className="hover:bg-slate-200/60 font-bold flex items-center p-2 transition duration-300 ease-in-out rounded-md text-red-600">
                                                    <Trash2 lassName="w-4 h-4 mr-2 " />
                                                        Delete
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <li>
                                            <Link href={"/dashboard/categories/" + props.id} className="hover:bg-slate-200/60 font-bold flex items-center p-2 transition duration-300 ease-in-out rounded-md text-green-600">
                                                <Eye lassName="w-4 h-4 mr-2 " />
                                                View Courses
                                            </Link>
                                        </li>
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                {/* Main */}
                <div className="p-5">
                    {/* Cover Image */}
                    <div className="h-40 2xl:h-56 image-fit">
                        <img alt={props.name} className="rounded-md" src={props.coverImage} />
                    </div>
                    {/* Title */}
                    <span className="block font-medium text-base mt-5">
                        {props.name}
                    </span>
                    {/* Meta Description */}
                    <div className="text-slate-600 dark:text-slate-500 mt-2">
                        {trimText(props.description,100)}
                    </div>
                </div>

            </div>
        </>
    )
}