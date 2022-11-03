
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Show(props){
console.log(props);

const { data, setData, put, post, processing, errors } = useForm({
});



const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
}

const handleApprove = (event) => {
    event.preventDefault();
    data.status = 'approved';
    put(route('restaurant.orders.status.update', props.order.id));
}

const handleDecline = (event) => {
    event.preventDefault();
    data.status = 'declined';
    put(route('restaurant.orders.status.update', props.order.id));
}

const sendPush = (event) => {
    event.preventDefault();
    post(route('restaurant.sendPush', props.order.id));
}

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
              <div className="px-5 pt-10 pb-5 sm:px-20 sm:py-20">
                <div className="text-primary font-semibold text-2xl">
                  View Order - {props.user.first_name} {props.user.last_name} -{" "}
                  {props.order.pickup_date} - {props.order.order_reference}
                </div>

                <div className="mt-10 flex justify-center sm:justify-start items-center">
                <h3 className="text-lg font-medium">
                    View Order
                </h3>
                {/* Print order */}
                <Button
                    className="btn btn-primary ml-8"
                    click={() => window.print()}
                >
                    Print
                </Button>
                </div>
                 {/* Show Success Validation Component */}
                 {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }
              </div>
              <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pt-0">
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
            <div className="px-5 sm:px-16 py-10 sm:py-10">
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
                      <th className="border-b-2 dark:border-darkmode-400 text-center whitespace-nowrap">
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
                        <td className="text-center border-b dark:border-darkmode-400 w-32">
                          {item.quantity}
                        </td>
                        <td className="text-right border-b dark:border-darkmode-400 w-32">
                          {item.item_price}
                        </td>
                      </tr>
                    ))}
                    {props.order.pickup_method === "delivery" && (
                    <tr>
                      <td className="dark:border-darkmode-400">
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
                    )}
                    <tr>
                      <td className="border-b dark:border-darkmode-400">
                        <div className="font-medium whitespace-nowrap text-primary">
                          Total:
                        </div>
                      </td>
                      <td className="text-right border-b dark:border-darkmode-400 w-32 text-primary">
                        {props.order_items.reduce(
                          (prev, curr, index, array) => prev + curr.quantity,
                          0
                        )}
                      </td>
                      <td className="text-center border-b dark:border-darkmode-400 w-32 text-primary">
                        {props.order.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Start: driver collection time and accept button */}
              {props.order.pickup_method === "delivery" && (
                <div>
                <form onSubmit={handleApprove}>

              <div className="flex flex-wrap gap-8 justify-between items-end p-10 sm:p-10">
                <div className="w-64 flex-1">
                  <h3 className="mb-3">Enter driver collection time*</h3>
                  <input
                    className="form-control border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-2 focus:ring-opacity-50 rounded-md shadow-sm"
                    type="time"
                    name="driver_collection_time"
                    min="00:00"
                    max="23:00"
                    onChange={(e) => {onHandleChange(e)}}

                  />
                </div>
                <Button className="btn btn-primary w-64 flex-1 py-3" type="submit" name="accept">
                  Accept and Complete
                </Button>
              </div>
                </form>
              {/* End: driver collection time and accept button */}
              {/* Start: decline button */}
              <form onSubmit={handleDecline}>
              <div className="flex justify-center">
                <button className="btn btn-secondary" type="submit" name="decline">Decline</button>
              </div>
              {/* End: decline button */}
                </form>
              </div>
                )}
              {/* Start: message to customer */}
              <div className="mt-3">
                <label>Message to customer</label>
                <div className="mt-2">
                  <textarea
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="message_to_customer"
                    type="text"
                    name="message_to_customer"
                    onChange={(e) => {onHandleChange(e)}}
                  />
                </div>
              </div>
              {/* End: message to customer */}
              {/* Start: send push notification */}
              <form className="flex justify-end mt-8" onSubmit={sendPush}>
                <Button className="btn btn-primary" type="submit">
                  Send push notification
                </Button>
              </form>
              {/* End: send push notification */}
            </div>
          </div>
          {/* END: Invoice */}
        </main>


            </Authenticated>
        </>
    )
}
