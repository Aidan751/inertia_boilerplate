import Authenticated from "@/Layouts/Authenticated";
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import React, {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Search, CheckSquare, ChevronRight, ChevronsRight, ChevronsLeft, XCircle, Trash2, ChevronLeft, Eye} from "lucide-react";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/base-components";

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

      /**
     * Handle search form submission
     * @param {Event} e
    */
       function handleSubmit(e) {
        e.preventDefault();

        get(route('admin-applications.index'), {
            preserveState: false,
            onSuccess: () => {
                // Do something...
            },
        })
    }


    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('admin-applications.index'), {
            perPage: e.target.value,
            search: props.search
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={4}
            activeItem={3}
        >

            <Head title="Restaurants" />

            <main className="col-span-12">
                {/* Page Header */}
                <h2 className="intro-y text-lg font-medium mt-10">
                    Manage Applications
                </h2>
                {/* Show Success Validation Component */}
                {
                    props.success && <ValidationSuccess message={props.success} />
                }

                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap items-center mt-2">

                        {/* Pagination Information */}
                        <div className="hidden md:block mx-auto text-gray-600">Showing {form} to {to} of {total} entries</div>

                        {/* Search Form */}
                        <form className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSubmit}>
                            <div className="w-56 text-slate-500 absolute left-0 top-0" style={{width: "20vw"}}>
                                <div className="search">
                                 <input
                                  type="text"
                                  className="search__input text-sm text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                                  placeholder="Search business by name"
                                  value={data.search}
                                  onChange={e => setData('search', e.target.value)}
                                  style={{width: "20vw", height: "2.7rem"}}
                                   />
                                   <Search className="search__icon dark:text-slate-500" />
                                 </div>
                            </div>
                           
                        </form>
                        </div>
                        {/* Begin: Data List*/}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible mt-4">
                            <table className="table table-report">
                                <thead>
                                    <tr>
                                        <th className="whitespace-no-wrap">BUSINESS NAME</th>
                                        <th className="whitespace-no-wrap text-center">ACTIONS</th>
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
                                                        <Link href={route('admin-applications.show', restaurant.id)} className="flex items-center mr-3">
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </Link>
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
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={35}>35</option>
                            <option value={50}>50</option>
                            </select>
                            {/* END: Pagination */}
                        </div>
                    </div>
            </main>
    </Authenticated>

    )
}
