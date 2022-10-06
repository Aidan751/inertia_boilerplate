
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Index(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search
    })


    const from = props.offers.from;

    const to = props.offers.to;

    const total = props.offers.total;

    const first_page_url = props.offers.first_page_url;

    const last_page_url = props.offers.last_page_url;

    const links = props.offers.links;


    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('restaurant.offers.index'), data);
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
        Inertia.delete(route('restaurant.offers.destroy',{id:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.offers.index'), {
            perPage: e.target.value,
            search: props.search
        });
    }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={13}
                activeoffer={2}
            >

                {/* Define Page Title */}
                <Head title="List offers/news" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">List offers/news</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 offers-start sm:flex-nowrap mt-2">

                           {/* Link to create page */}
                            <Link href={route("restaurant.offers.create", {id: props.auth.user.restaurant_id})} className="btn btn-primary shadow-md mb-5" style={{whiteSpace: "nowrap"}}>
                                Add new offers/news
                            </Link>
                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>

                            {/* Search Form */}
                            <div className="w-56 text-slate-500 absolute right-0 top-0">
                            <form className="flex justify-end w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSearch}>
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
                                <th className="text-left whitespace-nowrap">TITLE</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { props.offers.data.map((offer, key) => (

                                <tr key={key} className="intro-x">

                                    {/* Menu offer Title */}
                                    <td className="text-left">
                                            {offer.title}
                                    </td>

                                     {/* Actions */}
                                     <td className="table-report__action w-56">
                                        <div className="flex justify-center offers-center">
                                            {/* Edit Link */}
                                            <Link className="flex offers-center mr-3" href={route("restaurant.offers.edit",{id:offer.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                className="flex offers-center text-danger"
                                                type="button"
                                                onClick={setDeleteConfirmationModal}
                                                id={offer.id}
                                            >
                                                <Trash2 id={offer.id} className="w-4 h-4 mr-1" /> Delete
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
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap offers-center">
                        <nav className="w-full sm:w-auto sm:mr-auto">
                            <ul className="pagination">
                                <li className="page-offer">
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
                                                        <li key={link.label} className="page-offer">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronLeft className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label == "Next &raquo;" &&
                                                        <li key={link.label} className="page-offer">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label != "&laquo; Previous" && link.label != "Next &raquo;" &&
                                                        <li key={link.label} className={ link.active == true ? "page-offer active" : "page-offer"
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




                                <li className="page-offer">
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
