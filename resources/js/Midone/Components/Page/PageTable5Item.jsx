import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

export default function PageTable5Item(props){
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
        Inertia.delete("/admin/data-capturer/"+props.dataCapturer.id);

    }
    
    return (
        <>
            <tr className="intro-x">
                <td className="w-40">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <img alt={props.dataCapturer.name} className="tooltip rounded-full" src={props.dataCapturer.image ?? "/images/placeholder.jpg"} title={props.dataCapturer.created} />
                        </div>
                    </div>
                </td>
                <td>
                    <span className="font-medium whitespace-nowrap block">
                        {props.dataCapturer.first_name}, {props.dataCapturer.last_name}
                    </span> 
                    <span className="text-slate-500 text-xs block mt-0.5">
                        {props.dataCapturer.email}, {props.dataCapturer.phone}
                    </span>
                </td>
                <td>
                    <span className="font-medium whitespace-nowrap block">
                        {props.dataCapturer.name}
                    </span> 
                </td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link href={"/admin/data-capturer/edit/"+props.dataCapturer.id} className="flex items-center mr-3 text-warning">
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