import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import {helper} from "@/utils/helper";
import Button from "@/Components/Button";


export default function Index(props){
console.log(props);
    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
        from: props.from,
        to: props.to,
      })


    const from = props.orders.from;

    const to = props.orders.to;

    const total = props.orders.total;

    const first_page_url = props.orders.first_page_url;

    const last_page_url = props.orders.last_page_url;

    const links = props.orders.links;

    const [orders, setOrders] = useState(props.orders.data);

        // handle from change
        const handleFromChange = (e) => {
            e.preventDefault();
            Inertia.get(route('admin-driver.trips.index', {id:props.driver.id}), {
                    from: e.target.value,
                    to: data.to
                });
          }

          // handle to change
          const handleToChange = (e) => {
            e.preventDefault();
            Inertia.get(route('admin-driver.trips.index', {id:props.driver.id}), {
                    from: data.from,
                    to: e.target.value
                });
          }

    /**
     * Handle search form submission
     * @param {Event} e
     * @returns
     * @memberof Index
     *  */
    const submitForm = (e) => {
        e.preventDefault();
        get(route('admin-driver.trips.index', {id: props.driver.id}), {
            preserveState: false,
        });
    }


    const paginate = (e) => {
        e.preventDefault();

        Inertia.get(route("admin-driver.trips.index", {id: props.driver.id}), {
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
                <Head title="View Trips" />
                {/* Page Content */}
                <main className="col-span-12">
                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">View Trips - {props.driver.first_name} {props.driver.last_name}</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }
                    <div className="grid grid-cols-12 gap-6 mt-5">
                            {/* title for filter by date */}
                            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 intro-y">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <p className="text-sm mr-auto mt-5 mb-0">Filter By Date</p>
                                </div>
                            </div>
                            <form onSubmit={submitForm} className="intro-y col-span-12 flex items-center justify-between flex-wrap mt-0">
                            {/* Start: filter by date */}
                                <div className="flex-2 mb-3">
                                        <input
                                            type="date"
                                            className="px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="from"
                                            value={data.from}
                                            onChange={handleFromChange}
                                            style={{width: "35vw", height: "2.3rem"}}
                                        />
                                </div>
                                <div className="mx-5 mb-3">
                                    to
                                </div>
                                <div className="flex-2 mb-3">
                                        <input
                                            type="date"
                                            className="px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="to"
                                            value={data.to}
                                            onChange={handleToChange}
                                            style={{width: "35vw", height: "2.3rem"}}
                                        />
                            </div>
                            </form>
                            {/* End: filter by date */}
                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>

                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">DATE</th>
                                <th className="text-left whitespace-nowrap">Restaurant Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            { orders.map((order, key) => (
                                <tr key={key} className="intro-x">
                                    <td className="text-left">
                                        {helper.formatDate(order.pickup_date, 'DD/MM/YYYY')}
                                    </td>

                                    {/* restaurant name */}
                                    <td className="text-left" style={{width: '60%'}}>
                                            {order.restaurant.name}
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
                </main>

            </Authenticated>
        </>
    )
}
