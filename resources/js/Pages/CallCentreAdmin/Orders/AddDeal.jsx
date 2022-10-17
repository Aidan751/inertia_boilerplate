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

function Search(props) {

  const { data, setData, get, processing, errors } = useForm({
    role: 'call_centre_admin',
  })



  console.log(props);
  const submit = (e) => {
      e.preventDefault();

      get(route('call-centre.orders.index'));
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
          <h2 className="intro-y text-lg font-medium mt-10 mb-4">
            Order Details
          </h2>
          {/* start:intro */}
          <div className="w-full">
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
                  Return
                </button>

                {/* end:intro */}
              </div>

              {props.groupDeal.group_deal_items &&
                props.groupDeal.group_deal_items.map((item, key) => (
                  <div className="w-full">
                    <h2 className="font-medium text-lg mb-5 mt-5">
                      {item.title}
                    </h2>

                    {item.group_deal_single_items.map(
                      (single_item, single_item_key) => (
                        <div className="box flex flex-wrap mb-4">
                          <div className="p-5 flex-1">
                            <div className="h-56 2xl:w-72 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                              <img
                                alt="Single menu item image"
                                className="rounded-md w-full"
                                src={single_item.menu_item.image}
                              />
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex items-start justify-center flex-col">
                            <h2 className="font-medium text-lg">
                              {single_item.menu_item.title}
                            </h2>
                            <p className="mt-5 mb-2">
                              {single_item.menu_item.description}
                            </p>
                            <p className="mb-2">
                              Allergens:{" "}
                              {single_item.menu_item.dietary_requirements ??
                                "N/A"}
                            </p>
                            <p className="mb-2">
                              Price: £ {single_item.menu_item.price}
                            </p>
                            <Link className="flex items-center mt-5">
                              <input
                                type="radio"
                                name={item.title}
                                value={single_item.menu_item.id}
                                href="#"
                              />{" "}
                              <p className="ml-2">Select</p>
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-5">
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

export default Search;
