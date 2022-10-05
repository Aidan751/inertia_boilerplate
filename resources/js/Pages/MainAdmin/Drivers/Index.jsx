import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Index(props){

    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
      })

    const from = props.drivers.from;

    const to = props.drivers.to;

    const total = props.drivers.total;

    const first_page_url = props.drivers.first_page_url;

    const last_page_url = props.drivers.last_page_url;

    const links = props.drivers.links;

    const [drivers, setDrivers] = useState(props.drivers.data);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // console.log(props);
    /**
     * Handle search form submission
     * @param {Event} e
     */
    const submitSearch = (e) => {
        e.preventDefault();

        get(route('admin-driver.index'), {
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

        Inertia.delete(route('admin-driver.destroy',{id:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }


    const paginate = (e) => {
        e.preventDefault();

        Inertia.get(route("admin-driver.index"), {
            perPage: e.target.value,
            search: props.search
        },);
    }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={5}
                activeItem={2}
            >

                {/* Define Page Title */}
                <Head title="Manage Drivers" />


                {/* Page Content */}
                <main className="col-span-12">
                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">Manage Drivers</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap items-center mt-2">

                            {/* Link to create page */}
                            <Link href={route("admin-driver.create")} className="btn btn-primary shadow-md" style={{width: "auto"}}>
                                Add New driver
                            </Link>

                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>
         {/* Search Form */}
         <div className="w-56 text-slate-500 absolute right-0 top-0">
                            <form className="flex justify-end w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0" onSubmit={submitSearch}>
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
                        </div>
                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">DRIVER NAME</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { drivers.map((driver, key) => (

                                <tr key={key} className="intro-x">

                                    {/* driver Info */}
                                    <td className="text-left">
                                            {driver.first_name} {driver.last_name}
                                    </td>

                                    {/* Actions */}
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            {/* start: View Orders Link */}
                                            <Link href={route("admin-driver.trips.index", driver.id)} className="flex items-center whitespace-nowrap mr-3">
                                               <Eye className="w-4 h-4 mr-1" />{" "}
                                                View Trips
                                            </Link>
                                            {/* end: View Orders Link */}
                                            {/* Edit Link */}
                                            <Link className="flex items-center mr-3" href={route("admin-driver.edit",{id:driver.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                className="flex items-center text-danger"
                                                type="button"
                                                onClick={setDeleteConfirmationModal}
                                                id={driver.id}
                                            >
                                                <Trash2 id={driver.id} className="w-4 h-4 mr-1" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                    {/* end: actions */}
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
                        onHidden={(e) => {
                        setDeleteModal(false);
                        }}
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
