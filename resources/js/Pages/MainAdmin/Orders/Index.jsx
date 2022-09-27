
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";


export default function Index(props){

    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
      })

    const from = props.orders.from;

    const to = props.orders.to;

    const total = props.orders.total;

    const first_page_url = props.orders.first_page_url;

    const last_page_url = props.orders.last_page_url;

    const links = props.orders.links;

    const [orders, setOrders] = useState(props.orders.data);

    const [showingDeleteModal, setShowingDeleteModal] = useState(false);

    const [currentSelectedOrder, setCurrentSelectedOrder] = useState(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('orders.index'), data);
    }

    const setDeleteConfirmationModal = (e) => {
        setDeleteModal(true);
        setDeleteId(e);
    }

    const deleteRecord = (e) => {

        Inertia.delete(route('orders.destroy',{id:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('orders.index'), {
            perPage: e.target.value,
            search: props.search
        });
    }


    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={1}
            >

                {/* Define Page Title */}
                <Head title="" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10"></h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">

                            {/* Link to create page */}
                            <Link href={route("order.create")} className="btn btn-primary shadow-md mr-2">
                                Add New 
                            </Link>

                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>

                            {/* Search Form */}
                            <form className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" onSubmit={submitSearch}>
                                <div className="w-56 relative text-slate-500">
                                    <input
                                        type="text"
                                        className="form-control w-56 box pr-10"
                                        placeholder="Search..."
                                        value={data.search}
                                        onChange={e => setData('search', e.target.value)}
                                    />
                                    <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                                </div>
                            </form>
                        </div>
                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">NAME</th>
                                <th className="text-left whitespace-nowrap">EMAIL</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { orders.map((order, key) => (

                                <tr key={key} className="intro-x">

                                    {/* User Info */}
                                    <td className="text-left">
                                            {order.property} {order.property}
                                    </td>

                                    {/* User email */}
                                    <td className="text-left">{order.property}</td>

                                    {/* Actions */}
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            {/* Edit Link */}
                                            <Link className="flex items-center mr-3" href={route("order.edit",{id:order.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    setDeleteConfirmationModal(e.target.id);
                                                }}
                                                id={order.id}
                                                className="flex items-center text-danger">
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Delete
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
                            <button type="button" onClick={deleteRecord} className="btn btn-danger w-24">Delete</button>
                        </div>
                        </ModalBody>
                    </Modal>
                    {/* END: Delete Confirmation Modal */}

                </main>

            </Authenticated>
        </>
    )
}
