import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import OrderItSearch from "@/Components/OrderItSearch";
import Button from "@/Components/Button";


export default function Index(props){

    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
      })

    const from = props.extras.from;

    const to = props.extras.to;

    const total = props.extras.total;

    const first_page_url = props.extras.first_page_url;

    const last_page_url = props.extras.last_page_url;

    const links = props.extras.links;

    const [extras, setextras] = useState(props.extras.data);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    /**
     * Handle search form submission
     * @param {Event} e
     */
    const submitSearch = (e) => {
        e.preventDefault();

        get(route('restaurant.extras.index'), {
            preserveState: false,
            onSuccess: () => {
                // Do something...
            },
        })
    }

    const setDeleteConfirmationModal = (e) => {
        // Prevent Default Behaviour
        e.preventDefault();
        // Set the current selected role to the role id
        setDeleteId(e.target.id);
        // Show the delete confirmation modal
        setDeleteModal(true);
    }

    const deleteRecord = (e) => {
        Inertia.delete(route('restaurant.extras.destroy',{id:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }

    const paginate = (e) => {
        e.preventDefault();

        Inertia.get(route("restaurant.extras.index"), {
            perPage: e.target.value,
            search: props.search
        },);
    }


    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={10}
                activeItem={8}
            >

                {/* Define Page Title */}
                <Head title="Restaurant extras" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">Product Extras</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} className="pt-3"/>
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex justify-between flex-wrap sm:flex-nowrap items-center mt-2">

                             {/* Link to create page */}
                             <Link href={route("restaurant.extras.create")} className="btn btn-primary shadow-md mr-2" style={{whiteSpace: "nowrap"}}>
                                  Add New Extras
                             </Link>

                             <form className="flex justify-end w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0" onSubmit={submitSearch}>
                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>
                            <input
                            type="text"
                            className="search__input text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Search..."
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            />
                            <Button type="submit" className="ml-3">
                                Search
                            </Button>

                        </form>
                        </div>
                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">Extra</th>
                                <th className="text-left whitespace-nowrap">Charge</th>
                                <th className="text-center whitespace-nowrap">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { extras.map((extra, key) => (

                                <tr key={key} className="intro-x">

                                    {/* Name of extra */}
                                    <td className="text-left">
                                            {extra.name}
                                    </td>

                                    {/* Charge of extra */}
                                    <td className="text-left">
                                        {extra.additional_charge ?? "N/A"}
                                    </td>


                                    {/* Actions */}
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            {/* Edit Link */}
                                            <Link className="flex items-center mr-3" href={route("restaurant.extras.edit",{id:extra.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                className="flex items-center text-danger"
                                                type="button"
                                                onClick={setDeleteConfirmationModal}
                                                id={extra.id}
                                            >
                                                <Trash2 id={extra.id} className="w-4 h-4 mr-1" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        {/* END: Data List */}
                        {/* BEGIN: Pagination */}
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                        <nav className="w-full sm:w-auto sm:mr-auto">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link className="page-link" href={first_page_url}>
                                        <ChevronsLeft className="w-4 h-4" />
                                    </Link>
                                </li>
                                {
                                links &&
                                links.map(link => {
                                        return (
                                            <>
                                                {
                                                    link.label == "&laquo; Previous" &&
                                                        <li key={link.label} className="page-item">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronLeft className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label == "Next &raquo;" &&
                                                        <li key={link.label} className="page-item">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label != "&laquo; Previous" && link.label != "Next &raquo;" &&
                                                        <li key={link.label} className={ link.active == true ? "page-item active" : "page-item"
                                                    }>
                                                            <Link
                                                                className="page-link"
                                                                href={link.url}>
                                                                {link.label}
                                                            </Link>
                                                        </li>
                                                }
                                            </>
                                        )
                                            })
                                        }




                                <li className="page-item">
                                    <Link className="page-link" href={last_page_url}>
                                        <ChevronsRight className="w-4 h-4" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <select className="w-20 form-select box mt-3 sm:mt-0" onChange={paginate} value={data.perPage}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={35}>35</option>
                            <option value={50}>50</option>
                        </select>
                        </div>
                        {/* END: Pagination */}
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
