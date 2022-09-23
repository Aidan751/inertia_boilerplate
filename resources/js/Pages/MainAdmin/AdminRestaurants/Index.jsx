import Authenticated from "@/Layouts/Authenticated";
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import React, {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Search, CheckSquare, ChevronRight, ChevronsRight, ChevronsLeft, XCircle, Trash2, ChevronLeft} from "lucide-react";
import { Modal, ModalBody } from "@/base-components";
import ValidationSuccess from "@/Components/ValidationSuccess";

export default function Index(props) {

    const {data, setData, get, processing, errors, reset, clearErrors} = useForm({
        perPage: props.perPage,
        search: props.search,
    });

    const form = props.restaurants.form;

    const to = props.restaurants.to;

    const total = props.restaurants.total;

    const first_page_url = props.restaurants.first_page_url;

    const last_page_url = props.restaurants.last_page_url;

    const links = props.restaurants.links;

    const [restaurants, setRestaurants] = useState(props.restaurants.data);

    const [showingDeleteModal, setShowingDeleteModal] = useState(false);

    const [currentSelectedRestaurant, setCurrentSelectedRestaurant] = useState(null);

    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('admin-restaurants.index'), data);
    }

    const setDeleteConfirmationModal = (e) => {
        setShowingDeleteModal(true);
        setCurrentSelectedRestaurant(e.target.dataset.id);
    }

    const deleteRestaurant = (e) => {
        Inertia.delete(route('admin-restaurants.destroy', currentSelectedRestaurant));
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('admin-restaurants.index'), {
            perPage: e.target.value,
            search: props.search
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={1}
            activeItem={1}
        >

            <Head title="Restaurants" />

            <main className="col-span-12">
                {/* Page Header */}
                <h2 className="intro-y text-lg font-medium mt-10">
                    Manage Businesses
                </h2>
                {/* Show Success Validation Component */}
                {
                    props.success && <ValidationSuccess message={props.success} />
                }

                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap items-center mt-2">
                        {/* Link to create page */}
                        <Link href={route('admin-restaurants.create')} className="btn btn-primary shadow-md mr-2">Add New Business</Link>

                        {/* Pagination Information */}
                        <div className="hidden md:block mx-auto text-gray-600">Showing {form} to {to} of {total} entries</div>

                        {/* Search Form */}
                        <form className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSearch}>
                            <div className="w-56 relative text-slate-500">
                                <input type="text" className="input w-56 box pr-10 placeholder-theme-13" placeholder="Search..." onChange={e => setData('search', e.target.value)} value={data.search} />
                                <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                            </div>
                        </form>
                        </div>
                        {/* Begin: Data List*/}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                            <table className="table table-report -mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-no-wrap">BUSINESS NAME</th>
                                        <th className="whitespace-no-wrap">ACTIONS</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        restaurants.map((restaurant, index) => (
                                            <tr key={index} className="intro-x">

                                                {/* Restaurant Info */}
                                                <td className="text-left">
                                                    {restaurant.name}
                                                </td>

                                                {/* Actions */}
                                                <td className="table-report__action w-56">
                                                    <div className="flex justify-center items-center">
                                                        {/* Edit Link */}
                                                        <Link href={route('admin-restaurants.edit', restaurant.id)} className="flex items-center mr-3">
                                                            <CheckSquare className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </Link>

                                                        {/* Delete Link */}
                                                        <button href="#" data-id={restaurant.id} onClick={setDeleteConfirmationModal} className="flex items-center text-theme-6">
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
                        {/* End: Data List*/}
                        {/* Begin: Pagination */}
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center">
                            <nav className="w-full sm:w-auto mt-3 sm:mt-0">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <Link href={first_page_url} className="page-link">
                                            <ChevronsLeft className="w-4 h-4" />
                                        </Link>
                                    </li>
                                    {
                                        links &&
                                        links.map(link => {
                                            return (
                                                <>
                                                    {link.label == "&laquo; Previous" &&
                                                        <li className="page-item" key={link.label}>
                                                            <Link href={link.url} className="page-link">
                                                                <ChevronLeft className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                    }
                                                    {link.label == "Next &raquo;" &&
                                                        <li className="page-item" key={link.label}>
                                                            <Link href={link.url} className="page-link">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                    }
                                                    {link.label != "&laquo; Previous" && link.label != "Next &raquo;" &&
                                                        <li className="page-item" key={link.label}>
                                                            <Link href={link.url} className="page-link">
                                                                {link.label}
                                                            </Link>
                                                        </li>
                                                    }
                                                </>

                                            )
                                    })

                                    }

                                    <li className="page-item">
                                        <Link href={last_page_url} className="page-link">
                                            <ChevronsRight className="w-4 h-4" />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <select className="w-20 input box mt-3 sm:mt-0" onChange={paginate} value={data.perPage}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            {/* END: Pagination */}
                        </div>
                        {/* BEGIN: Delete Confirmation Modal */}
                        <Modal
                            show={showingDeleteModal}
                            onHidden={() => {
                                setDeleteConfirmationModal(false);
                            }}
                            title="Delete Confirmation"
                        >

                        <ModalBody className="p-0">
                            <div className="p-5 text-center">
                            <XCircle className="w-16 h-16 text-theme-6 mx-auto mt-3" />
                            <div className="text-3xl mt-5">Are you sure?</div>
                            <div className="text-gray-600 mt-2">Do you really want to delete these records? This process cannot be undone.</div>
                            </div>
                            <div className="px-5 pb-8 text-center">
                            <button type="button" data-dismiss="modal" className="button w-24 border text-gray-700 mr-1" onClick={() => setShowingDeleteModal(false)}>Cancel</button>
                            <button type="button" className="button w-24 bg-theme-6 text-white" onClick={deleteRestaurant}>Delete</button>
                            </div>
                        </ModalBody>
                        </Modal>
                        {/* END: Delete Confirmation Modal */}
                    </div>
            </main>
    </Authenticated>

    )
}
