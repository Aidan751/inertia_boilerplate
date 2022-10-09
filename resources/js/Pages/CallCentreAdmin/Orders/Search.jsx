import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import Label from "@/Components/Label";
import Input from "@/Components/Input";

function Search(props) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
  })

  const submit = (e) => {
      e.preventDefault();
      post(route('restaurant.menu.categories.store'));
  };

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={15}
            activeItem={1}
        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Order Details</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill out the details below for results</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* Start: Restaurant number */}
            <div className="mt-3">
             <Label
                value="Restaurant number"
                forInput="front_facing_number"
                />
                <Input
                    className="w-full"
                    id="front_facing_number"
                    name="front_facing_number"
                    type="text"
                    value={data.front_facing_number}
                    setData={setData}
                    error={errors.front_facing_number}
                />
                {errors.front_facing_number && (
                    <div className="text-theme-6 mt-2">{errors.front_facing_number}</div>
                )}
            </div>
            {/* End: Restaurant number */}
            {/* Start: To where? */}
            <div className="mt-3">
                <Label
                    value="To where?"
                    forInput="address"
                />
                <Input
                    className="w-full"
                    id="address"
                    name="address"
                    type="text"
                    value={data.address}
                    setData={setData}
                    error={errors.address}
                />
                {errors.address && (
                    <div className="text-theme-6 mt-2">{errors.address}</div>
                )}
            </div>
            {/* End: To where? */}
            {/* Start: When? */}
            <div className="mt-3">
                <Label
                    value="When?"
                    forInput="time_slot"
                />
                <Input
                    className="w-full"
                    id="time_slot"
                    name="time_slot"
                    type="text"
                    value={data.time_slot}
                    setData={setData}
                    error={errors.time_slot}
                />

                {errors.time_slot && (
                    <div className="text-theme-6 mt-2">{errors.time_slot}</div>
                )}
            </div>
            {/* End: When? */}
            {/* Start: What type of order? */}
            <div className="mt-3">
                <Label
                    value="What type of order?"
                    forInput="order_type"
                />
                <Input
                    className="w-full"
                    id="order_type"
                    name="order_type"
                    type="text"
                    value={data.order_type}
                    setData={setData}
                    error={errors.order_type}
                />
                {errors.order_type && (
                    <div className="text-theme-6 mt-2">{errors.order_type}</div>
                )}
            </div>
            {/* End: What type of order? */}
            {/* Start: Customer details */}
                {/* Start: Customer name */}
                <div className="mt-3">
                    <Label
                        value="Customer name"
                        forInput="customer_name"
                    />
                    <Input
                        className="w-full"
                        id="customer_name"
                        name="customer_name"
                        type="text"
                        value={data.customer_name}
                        setData={setData}
                        error={errors.customer_name}
                    />
                    {errors.customer_name && (
                        <div className="text-theme-6 mt-2">{errors.customer_name}</div>
                    )}
                </div>
                {/* End: Customer name */}
                {/* Start: Customer phone number */}
                <div className="mt-3">
                    <Label
                        value="Customer phone number"
                        forInput="customer_contact_number"
                    />
                    <Input
                        className="w-full"
                        id="customer_contact_number"
                        name="customer_contact_number"
                        type="text"
                        value={data.customer_contact_number}
                        setData={setData}
                        error={errors.customer_contact_number}
                    />
                    {errors.customer_contact_number && (
                        <div className="text-theme-6 mt-2">{errors.customer_contact_number}</div>
                    )}
                </div>
                {/* End: Customer phone number */}
                {/* End: Customer details */}

            <div className="text-right mt-5">
              <Button type="submit" className="w-30">
                Save
              </Button>
            </div>
          </form>
          {/* END: Form Layout */}
          </div>
        </div>
    </div>
    </Authenticated>
    </>
  );
}

export default Search;
