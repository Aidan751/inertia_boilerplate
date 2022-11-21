
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import { TomSelect, ClassicEditor, Lucide, Tippy, Alert } from "@/base-components";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Details(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({

    })


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
                activeGroup={17}
                activeItem={1}
            >

                {/* Define Page Title */}
                <Head title="Order Details" />



            <main className="col-span-12 px-5">
      {/* BEGIN: Invoice */}
      <div className="intro-y box overflow-hidden mt-5">
        <div className="border-b border-slate-200/60 dark:border-darkmode-400 text-center sm:text-left">
          <div className="px-5 pt-10 pb-5 sm:px-20 sm:py-20">
            <div className="text-primary font-semibold text-2xl">
              View Order - {props.user.first_name} {props.user.last_name} -{" "}
              {props.order.pickup_date} - {props.order.order_reference}
            </div>
             {/* Show Success Validation Component */}
             {
                    props.success &&
                    <ValidationSuccess message={props.success} className="mt-3" />
                }

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
          </div>
          <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pt-0">
            <div>
              <div className="text-md font-medium text-slate-500 mb-5">
                Customer Details
              </div>
              <div className="text-md font-medium">Name</div>
              <div className="mt-1">{props.order.customer_name}</div>
              <div className="text-md font-medium mt-2">Email Address</div>
              <div className="mt-1">{props.customer && props.customer.email}</div>
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
                  <td className="text-center border-b dark:border-darkmode-400 w-32 text-primary">
                    {props.order_items.reduce(
                      (prev, curr, index, array) => prev + curr.quantity,
                      0
                    )}
                  </td>
                  <td className="text-right border-b dark:border-darkmode-400 w-32 text-primary">
                    {props.order.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* END: Invoice */}
    </main>



            </Authenticated>
        </>
    )
}
