import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

export default function PageTable1Item(props){
    // This data can take a while to load
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);
    function closeDeleteModal() {
        setIsDeleteOpen(false)
    }

    function openDeleteModal() {
        setIsDeleteOpen(true)
    }

    function deleteRecord(){
        setIsDeleteOpen(false)
        Inertia.delete("/admin/facilitators/"+props.id);

    }
    
    return (
        <>
            <tr className="intro-x">
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
                    <span className="text-slate-500 text-xs whitespace-nowrap block mt-0.5">
                        {props.province}, South Africa
                    </span>
                </td>
                <td class="">{props.provider}</td>
                <td class="text-center">{props.attendants}</td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link href={props.group ? "/admin/workshop-group/view/"+ props.group : ""} className="flex items-center mr-3 text-success">
                            <Eye className="w-4 h-4 mr-1" />
                            Workshops
                        </Link>
                        <Link href={"/admin/facilitators/"+props.id} className="flex items-center mr-3 text-warning">
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </Link>
                        <button onClick={openDeleteModal} className="flex items-center mr-3 text-danger">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
            <DeleteModal isOpen={isDeleteOpen} closeModal={closeDeleteModal} openModal={openDeleteModal} action={deleteRecord} />

        </>
    )
}