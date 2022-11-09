
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye, Edit} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState, useCallback } from "react";
import { Inertia } from "@inertiajs/inertia";
import { TomSelect, ClassicEditor, Lucide, Tippy, Alert, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, TabPanel } from "@/base-components";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Index(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({

    })


    const [selectedItems, setSelectedItems] = useState(
        props.selected_items || []
      );

      const [showModal, setShowModal] = useState(false);
      const [activeObject, setActiveObject] = useState({});

      function getClass(index) {
        return index === activeObject?.id ? "active" : "inactive";
      }

      // const Modal = ({ object: { id, title, image, description, dietary_requirements, price } }) => (

        
      // );

      var extra_total = 0;
      var size_total = 0;
      var total_price = 0;

      let extra_price;

      // to input elements and record their values in state
      const handleNotesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...selectedItems];
        list[index].menu_item.notes = value;
        setSelectedItems(list);
      };

      //   select quantity of a menu item
      const onQuantityChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...selectedItems];
        list[index].menu_item.quantity = value;
        setSelectedItems(list);
      };

      const addMenuItem = (event, key, menu_item) => {
        let newSelectedItems = [...selectedItems];

        props.restaurant.menu.forEach((item) => {
          if (item.id === menu_item.id) {
            let newItem = {
              menu_item: {
                id: menu_item.id,
                menu_category_id: item.menu_category_id,
                restaurant_id: 1,
                title: menu_item.title,
                description: menu_item.description,
                dietary_requirements: menu_item.dietary_requirements,
                extras: item.extras,
                sizes: item.sizes,
                image: menu_item.image,
                price: menu_item.price,
                created_at: menu_item.created_at,
                updated_st: menu_item.updated_at,
                notes: "",
                quantity: 1
              },
              size: item.sizes,
              extra: item.extras
            };

            newSelectedItems.push(newItem);
          }
        });

        setSelectedItems(newSelectedItems);
      };

      if (selectedItems) {
        selectedItems &&
          selectedItems.forEach((item) => {
            let i = 0;
            if (item.extra) {
              while (i < item.extra.length) {
                extra_total += item.extra[i].additional_charge;
                i++;
              }
            }
          });

        selectedItems &&
          selectedItems.forEach((item) => {
            let i = 0;

            if (item.size) {
              while (i < item.size.length) {
                size_total += item.size[i].additional_charge;
                i++;
              }
            }
          });

        var i = 0;
        while (i < selectedItems.length) {
          total_price +=
            parseFloat(selectedItems[i].menu_item.price) *
            selectedItems[i].menu_item.quantity;
          i++;
        }
    }

    /**
     * Handle the change event for adding a new menu item using the modal
     * 
     * @param {Event} e 
     * @param {object} menuItemObject 
     * @returns void
     */
    const onHandleMenuItemAddition = (e,menuItemObject) => {
      e.preventDefault();
      setActiveObject(menuItemObject);
      setShowModal(true);
    }


      const submit = (e) => {
        e.preventDefault();
        data.selected_items = selectedItems;

        Inertia.post(route("call-centre.orders.place-order"), {
          selected_items: data.selected_items,
          customer: data.customer,
          restaurant: data.restaurant,
          delivery_address: data.delivery_address,
          delivery_time: data.delivery_time,
          delivery_date: data.delivery_date,
          payment_method: data.payment_method,
          order_type: data.order_type,
          order_status: data.order_status,
          order_notes: data.order_notes,
          total_price: total_price,
          size_total: size_total,
          extra_total: extra_total,
          order_total: total_price + size_total + extra_total
        });
      };

      const onHandleChange = (event) => {
        setData(
          event.target.name,
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
        );
      };

      const handleAddDeal = (e, id) => {
        e.preventDefault();
        // data.selected_items = selectedItems;
        Inertia.get(route("call-centre.orders.add.deal", { id: id }), {
          selected_items: JSON.stringify(selectedItems)
        });
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
                            <a
                              className="btn btn-primary mt-5 w-24"
                              onClick={(e) => handleAddDeal(e, deal.id)}
                            >
                              Add
                            </a>
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

                              {item.menu_items.map(({id, title, image, description, dietary_requirements, price}) => (
                                <div className="flex items-center justify-between flex-wrap mt-8 mb-8">
                                  <div className="w-72 flex-none">
                                    <div className="box rounded-md relative hover:zoom-in">
                                      <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                                        <div className="absolute top-0 left-0 w-full h-full image-fit">
                                          <img
                                            alt={title}
                                            className="rounded-md"
                                            src={image}
                                            data-action="zoom"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-5 flex-1">
                                    <div className="block font-medium text-base">
                                      {title}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-500 mt-2">
                                      {description}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-500 mt-2">
                                      Allergens:{" "}
                                      {dietary_requirements ??
                                        "N/A"}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-500 mt-2">
                                      Price: £ {price}
                                    </div>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      className="btn btn-primary mt-5 w-24"
                                      key={id}
                                      onClick={(e) => {
                                        onHandleMenuItemAddition(e,{ id:id,title: title,image: image,description: description, dietary_requirements: dietary_requirements, price: price });
                                      }}
                                    >
                                      Add
                                    </button>
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
                  <form onSubmit={submit}>
                    <h2 className="p-5 font-medium text-lg border rounded py-3">
                      Basket ({selectedItems ? selectedItems.length : 0})
                    </h2>
                    <TabPanel>
                <div className="box p-5 mt-5">
                  {selectedItems &&
                    selectedItems.map((item, key) => (
                      <div className="mb-5">
                        <a className="flex mb-5 items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                          <div className="max-w-[50%] font-medium text-lg truncate mr-1">
                            {item.menu_item.title}
                          </div>
                          <div className="text-slate-500">
                            x {item.menu_item.quantity || 1}
                          </div>
                          <Edit className="w-4 h-4 text-slate-500 ml-2" />
                          <div className="ml-auto font-medium text-lg">
                            £{" "}

                            {(parseFloat(item.menu_item.price) *
                              parseFloat(item.menu_item.quantity)) +
                              (item.extra
                                && item.extra.length > 0 ?
                                  item.extra.reduce(
                                    (a, b) =>{
                                        console.log(a.additional_charge + b.additional_charge);
                                      return a.additional_charge + b.additional_charge;
                            })
                                : 0) *
                                item.menu_item.quantity +
                              (item.size
                                ? item.size.length > 0 &&
                                 item.size[0].additional_charge *
                                    parseFloat(item.menu_item.quantity)
                                : 0)}
                          </div>
                        </a>
                        <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                          {item.size && "-"}
                          {item.size &&
                            item.size.length > 0 &&
                            item.size[0].size}
                        </div>

                        {item.extra &&
                          item.extra.map((extra, key) => (
                            <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                              - {extra.name}
                            </div>
                          ))}

                        <div className="flex justify-between mt-3 items-center w-full">
                          <p className="flex-1">Qty:</p>
                          <select
                            className="rounded"
                            onChange={(e) => onQuantityChange(e, key)}
                          >
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
                            onChange={(e) => handleNotesInputChange(e, key)}
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
                          (parseFloat(props.restaurant.service_charge) || 0) +
                          extra_total +
                          size_total}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-5">
                  <Button className="btn btn-primary w-full shadow-md ml-auto" type="submit">
                    Complete and send payment sms
                  </Button>
                  <button className="btn w-full mt-2 border-slate-300 dark:border-darkmode-400 text-slate-500">
                    Clear Items
                  </button>
                </div>
              </TabPanel>



                  </form>
                </div>
                {/* end: basket */}
              </div>
              {/* {showModal && activeObject &&
                <Modal className="active" id={activeObject.id}>
                  <ModalHeader>
                    <h2>{activeObject.title}</h2>
                  </ModalHeader>
                  <ModalBody>
                    <p>{activeObject.description}</p>
                    <p>{activeObject.dietary_requirements}</p>
                    <p>{activeObject.price}</p>
                  </ModalBody>
                  <ModalFooter>
                    <button onClick={() => setShowModal(false)}>Close me</button>
                  </ModalFooter>
                </Modal>
              } */}
              {/* BEGIN: New Order Modal */}
              <Modal
                show={showModal}
                onHidden={() => {
                  setShowModal(false);
                }}
              >
                <ModalHeader>
                  <h2 className="font-medium text-base mr-auto">
                    {activeObject.title ?? ""}
                  </h2>
                  <img src={activeObject.image ?? ""} alt={activeObject.title ?? ""} />
                </ModalHeader>
                <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
                  <div className="col-span-12">
                    <p>{activeObject.description ?? ""}</p>
                    <p>{activeObject.dietary_requirements ?? ""}</p>
                    <p>{activeObject.price ?? ""}</p>
                  </div>
                </ModalBody>
                <ModalFooter className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="btn btn-outline-secondary w-32 mr-1"
                  >
                    Cancel
                  </button>
                </ModalFooter>
              </Modal>
              {/* END: New Order Modal */}
            </div>

            

          </Authenticated>
        </>
      );
}
