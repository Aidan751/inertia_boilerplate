
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


    const [group_deals, set_group_deals] = useState([]);
    const [menu, set_menu] = useState([
      [
        {
          title: "Starter"
        },
        [
          {
            title: "snails",
            description: "snails",
            dietary_requirements: "n/a",
            price: 10
          }
        ]
      ]
    ]);
    const [new_items, set_new_items] = useState([
      {
        id: 1,
        title: "burger",
        price: 100,
        size: { detail: "Large", price: 14.56 },
        extras: [
          [
            {
              title: "mushroom",
              price: 14.2
            },
            {
              title: "cheese",
              price: 0
            }
          ]
        ],
        quantity: 1,
        notes: "allergies include nuts"
      },
      {
        id: 1,
        title: "burger",
        price: 100,
        size: { detail: "Large", price: 14.56 },
        extras: [
          [
            {
              title: "mushroom",
              price: 14.2
            },
            {
              title: "cheese",
              price: 15.7
            }
          ]
        ],
        quantity: 1,
        notes: "allergies include nuts"
      }
    ]);

    const [subtotal, setSubtotal] = useState();

    var extras_total;
    var size_total;
    var total_price;

    let new_item_arr = new_items.forEach((item) => {
      extras_total = item.extras[0].reduce((a, b) => a.price + b.price);
    });

    let extra_price;



    return (
      <>
        <Authenticated auth={props.auth} errors={props.errors} activeGroup={16}>
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
                  <Link
                    className="btn sm:col-span-1 col-span-5 row-span-1 order-2"
                    href={route('call-centre.orders.search', {id: props.auth.user.id})}
                  >
                    Return to search
                  </Link>

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
                  {props.restaurant.group_deals.length == 0 && (
                    <button className="btn">Choose a group deal</button>
                  )}
                  {props.restaurant.group_deals &&
                    props.restaurant.group_deals.map((deal, key) => (
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
                          <Link className="btn btn-primary" href={route('call-centre.orders.add.deal', {id: deal.id})}>
                                    Add
                         </Link>
                        </div>
                      </div>
                    ))}
                  {/* end: groupdeal box */}
                  {/* start: menu box */}
                  {props.restaurant.menu &&
                    props.restaurant.menu.map(
                      (item, key) =>
                        item.menu_items.length > 0 && (
                          <div
                            className="mt-5 pt-5 md:col-span-2 col-span-3 sm:row-span-1 row-start-2"
                            style={{ borderTop: "1px dashed grey" }}
                          >
                            <h2 className="pb-5 font-medium text-lg">
                              {item.title}
                            </h2>

                            {item.menu_items.map((menu_item, key) => (
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
                                    {menu_item.title}
                                  </h2>
                                  <p className="mt-5 mb-2">
                                    {menu_item.description}
                                  </p>
                                  <p className="mb-2">
                                    Allergens:{" "}
                                    {menu_item.dietary_requirements ?? "N/A"}
                                  </p>
                                  <p className="mb-4">
                                    Price: £ {menu_item.price}
                                  </p>
                                  <Link className="btn btn-primary" href={route('call-centre.orders.add.item', {id: menu_item.id})}>
                                    Add
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                    )}
                  {/* end: menu box */}
                </div>
              </div>
              {/* start: Basket */}
              <div className="sm:col-span-1 sm:row-span-3 col-span-3">
                <h2 className="p-5 font-medium text-lg border rounded py-3">
                  Basket ({new_items.length})
                </h2>
                <TabPanel>
                  <div className="box p-5 mt-5">
                    {new_items.map((item, key) => (
                      <div className="mb-5">
                        <a className="flex mb-5 items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                          <div className="max-w-[50%] font-medium text-lg truncate mr-1">
                            {item.title}
                          </div>
                          <div className="text-slate-500">x {item.quantity}</div>
                          <Edit className="w-4 h-4 text-slate-500 ml-2" />
                          <div className="ml-auto font-medium text-lg">
                            £{" "}
                            {item.quantity * (item.price + item.size.price) +
                              (extra_price = item.extras[0].reduce((a, b) => {
                                return a.price + b.price;
                              }))}
                          </div>
                        </a>
                        <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                          - {item.size.detail}
                        </div>

                        {item.extras[0].map((extra, key) => (
                          <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                            - {extra.title}
                          </div>
                        ))}

                        <div className="flex justify-between mt-3 items-center w-full">
                          <p className="flex-1">Qty:</p>
                          <select className="rounded">
                            <option value="1" selected>
                              1
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="mt-3">
                          <textarea
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="bio"
                            type="text"
                            name="notes"
                            placeholder="Notes here"
                            value={item.notes}
                            // onChange={}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="box p-5 mt-5">
                      <div className="flex">
                        <div className="mr-auto">Subtotal</div>
                        <div className="font-medium"> sub total here</div>
                      </div>
                      <div className="flex mt-4">
                        <div className="mr-auto">Delivery</div>
                        <div className="font-medium text-danger">
                          {props.restaurant.delivery_charge}
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="mr-auto">Service charge</div>
                        <div className="font-medium">
                          {props.restaurant.service_charge ?? 0}
                        </div>
                      </div>
                      <div className="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                        <div className="mr-auto font-medium text-base">
                          Total Charge
                        </div>
                        <div className="font-medium text-base">
                          {(size_total = new_items.reduce(
                            (a, b) => a.size.price + b.size.price
                          )) +
                            extras_total +
                            (total_price = new_items.reduce((a, b) => {
                              return a.price + b.price;
                            })) +
                            (props.restaurant.service_charge ?? 0) +
                            props.restaurant.delivery_charge}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-5">
                    <button className="btn btn-primary w-full shadow-md ml-auto">
                      Complete and send payment sms
                    </button>
                    <button className="btn w-full mt-2 border-slate-300 dark:border-darkmode-400 text-slate-500">
                      Clear Items
                    </button>
                  </div>
                </TabPanel>
              </div>
              {/* end: basket */}
            </div>
          </div>
        </Authenticated>
      </>
    );
}
