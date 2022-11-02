
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
                <main className="col-span-12 px-10">
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
                    <tr className="border-y-4 dark:border-darkmode-400 py-5">
                      <td className="border-b dark:border-darkmode-400">
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
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
              <div className="text-center sm:text-left mt-10 sm:mt-0">
                <div className="text-lg text-primary font-medium mt-2">
                  Total:
                </div>
              </div>

              <div className="text-center flex sm:text-right sm:ml-auto">
              <div className="text-lg text-primary font-medium mt-2 mr-5">
                  total quantity here
                </div>
                <div className="text-xl text-primary font-medium mt-2">
                  {props.order.price}
                </div>
              </div>
            </div>
          </div>
          {/* END: Invoice */}
        </main>

            </Authenticated>
        </>
    )
}
