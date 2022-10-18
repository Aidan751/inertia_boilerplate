import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { useState } from "react";


export default function chooseDeal(props) {
    const menu_item = props.group_deal_single_item.menu_item;

  const { data, setData, post, processing, errors } = useForm({
    role: 'call_centre_admin',
    extra: "",
    size: "",
    menu_item: menu_item,
  })

  console.log(props);



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

  const submit = (e) => {
    e.preventDefault();

    get(route('call-centre.orders.index'));
};


  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors} activeGroup={16}>
        <div className="col-span-12 w-full">
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
                <Link
                  className="btn sm:col-span-1 col-span-5 row-span-1 order-2"
                  href={route('call-centre.orders.add.deal', {id: props.group_deal.id})}
                >
                  Return
                </Link>

                {/* end:intro */}
              </div>
              {/* start: item description */}
              <div className="py-5">
                <h2 className="font-medium text-lg mb-5">{menu_item.title}</h2>
                <p className="mb-2 max-w-md">{menu_item.description}</p>
                <p className="max-w-md">
                  <span className="font-medium">Allergies:</span>{" "}
                  {menu_item.dietary_requirements}
                </p>
              </div>
              {/* end: item description */}
              {/* start: choose sizes and extras */}
              <div className="w-full">
                <h2 className="font-medium text-md mb-5 mt-5">
                  Choose your size
                </h2>

                {menu_item.sizes &&
                  menu_item.sizes.map((size, key) => (
                    <div className="flex items-center mt-5">
                      <input type="radio" name="size" value={data.size} />{" "}
                      <p className="ml-2">{size.size}</p>
                      {size.additional_charge !== 0 && (
                        <p className="ml-3">+ £{size.additional_charge}</p>
                      )}
                    </div>
                  ))}

                <h2 className="font-medium text-md mb-5 mt-8">
                  Choose your sides
                </h2>

                {menu_item.extras &&
                  menu_item.extras.map((extra, key) => (
                    <div className="flex items-center mt-5">
                      <input type="radio" name="extra" value={data.extra} />{" "}
                      <p className="ml-2">{extra.name}</p>
                      {extra.additional_charge !== 0 && (
                        <p className="ml-3">+ £{extra.additional_charge}</p>
                      )}
                    </div>
                  ))}
              </div>

              {/* end: choose sizes and extras */}

              {/* start: save selections button */}
              <div className="flex justify-start mt-10">
                <Link className="btn btn-primary" method="post" href={route('call-centre.orders.save-selections')} data={data}>
                  Save selections
                </Link>
              </div>
              {/* end: save selections button */}
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
}


