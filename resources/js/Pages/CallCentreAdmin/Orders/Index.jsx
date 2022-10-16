
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye, Edit} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import { TomSelect, ClassicEditor, Lucide, Tippy, Alert, TabPanel } from "@/base-components";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Index(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({

    })

    const [group_deals, set_group_deals] = useState([])
    const [menu, set_menu] = useState([
        [{
            title: 'Starter',
        },
        [{
            title: 'snails',
            description: 'snails',
            dietary_requirements: 'n/a',
            price: 10,
        }]
    ]
    ]);
    const[new_items, set_new_items] = useState([
        {
            id: 1,
            name: 'item 1',
            price: 100,
            quantity: 1,
        }
    ]);

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
                activeGroup={16}
            >

                {/* Define Page Title */}
                <Head title="Order Details" />


                <div className="col-span-12">
        <h2 className="intro-y text-lg font-medium mt-10 mb-4">
          Order Details
        </h2>
        {/* start:intro */}
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
          <div className="md:col-span-2 col-span-3 sm:row-span-1">
            <div className="mb-4 grid grid-cols-4 grid-rows-2 items-center">
              {/* start:intro */}
              <p className="sm:text-start sm:col-span-3 mb-2 text-start col-span-5 px-1 order-1">
                {props.restaurant.time_slot ?? "ASAP"}{" "}
                <span className="d-inline-block mr-2 ml-2">{">"}</span>{" "}
                {props.restaurant.delivery_address}
              </p>
              <p className="col-span-3 mb-2 row-span-1 px-1 order-3">
                {props.restaurant.chosen_order_type.toUpperCase()}
              </p>
              <button
                className="btn sm:col-span-1 col-span-5 row-span-1 order-2"
                href="#"
              >
                Return to search
              </button>

              {/* end:intro */}
            </div>

            {/* start: restaurant box */}
            <div>
              <div className="md:col-span-2 col-span-3 sm:row-span-1 row-span-2">
                <div className="box flex flex-wrap">
                  <div className="p-5 flex-1">
                    <div className="h-56 2xl:w-72 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                      <img
                        alt="Midone - HTML Admin Template"
                        className="rounded-md w-full"
                        src={props.restaurant.banner}
                      />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex items-start justify-center flex-col">
                    <h2 className="font-medium text-lg">
                      {props.restaurant.name}
                    </h2>
                    <p className="mt-5 mb-2">
                      {props.restaurant.opening_hours_message}
                    </p>
                    <p className="mb-2">
                      Delivery £{props.restaurant.delivery_charge}
                    </p>
                    <p>
                      Delivery estimate{" "}
                      {props.restaurant.average_delivery_time - 10} -{" "}
                      {props.restaurant.average_delivery_time} Minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* end: restaurant box */}
            {/* start: groupdeal box */}
            <div
              className="mt-5 pt-5 pb-5 md:col-span-2 col-span-3 sm:row-span-1 row-start-2"
              style={{
                borderTop: "1px dashed grey",
                borderBottom: "1px dashed grey"
              }}
            >
              <h2 className="font-medium text-lg pb-5">Deals</h2>
              {group_deals.length == 0 && (
                <button className="btn">Choose a group deal</button>
              )}
              {group_deals &&
                group_deals.map((deal, key) => (
                  <div className="box flex flex-wrap mb-4">
                    <div className="p-5 flex-1">
                      <div className="h-56 2xl:w-72 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                        <img
                          alt="Midone - HTML Admin Template"
                          className="rounded-md w-full"
                          src="https://source.unsplash.com/random/900×700/?fruit"
                        />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex items-start justify-center flex-col">
                      <h2 className="font-medium text-lg">{deal.title}</h2>
                      <p className="mt-5 mb-2">{deal.description}</p>
                      <p className="mb-2">
                        Allergens: {deal.allergies ?? "N/A"}
                      </p>
                      <p className="mb-2">Price: £ {deal.group_deal_price}</p>
                      <button type="button" className="btn">
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              {/* end: groupdeal box */}
              {/* start: menu box */}
              {menu &&
                menu.map((menu_item, key) => (
                  <div
                    className="mt-5 pt-5 md:col-span-2 col-span-3 sm:row-span-1 row-start-2"
                    style={{ borderTop: "1px dashed grey" }}
                  >
                    {console.log(menu_item)}
                    <h2 className="pb-5 font-medium text-lg">{menu_item[0].title}</h2>
                    {menu_item[1].length === 0 && (
                      <button className="btn">Choose a menu item</button>
                    )}
                    {menu_item[1] &&
                      menu_item[1].map((item, key) => (
                        <div className="box flex flex-wrap mb-4">
                          <div className="p-5 flex-1">
                            <div className="h-56 2xl:w-72 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                              <img
                                alt="Midone - HTML Admin Template"
                                className="rounded-md w-full"
                                src="https://source.unsplash.com/random/900×700/?fruit"
                              />
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex items-start justify-center flex-col">
                            <h2 className="font-medium text-lg">
                              {item.title}
                            </h2>
                            <p className="mt-5 mb-2">{item.description}</p>
                            <p className="mb-2">
                              Allergens: {item.dietary_requirements ?? "N/A"}
                            </p>
                            <p className="mb-4">Price: £ {item.price}</p>
                            <button type="button" className="btn">
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              {/* end: menu box */}
            </div>
          </div>
          {/* start: Basket */}
          <div className="sm:col-span-1 sm:row-span-3 col-span-3">
            <h2 className="pl-5 font-medium text-lg bg-slate-300 border rounded py-3">
              Basket ({new_items.length})
            </h2>
            <TabPanel>
              <div className="box p-2 mt-5">
                {new_items.map((item, key) => (
                  <div>
                    <a className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                      <div className="max-w-[50%] truncate mr-1">
                        {item.title}
                      </div>
                      <div className="text-slate-500">x 1</div>
                      <Edit className="w-4 h-4 text-slate-500 ml-2" />
                      <div className="ml-auto font-medium">
                        £ {item.price * item.quantity}
                      </div>
                    </a>
                    <div className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                      selected
                    </div>
                  </div>
                ))}
              </div>
              <div className="box flex p-5 mt-5">
                <input
                  type="text"
                  className="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                  placeholder="Use coupon code..."
                />
                <button className="btn btn-primary ml-2">Apply</button>
              </div>
              <div className="box p-5 mt-5">
                <div className="flex">
                  <div className="mr-auto">Subtotal</div>
                  <div className="font-medium">$250</div>
                </div>
                <div className="flex mt-4">
                  <div className="mr-auto">Discount</div>
                  <div className="font-medium text-danger">-$20</div>
                </div>
                <div className="flex mt-4">
                  <div className="mr-auto">Tax</div>
                  <div className="font-medium">15%</div>
                </div>
                <div className="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="mr-auto font-medium text-base">
                    Total Charge
                  </div>
                  <div className="font-medium text-base">$220</div>
                </div>
              </div>
              <div className="flex mt-5">
                <button className="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500">
                  Clear Items
                </button>
                <button className="btn btn-primary w-32 shadow-md ml-auto">
                  Charge
                </button>
              </div>
            </TabPanel>
          </div>
          {/* end: basket */}
        </div>
      </div>

            </Authenticated>
        </>
    )
}
