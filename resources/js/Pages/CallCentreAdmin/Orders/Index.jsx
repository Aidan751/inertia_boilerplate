
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


    const [selectedItems, setSelectedItems] = useState(props.selected_items);


    var extra_total = 0;
    var size_total = 0;
    var total_price = 0;

    if (props.selected_items) {
      props.selected_items &&
        props.selected_items.forEach((item) => {
          let i = 0;
          while (i < item.extra.length) {
            extra_total += item.extra[i].additional_charge;
            i++;
          }
        });

      props.selected_items &&
        props.selected_items.forEach((item) => {
          let i = 0;
          while (i < item.size.length) {
            size_total += item.size[i].additional_charge;
            i++;
          }
        });

      var i = 0;
      while (i < props.selected_items.length) {
        total_price += parseFloat(props.selected_items[i].menu_item.price);
        i++;
      }
    }

    let extra_price;

    // to input elements and record their values in state
    const handleNotesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...notes];
        console.log(list[index]);
        return false;
        list[index].note = value;
        setNotes(list);
      };

    //   select quantity of a menu item
    const onQuantityChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...props.selected_items];
        list[index] = value;
        props.setSelectedItems(list);
        };


    return (
      <>
        <Authenticated auth={props.auth} errors={props.errors} activeGroup={16}>
          <div className="col-span-12">
            <h2 className="intro-y text-lg font-medium mt-5 mb-5">
              Order Details
            </h2>
            {/* start:intro */}
            <div className="grid grid-rows-3 grid-cols-3 gap-4">
              <div className="md:col-span-2 col-span-3 sm:row-span-1">
                <div className="mb-4 grid grid-cols-4 grid-rows-2 items-center sm:p-10">
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
                  <div className="flex items-center justify-between sm:p-10 flex-wrap">
                    <div className="w-72 flex-none">
                      <div className="box rounded-md relative zoom-in">
                        <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                          <div className="absolute top-0 left-0 w-full h-full image-fit">
                            <img
                              alt="Restaurant logo"
                              className="rounded-md"
                              src={props.restaurant.logo.img_url}
                              data-action="zoom"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-10 flex-1">
                      <div className="block font-medium text-base">
                        {props.restaurant.name}
                      </div>
                      <div className="text-slate-600 dark:text-slate-500 mt-2">
                        {props.restaurant.opening_hours_message}
                      </div>
                      <div className="text-slate-600 dark:text-slate-500 mt-2">
                        Delivery £{props.restaurant.delivery_charge}
                      </div>
                      <div className="text-slate-600 dark:text-slate-500 mt-2">
                        Delivery estimate{" "}
                        {props.restaurant.average_delivery_time - 10} -{" "}
                        {props.restaurant.average_delivery_time} Minutes
                      </div>
                    </div>
                  </div>
                </div>

                {/* end: restaurant box */}
                {/* start: groupdeal box */}
                <div className="mt-5 md:col-span-2 col-span-3 sm:row-span-1 row-start-2 border-t border-b">
                  <h2 className="font-medium text-lg mt-5 mb-5">Deals</h2>

                  {props.restaurant.group_deals &&
                    props.restaurant.group_deals.map((deal, key) => (
                      <div className="flex items-center justify-between flex-wrap mt-8 mb-8 sm:pl-10">
                        <div className="w-72 flex-none">
                          <div className="box rounded-md relative zoom-in">
                            <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                              <div className="absolute top-0 left-0 w-full h-full image-fit">
                                <img
                                  alt="Midone Tailwind HTML Admin Template"
                                  className="rounded-md"
                                  src="https://source.unsplash.com/random/?fruit"
                                  data-action="zoom"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex-1">
                          <div className="block font-medium text-base">
                            {deal.title}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                            {deal.description}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                            Allergens: {deal.dietary_requirements ?? "N/A"}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                            Price: £ {deal.group_deal_price}
                          </div>
                          <Link
                            className="btn btn-primary mt-5 w-24"
                            method="get"
                            href={route('call-centre.orders.add.deal', {id: deal.id})}
                          >
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
                          <div className="sm:p-10 md:col-span-2 col-span-3 sm:row-span-1 row-start-2 border-b border-t">
                            <h2 className="font-medium text-lg mb-5 mt-5">
                              {item.title}
                            </h2>

                            {item.menu_items.map((menu_item, key) => (
                              <div className="flex items-center justify-between flex-wrap mt-8 mb-8">
                                <div className="w-72 flex-none">
                                  <div className="box rounded-md relative hover:zoom-in">
                                    <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                                      <div className="absolute top-0 left-0 w-full h-full image-fit">
                                        <img
                                          alt={menu_item.title}
                                          className="rounded-md"
                                          src={menu_item.image}
                                          data-action="zoom"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-5 flex-1">
                                  <div className="block font-medium text-base">
                                    {item.menu_items[0].title}
                                  </div>
                                  <div className="text-slate-600 dark:text-slate-500 mt-2">
                                    {item.menu_items[0].description}
                                  </div>
                                  <div className="text-slate-600 dark:text-slate-500 mt-2">
                                    Allergens:{" "}
                                    {item.menu_items[0].dietary_requirements ??
                                      "N/A"}
                                  </div>
                                  <div className="text-slate-600 dark:text-slate-500 mt-2">
                                    Price: £ {item.menu_items[0].price}
                                  </div>
                                  <Link
                                    className="btn btn-primary mt-5 w-24"
                                    method="get"
                                     href={route('call-centre.orders.add.deal', {id: item.menu_items[0].id})}
                                  >
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
                  Basket ({props.selected_items ? props.selected_items.length : 0}
                  )
                </h2>
                <TabPanel>
                  <div className="box p-5 mt-5">
                    {props.selected_items &&
                      props.selected_items.map((item, key) => (
                        <div className="mb-5">
                          <a className="flex mb-5 items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                            <div className="max-w-[50%] font-medium text-lg truncate mr-1">
                              {item.menu_item.title}
                            </div>
                            <div className="text-slate-500">
                              x {(item.quantity = 1)}
                            </div>
                            <Edit className="w-4 h-4 text-slate-500 ml-2" />
                            <div className="ml-auto font-medium text-lg">
                              £{" "}
                              {console.log(item.extra)}
                              {parseFloat(item.menu_item.price) * item.quantity +
                                (item.extra.length > 0 && item.extra.reduce(
                                  (a, b) =>
                                    a.additional_charge + b.additional_charge
                                )) +
                                (item.size.length > 0 && item.size[0].additional_charge)}
                            </div>
                          </a>
                          <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                            - {item.size.length > 0 && item.size[0].size}
                          </div>

                          {item.extra &&
                            item.extra.map((extra, key) => (
                              <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                                - {extra.name}
                              </div>
                            ))}

                          <div className="flex justify-between mt-3 items-center w-full">
                            <p className="flex-1">Qty:</p>
                            <select className="rounded" onChange={onQuantityChange}>
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
                              value={notes[key]}
                              onChange={(e) =>
                                handleNotesInputChange(e, key)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    <div className="box p-5 mt-5">
                      <div className="flex">
                        <div className="mr-auto">Subtotal</div>
                        <div className="font-medium">{total_price}</div>
                      </div>
                      <div className="flex mt-4">
                        <div className="mr-auto">Delivery</div>
                        <div className="font-medium text-danger">
                          {props.restaurant.delivery_charge ?? 0}
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
                          £
                          {total_price +
                            (props.restaurant.delivery_charge || 0) +
                            (props.restaurant.service_charge || 0) +
                            extra_total +
                            size_total}
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
