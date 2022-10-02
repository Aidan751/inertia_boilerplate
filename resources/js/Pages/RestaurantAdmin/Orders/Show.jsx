
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";


export default function Show(props){

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={2}
            >

                {/* Define Page Title */}
                <Head title="View Order" />


                {/* Page Content */}
                <main className="col-span-12 px-10">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">View Order - {props.user.first_name} {props.user.last_name} - {props.order.pickup_date} - {props.order.order_reference}</h2>

                    {/* BEGIN: Display Customer Details */}
                    <div className="intro-y box mt-5">
                        <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                            <h2 className="font-medium text-base mr-auto">Customer Details</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                <div className="flex flex-col sm:flex-row">
                                    <label className="sm:w-40 sm:flex-shrink-0 sm:flex-grow-0">Name</label>
                                    <div className="sm:ml-6">
                                        <div className="font-medium text-base">{props.order.customer_name}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row mt-3">
                                    <label className="sm:w-40 sm:flex-shrink-0 sm:flex-grow-0">Contact Number</label>
                                    <div className="sm:ml-6">
                                        <div className="font-medium text-base">{props.order.customer_contact_number}</div>
                                </div>
                                </div>
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                <div className="flex flex-col sm:flex-row">
                                    <label className="sm:w-40 sm:flex-shrink-0 sm:flex-grow-0">Type</label>
                                    <div className="sm:ml-6">
                                        <div className="font-medium text-base">{props.order.pickup_method}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row mt-3">
                                    <label className="sm:w-40 sm:flex-shrink-0 sm:flex-grow-0">Time Slot</label>
                                    <div className="sm:ml-6">
                                        <div className="font-medium text-base">{props.order.time_slot}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row mt-3">
                                    <label className="sm:w-40 sm:flex-shrink-0 sm:flex-grow-0">Additional Notes</label>
                                    <div className="sm:ml-6">
                                        <div className="font-medium text-base">{props.order.additional_notes ?? 'N/A'}</div>
                                    </div>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                    {/* END: Display Customer Details */}
                    {/* BEGIN: Display Order Details */}
                    <div className="intro-y box mt-5">
                        <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                            <h2 className="font-medium text-base mr-auto">Order Details</h2>
                        </div>
                        <table className="table table-report mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-no-wrap">ITEM</th>
                                    <th className="whitespace-no-wrap">QUANTITY</th>
                                    <th className="whitespace-no-wrap">PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.order_items.map((item) => (
                                    <tr className="intro-x" key={item.id}>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>
                                            {item.item_price}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                  </table>

                 </div>
                </main>

            </Authenticated>
        </>
    )
}
