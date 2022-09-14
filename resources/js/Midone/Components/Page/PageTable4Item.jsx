import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

export default function PageTable4Item(props){
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
        Inertia.delete("/admin/organization/"+props.organization.id);

    }
    
    return (
        <>
            <tr className="intro-x">
                <td className="w-40">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <img alt={props.organization.name} className="tooltip rounded-full" src={props.organization.logo ?? "/images/placeholder.jpg"} title={props.organization.created} />
                        </div>
                    </div>
                </td>
                <td>
                    <span className="font-medium whitespace-nowrap block">{props.organization.name}</span> 
                    <span className="text-slate-500 text-xs block mt-0.5">
                        {props.organization.about}
                    </span>
                    
                    <span className="text-slate-500 text-xs block mt-0.5">
                    {props.organization.street}, {props.organization.suburb}, {props.organization.city}, {props.organization.province}, South Africa
                    </span>
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link href={"/admin/organization/edit/"+props.organization.id} className="flex items-center mr-3 text-warning">
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