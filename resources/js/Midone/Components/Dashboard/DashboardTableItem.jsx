import { Link } from "@inertiajs/inertia-react";
import { CheckSquare } from "lucide-react";

export default function DashboardTableItem(props){
    // This data can take a while to load
    return (
        <>
            <tr className="intro-x shadow-custom">
                <td className="w-40">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <img alt={props.name} className="tooltip rounded-full" src={props.image ?? "/images/placeholder.jpg"} title={props.created} />
                        </div>
                    </div>
                </td>
                <td>
                    <span className="font-medium whitespace-nowrap block">{props.name}</span> 
                    <a href={"mailto:" + props.email} className="text-slate-500 text-xs whitespace-nowrap block mt-0.5">
                        {props.email}
                    </a>
                    <a href={"tel:" + props.phone} className="text-slate-500 text-xs whitespace-nowrap block mt-0.5">
                        {props.phone}
                    </a>
                </td>
                <td class="text-center">{props.attendants}</td>
                <td className="w-40">
                    <div className="flex items-center justify-center text-success">
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Active
                    </div>
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link href={"/admin/workshop/"+ props.id +"/attendance"} className="flex items-center mr-3 text-success">
                            <CheckSquare className="w-4 h-4 mr-1" />
                            View
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}