import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import OrderItSearch from "@/Components/OrderItSearch";


export default function Index(props){
    const { data, setData, get, processing, errors } = useForm({
        table_number: '',
        table_reference: '',
    })


    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);



    const setDeleteConfirmationModal = (e) => {
        // Prevent Default Behaviour
        e.preventDefault();
        // Set the current selected role to the role id
        setDeleteId(e.target.id);
        // Show the delete confirmation modal
        setDeleteModal(true);
    }

    const deleteRecord = (e) => {
        Inertia.delete(route('restaurant.tables.destroy',{tableNumber:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={13}
                activeItem={1}
            >

                {/* Define Page Title */}
                <Head title="Manage Tables" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Manage Tables
                        </h2>

                    </div>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} className="pt-3"/>
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">

                             {/* Link to create page */}
                             <Link href={route("restaurant.tables.create")} className="btn btn-primary shadow-md mr-2" style={{whiteSpace: "nowrap"}}>
                                  Add New tables
                             </Link>


                        </div>
                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">Table #</th>
                                <th className="text-left whitespace-nowrap">Reference</th>
                                <th className="text-center whitespace-nowrap">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            { props.tableNumbers.map((table, key) => (

                                <tr key={key} className="intro-x">

                                    {/* Name of table */}
                                    <td className="text-left">
                                            {table.table_number}
                                    </td>

                                    {/* Charge of table */}
                                    <td className="text-left">
                                        {table.table_reference}
                                    </td>


                                    {/* Actions */}
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            {/* Edit Link */}
                                            <Link className="flex items-center mr-3" href={route("restaurant.tables.edit",{id:table.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                className="flex items-center text-danger"
                                                type="button"
                                                onClick={setDeleteConfirmationModal}
                                                id={table.id}
                                            >
                                                <Trash2 id={table.id} className="w-4 h-4 mr-1" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        {/* END: Data List */}
                    </div>
                    {/* BEGIN: Delete Confirmation Modal */}
                    <Modal
                        show={deleteModal}
                        onHidden={() => {
                            setDeleteConfirmationModal(false);
                        }}
                        title="Delete Confirmation"
                    >
                        <ModalBody className="p-0">
                        <div className="p-5 text-center">
                            <XCircle
                            className="w-16 h-16 text-danger mx-auto mt-3"
                            />
                            <div className="text-3xl mt-5">Are you sure?</div>
                            <div className="text-slate-500 mt-2">
                            Do you really want to delete these records? <br />
                            This process cannot be undone.
                            </div>
                        </div>
                        <div className="px-5 pb-8 text-center">
                        <button
                            type="button"
                            data-dismiss="modal"
                            onClick={e => setDeleteModal(false)}
                            className="btn btn-outline-secondary w-24 mr-3">
                            Cancel
                        </button>
                            <button onClick={deleteRecord} type="button" className="btn btn-danger w-24">
                                Delete
                            </button>
                        </div>
                        </ModalBody>
                    </Modal>
                    {/* END: Delete Confirmation Modal */}

                </main>

            </Authenticated>
        </>
    )
}
