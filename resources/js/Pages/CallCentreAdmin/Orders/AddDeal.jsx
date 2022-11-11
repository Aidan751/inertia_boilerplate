import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import { Head, Link } from '@inertiajs/inertia-react';
import { ShoppingCart } from "lucide-react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Error from "@/Components/Error";


function AddDeal(props) {

  const { data, setData, post, processing, errors } = useForm({
    role: 'call_centre_admin',
  })



  console.log(props);
  const submit = (e) => {
      e.preventDefault();

      post(route('call-centre.orders.add-to-basket', data));
  };

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={16}
            activeItem={1}
        >

<form className="col-span-12 w-full" onSubmit={submit}>
          <h2 className="intro-y text-lg font-medium mt-5 p-5 pb-0">
            Order Details
          </h2>
          {
            props.message &&
            <ValidationSuccess message={props.message} />
          }
          {/* start:intro */}
          <div className="w-full">
            <div className="md:col-span-2 col-span-3 sm:row-span-1">
              <div className="mb-4 grid grid-cols-4 grid-rows-2 items-center p-5">
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
                 href={route('call-centre.orders.index')}>

                    Return
                  </Link>

                {/* end:intro */}
              </div>

            {/* start: group deal description */}

                    <div className="p-5">
                    <div className="block font-medium text-base">
                            {props.groupDeal.title}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-5">
                            {props.groupDeal.description}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                            Allergens: {props.groupDeal.dietary_requirements ?? "N/A"}
                          </div>
                    </div>



              {/* end: group deal description */}
              {props.groupDeal.group_deal_items &&
                props.groupDeal.group_deal_items.map((item, key) => (
                    <>
                  <div className="w-full p-8 pb-8">
                    <h2 className="font-medium text-lg">
                      {item.title}
                    </h2>

                    {item.group_deal_single_items.map(
                      (single_item, single_item_key) => (

                        <div className="flex items-center justify-between flex-wrap mt-8 mb-8">
                        <div className="w-72 flex-none">
                          <div className="box rounded-md relative">
                            <div className="flex-none relative block before:block before:w-full before:pt-[100%]">
                              <div className="absolute top-0 left-0 w-full h-full image-fit">
                                <img
                                  alt="Midone Tailwind HTML Admin Template"
                                  className="rounded-md"
                                  src={single_item.menu_item.image}
                                  data-action="zoom"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-10 flex-1">
                          <div className="block font-medium text-base">
                          {single_item.menu_item.title}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-3">
                          {single_item.menu_item.description}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                          Allergens:{" "}
                              {single_item.menu_item.dietary_requirements ??
                                "N/A"}
                          </div>
                          <div className="text-slate-600 dark:text-slate-500 mt-2">
                          Price: £ {single_item.menu_item.price}
                          </div>
                          <Link className="flex items-center mt-5" method="get" href={route('call-centre.orders.choose-sizes', {id: single_item.menu_item.id})}>
                              <input
                                type="radio"
                                name={item.title}
                                value={single_item.menu_item.id}
                              />{" "}
                              <p className="ml-2">Select</p>
                            </Link>
                        </div>
                      </div>
                      )
                    )}
                  </div>
                  <hr className="border-1 border-stone-400 last:border-none shadow-none"/>
                  </>
                ))}
            </div>
            <div className="flex justify-center p-8 pb-0">
              <Button type="submit" className="btn btn-primary">
                <ShoppingCart className="mr-2"/>Add to basket
              </Button>
            </div>
          </div>
        </form>
    </Authenticated>
    </>
  );
}

export default AddDeal;
