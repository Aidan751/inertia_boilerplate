import { Link } from "@inertiajs/inertia-react";
import {useState} from "react";
import { CheckSquare, Edit2, Eye, Trash2 } from "lucide-react";
import DeleteModal from "../Modals/DeleteModal";
import { Inertia } from "@inertiajs/inertia";

export default function PageTable2Item(props){
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
        Inertia.delete("/admin/workshop/"+ props.workshop.id);
      }
    
    return (
        <>
            <tr className="intro-x">
                <td className="w-40">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <img className="tooltip rounded-full" src={"/images/placeholder.jpg"} />
                        </div>
                    </div>
                </td>
                <td>
                    <span className="font-medium block">{props.workshop.title}</span> 
                    <span className="text-slate-500 text-xs block mt-0.5">
                        {props.workshop.workshop_title}
                    </span>
                    <span className="text-slate-500 text-xs block mt-0.5">
                    {props.workshop.street}, {props.workshop.suburb}, {props.workshop.city}, {props.workshop.province}, South Africa, {props.workshop.postal_code}
                    </span>
                </td>
                <td class="">{props.workshop.workshop_date_time}</td>
                <td class="text-center">{props.workshop.totalAttendants}</td>
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        <Link href={"/admin/workshop/"+ props.workshop.id +"/attendance"} className="flex items-center mr-3 text-success">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                        </Link>
                        <Link href={"/admin/workshop/"+props.workshop.id} className="flex items-center mr-3 text-warning">
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