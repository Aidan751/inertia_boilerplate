
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
    console.log('hello');
    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
        status: props.status,
        to: props.to,
        from: props.from,
      })

    const from = props.orders.from;

    const to = props.orders.to;

    const total = props.orders.total;

    const first_page_url = props.orders.first_page_url;

    const last_page_url = props.orders.last_page_url;

    const links = props.orders.links;

    const [orders, setOrders] = useState(props.orders.data);

    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id:props.user.id}), data);
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id: props.user.id}), {
            perPage: e.target.value,
            search: props.search
        });
    }

    // handle status filter
    const handleStatusFilter = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
            status: e.target.value,
            from: data.from,
            to: data.to,
        });
    }


         // handle from change
          const handleFromChange = (e) => {
            e.preventDefault();
            Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
                    from: e.target.value,
                    to: data.to
                });
          }

          // handle to change
          const handleToChange = (e) => {
            e.preventDefault();
            Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
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
          const submitDateFilterForm = (e) => {
              e.preventDefault();
              get(route('restaurant.orders.index', {id: props.auth.user.id}), {
                  preserveState: false,
              });
          }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={7}
                activeItem={1}
            >

                {/* Define Page Title */}
                <Head title="View Orders" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="mt-10 text-lg font-medium intro-y">View Orders</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 intro-y">
                        <div className="flex flex-col sm:flex-row items-center">
                            <p className="text-sm mr-auto mt-10 mb-6">Filter By Date</p>
                        </div>
                    </div>
                    <div onSubmit={submitDateFilterForm} className="intro-y col-span-12 flex items-center justify-between flex-wrap mt-0">
                    {/* Start: filter by date */}
                        <div className="flex-2 mb-3">
                                <input
                                    type="date"
                                    className="px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="from"
                                    value={data.from}
                                    onChange={handleFromChange}
                                    style={{width: "35vw", height: "2.5rem"}}
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
                                    style={{width: "35vw", height: "2.5rem"}}
                                />
                    </div>
                    </div>

                    {/* filter orders by status 'pending', 'confirmed', 'driver-en-route', 'order-en-route', 'completed', 'cancelled' */}

                    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 intro-y">
                        <div className="flex flex-col sm:flex-row items-center">
                            <p className="text-sm mr-auto mt-6 mb-6">Filter By Status</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mt-0 sm:mt-0 sm:ml-auto md:ml-0"  style={{width: "35vw", height: "2.3rem"}}>
                        <select
                            className="px-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            onChange={handleStatusFilter}
                            value={data.status}
                            style={{width: "35vw", height: "2.3rem"}}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="driver-en-route">Driver En Route</option>
                            <option value="order-en-route">Order En Route</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="flex flex-wrap items-center col-span-12 mt-5 intro-y sm:flex-nowrap">

                            {/* Pagination Information */}
                            <div className="hidden mx-auto md:block text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>

                            {/* start: Search Form */}
                            <form className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSearch}>
                                <div className="w-56 relative text-slate-500">
                                    <div style={{width: '30vw', height: '2.5rem'}} className="flex justify-start">
                                        <input
                                        type="text"
                                        className="search__input text-sm text-gray-700 bitem rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        placeholder="Search..."
                                        value={data.search}
                                        onChange={e => setData('search', e.target.value)}
                                        style={{width: '30vw', height: '2.5rem'}}
                                        />
                                    <Button type="submit" className="search__button ml-3 flex items-center justify-center text-gray-700">
                                        Search
                                    </Button>
                                    </div>
                                </div>
                            </form>
                            {/* end: Search Form */}
                        </div>
                        {/* BEGIN: Data List */}
                        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
                        <table className="table -mt-2 table-report">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">CUSTOMER NAME</th>
                                <th className="text-left whitespace-nowrap">DATE/TIME</th>
                                <th className="text-left whitespace-nowrap">PRICE</th>
                                <th className="text-center whitespace-nowrap">METHOD</th>
                                <th className="text-left whitespace-nowrap">STATUS</th>
                                <th className="text-center whitespace-nowrap">ORDER ID</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { orders.map((order, key) => (

                                <tr key={key} className="intro-x">

                                    {/* Customer Name */}
                                    <td className="text-left">
                                            {order.customer_name}
                                    </td>

                                    {/* Date/Time */}
                                    <td className="text-left">{order.pickup_date} - {order.time_slot}</td>

                                    {/* Price */}
                                    <td className="text-left">{order.price}</td>

                                    {/* Method */}
                                    <td className="text-center">{order.order_method}</td>

                                    {/* Status */}
                                    <td className="text-left">{order.status}</td>

                                    {/* Order ID */}
                                    <td className="text-center">{order.id}</td>

                                    {/* Actions */}
                                    <td className="w-56 table-report__action">
                                        {/* start: View Orders Link */}
                                            <Link href={route("restaurant.orders.show", order.id)} className="flex items-center justify-center mr-3">
                                               <Eye className="w-4 h-4 mr-1" />{" "}
                                                View
                                            </Link>
                                        {/* end: View Orders Link */}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        {/* END: Data List */}
                        {/* BEGIN: Pagination */}
                        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
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
                        <select className="w-20 mt-3 form-select box sm:mt-0" onChange={paginate} value={data.perPage}>
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
