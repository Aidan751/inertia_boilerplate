
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";


export default function Show(props){
console.log(props);
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


                <main className="col-span-12 px-5">
          {/* BEGIN: Invoice */}
          <div className="intro-y box overflow-hidden mt-5">
            <div className="border-b border-slate-200/60 dark:border-darkmode-400 text-center sm:text-left">
              <div className="px-5 py-10 sm:px-20 sm:py-20">
                <div className="text-primary font-semibold text-2xl">
                  View Order - {props.user.first_name} {props.user.last_name} -{" "}
                  {props.order.pickup_date} - {props.order.order_reference}
                </div>

                <div className="mt-3">View Order</div>
              </div>
              <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20">
                <div>
                  <div className="text-md font-medium text-slate-500 mb-5">
                    Customer Details
                  </div>
                  <div className="text-md font-medium">Name</div>
                  <div className="mt-1">{props.order.customer_name}</div>
                  <div className="text-md font-medium mt-2">Email Address</div>
                  <div className="mt-1">{props.customer.email}</div>
                  {props.order.pickup_method === "delivery" && (
                    <>
                      <div className="text-md font-medium mt-2">Address</div>
                      <div className="mt-1">{props.order.address}</div>
                    </>
                  )}

                  <div className="text-md font-medium mt-2">Contact Number</div>
                  <div className="mt-1">
                    {props.order.customer_contact_number}
                  </div>
                </div>

                <div className="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                  <br />
                  <div className="text-md font-medium mt-5">Type</div>
                  <div className="mt-1">{props.order.pickup_method}</div>
                  <div className="text-md font-medium mt-2">Time Slot</div>
                  <div className="mt-1">{props.order.time_slot}</div>
                  <div className="text-md font-medium mt-2">
                    Additional Notes
                  </div>
                  <div className="mt-1">
                    {props.order.additional_notes ?? "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 sm:px-16 py-10 sm:py-20">
              <div className="mt-0 mb-5 font-medium text-md pl-5">
                Order Details
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                        Item
                      </th>
                      <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                        Quantity
                      </th>
                      <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.order_items.map((item) => (
                      <tr>
                        <td className="border-b dark:border-darkmode-400">
                          <div className="font-medium whitespace-nowrap">
                            {item.title}
                          </div>
                        </td>
                        <td className="text-right border-b dark:border-darkmode-400 w-32">
                          {item.quantity}
                        </td>
                        <td className="text-right border-b dark:border-darkmode-400 w-32">
                          {item.item_price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="border-b border-x-4 dark:border-darkmode-400">
                        <div className="font-medium text-primary whitespace-nowrap">
                          Delivery
                        </div>
                      </td>
                      <td className="text-right border-b dark:border-darkmode-400 w-32">
                        {" "}
                      </td>
                      <td className="text-right text-primary border-b dark:border-darkmode-400 w-32">
                        {props.order.delivery_price}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b dark:border-darkmode-400">
                        <div className="font-medium whitespace-nowrap">
                          Total:
                        </div>
                      </td>
                      <td className="text-right border-b dark:border-darkmode-400 w-32">
                        {props.order_items.reduce(
                          (prev, curr, index, array) => prev + curr.quantity,
                          0
                        )}
                      </td>
                      <td className="text-right border-b dark:border-darkmode-400 w-32">
                        {props.order.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Start: driver collection time and accept button */}
              <div className="flex flex-wrap gap-6 justify-between items-end p-10 sm:p-10">
                <div className="w-64 flex-1">
                  <h3 className="mb-3">Enter driver collection time*</h3>
                  <input
                    className="w-full"
                    type="time"
                    min="00:00"
                    max="23:00"
                  />
                </div>
                <button className="btn btn-primary w-64 flex-1 py-3">
                  Accept and Complete
                </button>
              </div>
              {/* End: driver collection time and accept button */}
              {/* Start: decline button */}
              <div className="flex justify-center">
                <button className="btn btn-secondary">Decline</button>
              </div>
              {/* End: decline button */}
              {/* Start: message to customer */}
              <div className="mt-3">
                <label>Message to customer</label>
                <div className="mt-2">
                  <textarea
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="message_to_customer"
                    type="text"
                    name="message_to_customer"
                  />
                </div>
              </div>
              {/* End: message to customer */}
              {/* Start: send push notification */}
              <div className="flex justify-end mt-8">
                <button className="btn btn-primary">
                  Send push notification
                </button>
              </div>
              {/* End: send push notification */}
            </div>
          </div>
          {/* END: Invoice */}
        </main>


            </Authenticated>
        </>
    )
}
