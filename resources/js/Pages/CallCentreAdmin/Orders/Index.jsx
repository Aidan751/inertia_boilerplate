
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import {  Edit} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import {  Modal, ModalHeader, ModalBody, ModalFooter, TabPanel,Notification } from "@/base-components";
import Button from "@/Components/Button";


export default function Index(props){
    // Basic non sticky notification
    const basicNonStickyNotification = useRef();

    const basicNonStickyNotificationToggle = () => {
      // Show notification
      basicNonStickyNotification.current.showToast();
    };

    const { data, setData, get, processing, errors } = useForm({

    })

    const [selectedItems, setSelectedItems] = useState(
        props.selected_items || []
      );
      const [selectedDealItems,setSelectedDealItems] = useState([]);

      var total_deal_extra_cost_arr = [];
      var total_deal_size_cost_arr = [];
      var total_deal_item_cost_arr = [];
      var total_deal_item_cost;
      var total_deal_size_cost;
      var total_deal_extra_cost;
      var grand_total_for_deals;

      selectedDealItems.length > 0 && selectedDealItems.forEach((item) => {
        item.quantity = 1;
        total_deal_item_cost_arr.push(item.group_deal_price);
        item.group_deal_items.forEach((dealItem) => {
          let total_deal_extra_cost = dealItem.group_deal_single_items[0].menu_item.extras.reduce(
            (prev, curr, index, array) => prev + parseFloat(curr.additional_charge),
            0
          );

          total_deal_extra_cost_arr.push(total_deal_extra_cost);

          dealItem.group_deal_single_items[0].menu_item.sizes = [
            dealItem.group_deal_single_items[0].menu_item.sizes
          ];

          let total_deal_size_cost = dealItem.group_deal_single_items[0].menu_item.sizes.reduce(
            (prev, curr, index, array) => prev + parseFloat(curr.additional_charge),
            0
          );

          total_deal_size_cost_arr.push(total_deal_size_cost);
        });
      });

      total_deal_extra_cost =  total_deal_extra_cost_arr.reduce(
        (prev, curr, index, array) => prev + parseFloat(curr),
        0
      );
      total_deal_size_cost = total_deal_size_cost_arr.reduce(
        (prev, curr, index, array) => prev + parseFloat(curr),
        0
      );
      total_deal_item_cost = total_deal_item_cost_arr.reduce(
        (prev, curr, index, array) => prev + parseFloat(curr),
        0
      );
    //   grand_total_for_deals =
    //     parseFloat(total_deal_item_cost) + parseFloat(total_deal_extra_cost) + parseFloat(total_deal_size_cost);

    // todo: sizes totals don't add, need to figure this one out
    grand_total_for_deals =
    parseFloat(total_deal_item_cost) + parseFloat(total_deal_extra_cost);


      const [showModal, setShowModal] = useState(false);
      const [showEditItemModal, setShowEditItemModal] = useState(false);
      const [showDealModal, setShowDealModal] = useState(false);
      const [activeObject, setActiveObject] = useState({});
      const [activeEditItemObject, setActiveEditItemObject] = useState({});
      const [activeDealObject, setActiveDealObject] = useState({});

      const [activeObjectSize, setActiveObjectSize] = useState(null);
      const [activeEditItemObjectSize, setActiveEditItemObjectSize] = useState(null);
      const [activeEditItemObjectExtras, setActiveEditItemObjectExtras] = useState([]);
      const [activeObjectExtras, setActiveObjectExtras] = useState([]);

      const [activeDealObjectSizes, setActiveDealObjectSizes] = useState([]);
      const [activeDealObjectExtras, setActiveDealObjectExtras] = useState([]);



      var extra_total = 0;
      var size_total = 0;
      var total_price = 0;
      var main_total = 0;

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

      //   select quantity of a deal item
      const onDealQuantityChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...selectedDealItems];
        list[index].quantity = value;
        setSelectedDealItems(list);
        console.log(list[index].quantity, selectedDealItems);
      };

      const addMenuItem = (event, menu_item) => {
          const size = menu_item.sizes.find((size) => size.id == activeObjectSize);

          const extras = [...activeObjectExtras];

          let newSelectedItems = [...selectedItems];

          props.restaurant.menu.forEach((main_menu_item) => {
            main_menu_item.menu_items.forEach((item) => {

          if (item.id === menu_item.id) {

            let newItem = {
              menu_item: {
                id: menu_item.id,
                menu_category_id: item.menu_category_id,
                restaurant_id: 1,
                title: menu_item.title,
                description: menu_item.description,
                dietary_requirements: menu_item.dietary_requirements,
                extras: extras,
                sizes: [size],
                image: menu_item.image,
                price: menu_item.price,
                created_at: menu_item.created_at,
                updated_st: menu_item.updated_at,
                notes: "",
                quantity: 1
              },
              size: [size],
              extra: extras
            };

            newSelectedItems.push(newItem);
          }
        });
        });

        setActiveObjectExtras([]);
        setActiveObjectSize(null);
        setActiveObject({});
        setShowModal(false);
        basicNonStickyNotificationToggle();
        setSelectedItems(newSelectedItems);

      };

      // edit menu item
      const editMenuItem = (event, menu_item) => {

        let exisitingSelectedItems = [...selectedItems];

        const size = menu_item.sizes.find((size) => size.id == activeEditItemObjectSize);

        const extras = [...activeEditItemObjectExtras];

        console.log(menu_item, activeEditItemObjectSize, size, extras);
        return false;
        exisitingSelectedItems.forEach((item) => {
          if (item.menu_item.id === menu_item.id) {
            item.menu_item.extras = extras;
            item.menu_item.sizes = [size];
            item.menu_item.notes = activeEditItemObject.notes;
            item.menu_item.quantity = activeEditItemObject.quantity;
          }
        }

        );

        setActiveEditItemObjectExtras([]);
        setActiveEditItemObjectSize(null);
        setActiveEditItemObject({});
        setShowEditItemModal(false);
        basicNonStickyNotificationToggle();
        setSelectedItems(exisitingSelectedItems);
      }
      const addDeal = (event, menu_item) => {


          const extras = [...activeDealObjectExtras];

          const sizes = [...activeDealObjectSizes];

          let newSelectedItems = [...selectedDealItems];

          props.restaurant.group_deals.forEach((main_menu_item) => {

            if (main_menu_item.id === menu_item.id) {

                main_menu_item.group_deal_items.forEach((dealSingleItem,itemKey) => {

                dealSingleItem.group_deal_single_items[0].menu_item.sizes = sizes[itemKey];
                dealSingleItem.group_deal_single_items[0].menu_item.extras = extras[itemKey];
              });

              newSelectedItems.push(main_menu_item);
            }
          });
        setShowDealModal(false);

        setActiveDealObjectExtras([]);
        setActiveDealObjectSizes([]);
        setActiveDealObject({});
        setShowDealModal(false);
        basicNonStickyNotificationToggle();
        setSelectedDealItems(newSelectedItems);
    };


      if (selectedItems) {
        selectedItems &&
          selectedItems.forEach((item) => {
            let i = 0;
            if (item.extra) {
              while (i < item.extra.length) {
                extra_total += parseFloat(item.extra[i].additional_charge) * parseFloat(item.menu_item.quantity);
                i++;
              }
            }
          });

        selectedItems &&
          selectedItems.forEach((item) => {
            let i = 0;

            if (item.size) {
              while (i < item.size.length) {
                size_total += parseFloat(item.size[i].additional_charge) * parseFloat(item.menu_item.quantity);
                i++;
              }
            }
          });

        var i = 0;
        while (i < selectedItems.length) {
          total_price +=
            parseFloat(selectedItems[i].menu_item.price) *
            parseFloat(selectedItems[i].menu_item.quantity);
          i++;
        }
    }

    /**
     * Handle the change event for adding a new group_deals item using the modal
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
    /**
     * Handle the change event for editing menu item using the modal
     *
     * @param {Event} e
     * @param {object} menuItemObject
     * @returns void
     */
    const onHandleItemEdit = (e, menu_item) => {
      e.preventDefault();
      let menuItemObject;
      props.restaurant.menu.forEach((main_menu_item) => {
        main_menu_item.menu_items.forEach((item) => {
      if (item.id === menu_item.menu_item.id) {

        menuItemObject = {
          menu_item: {
            id: item.id,
            menu_category_id: item.menu_category_id,
            restaurant_id: 1,
            title: item.title,
            description: item.description,
            dietary_requirements: item.dietary_requirements,
            extras: item.extras,
            sizes: item.sizes,
            image: item.image,
            price: item.price,
            created_at: item.created_at,
            updated_st: item.updated_at,
            notes: "",
            quantity: 1
          },
          size: item.sizes,
          extra: item.extras
        };
      }
    });
    });

    setActiveEditItemObject(menuItemObject);
    setShowEditItemModal(true);
    }




    /**
     * Active object size change handler
     * @param {Event} e Radio button change event
     */
    const handleActiveObjectSizeChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      const isChecked = e.target.checked;

      if (isChecked) {
        setActiveObjectSize(value);
      }
    };

    const handleActiveObjectExtrasChange = (e,extra) => {

      const isChecked = e.target.checked;

      if (isChecked) {

        const newExtras = [...activeObjectExtras,extra];
        setActiveObjectExtras(newExtras);
      } else {

        const newExtras = activeObjectExtras.filter((item) => item.id !== extra.id);
        setActiveObjectExtras(newExtras);
      }

    };


    /**
     * Handle the change event for adding a new deal using the modal
     *
     * @param {Event} e
     * @param {object} dealItemObject
     * @returns void
     */
     const onHandleDealAddition = (e,dealItemObject) => {
        e.preventDefault();
        setActiveDealObject(dealItemObject);
        setShowDealModal(true);
      }

    /**
     * Handle the change event for selecting the sizes of a deal
     * @param {*} groupDealKey
     * @param {*} size
     */
    const handleActiveDealObjectSizeChange = (groupDealKey, size) => {

      const list = [...activeDealObjectSizes];

      list[groupDealKey] = size;

      setActiveDealObjectSizes(list);
    };

    /**
     * Handle the change event for selecting the extras of a deal
     * @param {*} e
     * @param {*} extra
     */
    const handleActiveDealObjectExtrasChange = (event,extra,groupDealItemKey) => {

      const isChecked = event.target.checked;

      if (isChecked) {

        const list = [...activeDealObjectExtras];

        if (list[groupDealItemKey]) {
          list[groupDealItemKey].push(extra);
        } else {
          list[groupDealItemKey] = [extra];
        }
        setActiveDealObjectExtras(list);

      } else {

        const list = [...activeDealObjectExtras];

        const newExtras = list[groupDealItemKey].filter((item) => item.id !== extra.id);

        list[groupDealItemKey] = newExtras;

        setActiveDealObjectExtras(list);
      }

    };

      /**
       * handle the form submission for the shopping basket
       * @param {Event} e Shopping Basket Form Submit Event
       */
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
          order_total: total_price + size_total + extra_total,
          main_total: main_total,
        });
      };



      const clearItems = (e) => {
        e.preventDefault();
        setSelectedItems([]);
        setSelectedDealItems([]);
        };


      return (
        <>
          <Authenticated auth={props.auth} errors={props.errors} activeGroup={16}>
            <div className="col-span-12 relative">
              <h2 className="intro-y text-lg font-medium sm:px-10 pb-5 pt-5 sm:pb-0">
                Order Details
              </h2>
              {/* start:intro */}
              <div className="grid grid-rows-1 grid-cols-3 gap-4">
                <div className="md:col-span-2 col-span-3 sm:row-span-1">
                  <div className="mb-4 sm:mb-0 flex flex-col-reverse items-start justify-start sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:p-10 sm:pb-0">
                    {/* start:intro */}
                    <p className="sm:text-start sm:col-span-3 mb-2 sm:mb-0 text-start col-span-5 px-1 order-1">
                      {props.restaurant.time_slot ?? "ASAP"}{" "}
                      <span className="d-inline-block mr-2 ml-2">{">"}</span>{" "}
                      {props.restaurant.delivery_address}
                    </p>
                    <p className="mt-5 sm:pt-0 sm:mt-0 col-span-3 mb-2 sm:mb-0 row-span-1 px-1 order-3">
                      {props.restaurant.chosen_order_type.toUpperCase()}
                    </p>
                    <Link
                      className="btn absolute top-0 right-0 mt-5 sm:mt-0 sm:relative sm:col-span-1 col-span-5 row-span-1 order-2"
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
                                src={props.restaurant.logo}
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
                        <div className="text-slate-600 dark:text-slate-500 mt-5">
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
                  <div className="mt-5 md:col-span-2 col-span-3 sm:row-span-1 row-start-2 border-t border-b-none border-stone-400">
                    <h2 className="font-medium text-lg sm:px-10 mt-8 pb-0">Deals</h2>
                    {props.restaurant.group_deals &&
                      props.restaurant.group_deals.map(({title, image, description, dietary_requirements, group_deal_price, group_deal_items, id}) => (
                        <div className="flex items-center justify-between flex-wrap mt-8 mb-8 pl-0 sm:pl-10">
                          <div className="w-72 flex-none">
                            <div className="box rounded-md relative zoom-in">
                              <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                                <div className="absolute top-0 left-0 w-full h-full image-fit">
                                  <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="rounded-md"
                                    src={image}
                                    data-action="zoom"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-5 px-5 sm:px-10 flex-1">
                            <div className="block font-medium text-base">
                              {title}
                            </div>
                            <div className="text-slate-600 dark:text-slate-500 mt-5">
                              {description}
                            </div>
                            <div className="text-slate-600 dark:text-slate-500 mt-2">
                              Allergens: {dietary_requirements ?? "N/A"}
                            </div>
                            <div className="text-slate-600 dark:text-slate-500 mt-2">
                              Price: £ {group_deal_price}
                            </div>
                            <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal2"
                                      className="btn btn-primary mt-5 w-24"
                                      key={id}
                                      onClick={(e) => {
                                        onHandleDealAddition(e,{ id:id,title: title,image: image,description: description, dietary_requirements: dietary_requirements, price: group_deal_price, group_deal_items: group_deal_items });
                                      }}
                                    >
                                      Add
                            </button>
                          </div>
                        </div>
                      ))}
                    {/* end: groupdeal box */}
                    {/* start: menu box */}
                    {props.restaurant.menu &&
                      props.restaurant.menu.map(
                        (item, key) =>
                          item.menu_items.length > 0 && (
                            <div className="sm:p-10 sm:pt-0 md:col-span-2 col-span-3 sm:row-span-1 row-start-2 border-b-none border-t border-stone-400">
                              <h2 className="font-medium text-lg mb-8 mt-8">
                                {item.title}
                              </h2>

                              {item.menu_items.map(({id, title, image, description, dietary_requirements, price, sizes, extras}) => (
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
                                  <div className="pt-5 px-5 sm:px-10 flex-1">
                                    <div className="block font-medium text-base">
                                      {title}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-500 mt-5">
                                      {description}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-500">
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
                                        onHandleMenuItemAddition(e,{ id:id,title: title,image: image,description: description, dietary_requirements: dietary_requirements, price: price, sizes: sizes, extras: extras });
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
                {selectedDealItems &&
                  selectedDealItems.map((item, key) => (
                    <div className="mb-5">

                      <a className="flex mb-5 items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                        <div className="max-w-[50%] font-medium text-lg truncate mr-1">
                          {item.title}
                        </div>
                        <div className="text-slate-500">x {item.quantity}</div>
                        <Edit className="w-4 h-4 text-slate-500 ml-2" />
                        <div className="ml-auto font-medium text-lg">

                          £ {item.group_deal_price * item.quantity}
                        </div>
                      </a>

                      {
                        item.group_deal_items.map((dealItem, dealItemKey) => {
                        return <div className="mb-5">
                             <div className="max-w-[50%] font-medium text-lg truncate mr-1 mb-3">
                          {dealItem.title}
                        </div>

                          {dealItem.group_deal_single_items[0].menu_item.sizes.map((size, sizeKey) => {
                            return <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                             - {size.name}
                          </div>
                          })}
                             {dealItem.group_deal_single_items[0].menu_item.extras.map((extra, extraKey) => {
                            return <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
                             - {extra.name}
                          </div>
                          })}
                          </div>
                        })
                      }


                      <div className="flex justify-between mt-3 items-center w-full">
                        <p className="flex-1">Qty:</p>
                        <select
                          className="rounded"
                          onChange={(e) => onDealQuantityChange(e, key)}
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
                          <Edit className="w-4 h-4 text-slate-500 ml-2" onClick={(e) => onHandleItemEdit(e, item)} />
                          <div className="ml-auto font-medium text-lg">
                            £{" "}
                            {(parseFloat(item.menu_item.price) *
                              parseFloat(item.menu_item.quantity)) +
                              (item.extra
                                && item.extra.length > 0 ?
                                  item.extra.reduce(
                          (prev, curr, index, array) => prev + parseFloat(curr.additional_charge),
                          0
                        )
                                : 0) *
                                item.menu_item.quantity +
                              (item.size
                                ? item.size.length > 0 &&
                                 parseFloat(item.size[0].additional_charge) *
                                    parseFloat(item.menu_item.quantity)
                                : 0)}
                          </div>
                        </a>
                        <div className="flex items-center cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">

                          {item.size && "- "}
                          {item.size &&
                            item.size.length > 0 &&
                            item.size[0].name}
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
                      <div className="font-medium">{parseFloat(total_price) + parseFloat(extra_total) +
                          parseFloat(size_total)}</div>
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
                    <div className="flex mt-4 pt-4 border-t border-stone-400 dark:border-darkmode-400">
                      <div className="mr-auto font-medium text-base">
                        Total Charge
                      </div>
                      <div className="font-medium text-base">
                       £
                        {main_total = parseFloat(total_price) +
                          (parseFloat(props.restaurant.delivery_charge) || 0) +
                          (parseFloat(props.restaurant.service_charge) || 0) +
                          parseFloat(extra_total) +
                          parseFloat(size_total) + (parseFloat(grand_total_for_deals) || 0)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-5">
                  <Button className="btn btn-primary w-full shadow-md ml-auto" type="submit">
                    Complete and send payment sms
                  </Button>
                  <button className="btn w-full mt-2 border-slate-300 dark:border-darkmode-400 text-slate-500" onClick={clearItems}>
                    Clear Items
                  </button>
                </div>
              </TabPanel>
                  </form>
                </div>
                {/* end: basket */}
              </div>
              {/* BEGIN: New Order Modal */}
              <Modal
                show={showModal}
                onHidden={() => {
                  setShowModal(false);
                }}
              >
                <ModalHeader>
                <div className="flex flex-col pt-0 p-5">
                  <h2 className="font-medium text-base mr-auto mb-5 mt-5">
                    {activeObject.title ?? ""}
                  </h2>
                  <img src={activeObject.image ?? ""} alt={activeObject.title ?? ""} className="rounded-md" />
                  <div className="col-span-12 mt-5">
                    <p>{activeObject.description ?? ""}</p>
                    <p className="mt-2">{activeObject.dietary_requirements ?? ""}</p>
                    <p className="mt-2">£{activeObject.price ?? ""}</p>
                  </div>
                </div>
                </ModalHeader>
                <ModalBody>
                          {/* start: choose sizes and extras */}
                            <div className="w-full p-5 flex justify-between items-start">
                            <div>

                                <h2 className="font-medium text-md mb-5">
                                Choose your size
                                </h2>

                                {activeObject.sizes &&
                                    activeObject.sizes.map((size, key) => (
                                    <div>
                                    {
                                        size.name &&
                                        (
                                    <div className="flex items-center mt-5">
                                      <input type="radio" name="size" value={size.id} onChange={handleActiveObjectSizeChange}/>{" "}
                                    <p className="ml-2">{size.name}</p>
                                    {size.additional_charge !== 0 && (
                                        <p className="ml-3">+ £{size.additional_charge || 0}</p>
                                    )}
                                    </div>
                                        )
                                    }
                                    </div>
                                ))}
                            </div>
                            <div>

                                <h2 className="font-medium text-md mb-5">
                                Choose your sides
                                </h2>

                                {activeObject.extras &&
                                    activeObject.extras.map((extra, key) => (
                                    <div>
                                    {
                                        extra.name &&
                                        (
                                            <div className="flex items-center mt-0">
                                            <div className="form-check mb-2">
                                                <input id="checkbox-switch-1" className="form-check-input" type="checkbox" name={extra.name} value={extra.id} onChange={(e) => handleActiveObjectExtrasChange(e, extra)}/>
                                                <label className="form-check-label flex" htmlFor="checkbox-switch-1"><p>{extra.name}</p>  {extra.additional_charge !== 0 && (
                                                <p className="ml-3">+ £{extra.additional_charge || 0}</p>
                                            )}</label>
                                            </div>
                                            </div>

                                        )

                                    }
                                    </div>
                                ))}
                            </div>
                            </div>
                          {/* end: choose sizes and extras */}
                </ModalBody>
                <ModalFooter className="text-right">
                <div className="flex justify-between p-5">
                <Button
                    className="btn btn-primary w-full shadow-md ml-auto mr-3"
                    click={(e) => {
                        setShowModal(false);
                        addMenuItem(e, activeObject);
                    }}
                    >
                    Add to basket
                </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="btn btn-outline-secondary w-32 mr-1"
                  >
                    Cancel
                  </button>
                </div>
                </ModalFooter>
              </Modal>
              {/* END: New Order Modal */}
              {/* BEGIN: Edit Order Modal */}
              <Modal
                show={showEditItemModal}
                onHidden={() => {
                  setShowEditItemModal(false);
                }}
              >
                <ModalHeader>
                <div className="flex flex-col pt-0 p-5">
                  <h2 className="font-medium text-base mr-auto mb-5 mt-5">
                  {console.log(activeEditItemObject)}
                    {activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.title}
                  </h2>
                  <img src={activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.image} alt={activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.title} className="rounded-md" />
                  <div className="col-span-12 mt-5">
                    <p>{activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.description}</p>
                    <p className="mt-2">{activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.dietary_requirements}</p>
                    <p className="mt-2">£{activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.price}</p>
                  </div>
                </div>
                </ModalHeader>
                <ModalBody>
                          {/* start: choose sizes and extras */}
                            <div className="w-full p-5 flex justify-between items-start">
                            <div>

                                <h2 className="font-medium text-md mb-5">
                                Choose your size
                                </h2>

                                {activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.sizes &&
                                    activeEditItemObject.menu_item.sizes.map((size, key) => (
                                    <div>
                                    {
                                        size.name &&
                                        (
                                    <div className="flex items-center mt-5">
                                      <input type="radio" name="size" value={size.id} onChange={handleActiveObjectSizeChange}/>{" "}
                                    <p className="ml-2">{size.name}</p>
                                    {size.additional_charge !== 0 && (
                                        <p className="ml-3">+ £{size.additional_charge || 0}</p>
                                    )}
                                    </div>
                                        )
                                    }
                                    </div>
                                ))}
                            </div>
                            <div>

                                <h2 className="font-medium text-md mb-5">
                                Choose your sides
                                </h2>

                                {activeEditItemObject && activeEditItemObject.menu_item && activeEditItemObject.menu_item.extras &&
                                    activeEditItemObject.menu_item.extras.map((extra, key) => (
                                    <div>
                                    {
                                        extra.name &&
                                        (
                                            <div className="flex items-center mt-0">
                                            <div className="form-check mb-2">
                                                <input id="checkbox-switch-1" className="form-check-input" type="checkbox" name={extra.name} value={extra.id} onChange={(e) => handleActiveObjectExtrasChange(e, extra)}/>
                                                <label className="form-check-label flex" htmlFor="checkbox-switch-1"><p>{extra.name}</p>  {extra.additional_charge !== 0 && (
                                                <p className="ml-3">+ £{extra.additional_charge || 0}</p>
                                            )}</label>
                                            </div>
                                            </div>

                                        )

                                    }
                                    </div>
                                ))}
                            </div>
                            </div>
                          {/* end: choose sizes and extras */}
                </ModalBody>
                <ModalFooter className="text-right">
                <div className="flex justify-between p-5">
                <Button
                    className="btn btn-primary w-full shadow-md ml-auto mr-3"
                    click={(e) => {
                        setShowEditItemModal(false);
                        editMenuItem(e, activeEditItemObject);
                    }}
                    >
                    Add to basket
                </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditItemModal(false);
                    }}
                    className="btn btn-outline-secondary w-32 mr-1"
                  >
                    Cancel
                  </button>
                </div>
                </ModalFooter>
              </Modal>
              {/* END: Edit Order Modal */}
              {/* BEGIN: New Group Deal Modal */}
              <Modal
                show={showDealModal}
                onHidden={() => {
                  setShowDealModal(false);
                }}
              >
                <ModalHeader>
                <div className="flex flex-col pt-0 p-5">
                  <h2 className="font-medium text-base mr-auto mb-5 mt-5">
                    {activeDealObject.title ?? ""}
                  </h2>
                  <img src={activeDealObject.image ?? ""} alt={activeDealObject.title ?? ""} className="rounded-md" />
                  <div className="col-span-12 mt-5">
                    <p>{activeDealObject.description ?? ""}</p>
                    <p className="mt-2">{activeDealObject.dietary_requirements ?? ""}</p>
                    <p className="mt-2">£{activeDealObject.price ?? ""}</p>
                  </div>
                </div>
                </ModalHeader>
                <ModalBody>
                          {
                            activeDealObject.group_deal_items && activeDealObject.group_deal_items.map(
                                (item, itemKey) => {
                                    return (
                                        <>

                                        <div className="flex flex-col pt-0 p-5">
                                        <h2 className="font-medium text-base mr-auto mb-5 mt-5">
                                            {item.group_deal_single_items[0].menu_item.title ?? ""}
                                        </h2>
                                        <img src={item.group_deal_single_items[0].menu_item.image ?? ""} alt={item.group_deal_single_items[0].menu_item.title ?? ""} className="rounded-md" />
                                        <div className="col-span-12 mt-5">
                                            <p>{item.group_deal_single_items[0].menu_item.description ?? ""}</p>
                                            <p className="mt-2">{item.group_deal_single_items[0].menu_item.dietary_requirements ?? ""}</p>
                                            <p className="mt-2">£{item.group_deal_single_items[0].menu_item.price ?? ""}</p>
                                        </div>
                                    </div>

                            <div className="w-full p-5 flex justify-between items-start">
                            <div>
                                <h2 className="font-medium text-md mb-5">
                                Choose your size
                                </h2>

                                {item.group_deal_single_items[0].menu_item.sizes &&
                                    item.group_deal_single_items[0].menu_item.sizes.map((size, key) => (
                                    <div key={key}>
                                      {
                                          size.name &&
                                          (
                                      <div className="flex items-center mt-5">
                                        <input type="radio" name={"group_deal_size_select-" + item.id} value={item.group_deal_single_items[0].menu_item.sizes[key].id} onChange={(e) => handleActiveDealObjectSizeChange(itemKey, size )}/>{" "}
                                      <p className="ml-2">{size.name}</p>
                                      {size.additional_charge !== 0 && (
                                          <p className="ml-3">+ £{size.additional_charge || 0}</p>
                                      )}
                                      </div>
                                          )
                                      }
                                    </div>
                                ))}
                            </div>
                            <div>

                                <h2 className="font-medium text-md mb-5">
                                Choose your sides
                                </h2>

                                {item.group_deal_single_items[0].menu_item.extras &&
                                    item.group_deal_single_items[0].menu_item.extras.map((extra, key) => (
                                    <div key={key}>
                                    {
                                        extra.name &&
                                        (
                                            <div className="flex items-center mt-0">
                                            <div className="form-check mb-2">
                                                <input id="checkbox-switch-1" className="form-check-input" type="checkbox" name={extra.name} value={extra.id} onChange={(e) => handleActiveDealObjectExtrasChange(e,extra,itemKey)}/>
                                                <label className="form-check-label flex" htmlFor="checkbox-switch-1"><p>{extra.name}</p>  {extra.additional_charge !== 0 && (
                                                <p className="ml-3">+ £{extra.additional_charge || 0}</p>
                                            )}</label>
                                            </div>
                                            </div>

                                        )

                                    }
                                    </div>
                                ))}
                            </div>
                            </div>
                        </>
                                    );
                                }
                                )

                          }
                </ModalBody>
                <ModalFooter className="text-right">
                <div className="flex justify-between p-5">
                <Button
                    className="btn btn-primary w-full shadow-md ml-auto mr-3"
                    click={(e) => {
                        addDeal(e, activeDealObject);
                    }}
                    >
                    Add to basket
                </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDealModal(false);
                    }}
                    className="btn btn-outline-secondary w-32 mr-1"
                  >
                    Cancel
                  </button>
                </div>
                </ModalFooter>
              </Modal>
              {/* END: New Group Deal Modal */}
            </div>

            {/* BEGIN: Basic Non Sticky Notification Content */}
            <Notification
              getRef={(el) => {
                basicNonStickyNotification.current = el;
              }}
              options={{
                duration: 2000,
              }}
              className="flex flex-col sm:flex-row"
            >
              <div className="font-medium">
                Yay! Menu Item Added!
              </div>
            </Notification>
            {/* END: Basic Non Sticky Notification Content */}

          </Authenticated>
        </>
      );
}
