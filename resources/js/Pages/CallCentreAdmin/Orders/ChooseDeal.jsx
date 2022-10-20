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

  const handleChange = (event) => {
    console.log(event.target.value);
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('call-centre.orders.update.deal.items'), {size: data.size, extra: data.extra});
};


  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors} activeGroup={16}>
        <div className="col-span-12 w-full">
          <h2 className="intro-y text-lg font-medium mt-5 p-5">
            Order Details
          </h2>
          {/* start:intro */}
          <div className="w-full">
            <form className="md:col-span-2 col-span-3 sm:row-span-1" onSubmit={submit}>
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
                  href={route('call-centre.orders.add.deal', {id: props.group_deal.id})}
                >
                  Return
                </Link>

                {/* end:intro */}
              </div>
              {/* start: item description */}
              <div className="p-5">
                <h2 className="font-medium text-lg mb-5">{menu_item.title}</h2>
                <p className="mb-2 max-w-md">{menu_item.description}</p>
                <p className="max-w-md">
                  <span className="font-medium">Allergies:</span>{" "}
                  {menu_item.dietary_requirements}
                </p>
              </div>
              {/* end: item description */}
              {/* start: choose sizes and extras */}
              <div className="w-full p-5">
                <h2 className="font-medium text-md mb-5">
                  Choose your size
                </h2>

                {menu_item.sizes !== null &&
                  menu_item.sizes.map((size, key) => (
                    <div>
                    {
                        size.size &&
                        (
                    <div className="flex items-center mt-5">
                      <input type="radio" name="size" value={size.id}  onChange={(e) => setData(e.target.name, e.target.value)}/>{" "}
                      <p className="ml-2">{size.size}</p>
                      {size.additional_charge !== 0 && (
                        <p className="ml-3">+ £{size.additional_charge || 0}</p>
                      )}
                    </div>
                        )
                    }
                    </div>
                  ))}

                <h2 className="font-medium text-md mb-5 mt-8">
                  Choose your sides
                </h2>

                {menu_item.extras &&
                  menu_item.extras.map((extra, key) => (
                    <div>
                    {
                        extra.name &&
                        (
                            <div className="flex items-center mt-5">
                            <div className="form-check mt-2">
                                <input id="checkbox-switch-1" className="form-check-input" type="checkbox" name="extra" value={extra.id} />
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

              {/* end: choose sizes and extras */}

              {/* start: save selections button */}
              <div className="flex justify-start mt-10 p-5">
                <Button className="btn btn-primary" type="submit">
                  Save selections
                </Button>
              </div>
              {/* end: save selections button */}
            </form>
          </div>
        </div>
      </Authenticated>
    </>
  );
}


