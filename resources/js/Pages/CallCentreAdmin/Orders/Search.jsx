import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import ValidationSuccess from "@/Components/ValidationSuccess";
import ValidationErrors from "@/Components/ValidationErrors";

function Search(props) {
    const { errors } = usePage().props;

  const { data, setData, get, processing } = useForm({
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

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Order Details</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill out the details below for results</p>
      </div>
          {/* Show Success Validation Component */}
          {
                        props.success &&
                        <ValidationSuccess message={props.success} />
        }

        <ValidationErrors errors={errors} />
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* Start: Restaurant number */}
            <div className="mt-3">
             <Label
                value="Restaurant number"
                forInput="contact_number"
                />
                <Input
                    className="w-full"
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    value={data.contact_number}
                    setData={setData}
                    error={errors.contact_number}
                />
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

            </div>
            {/* End: To where? */}
            {/* Start: When? */}
            <div className="mt-10 mb-5">
                <Label
                    value="When?"
                />
                <div className="mt-2">

                <input
                    id="asap"
                    name="when_radio"
                    type="radio"
                    value='asap'
                    className="mr-2"
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    error={errors.asap}
                />
                <span className="d-inline-block mr-2">
                    As soon as possible
                </span>
                <input
                    name="when_radio"
                    type="radio"
                    value='time'
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    error={errors.time}
                />
                <span className="d-inline-block ml-2 mr-2">
                    Pick up time
                </span>
                {data.when_radio === 'time' && (
                <>
                    <input
                    type="time"
                    id="selected_time"
                    name="selected_time"
                    value={data.selected_time}
                    className="ml-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm "
                    min="00:00"
                    max="23:59"
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    />
                </>
                )}

                </div>

            </div>
            {/* End: When? */}
            {/* Start: What type of order? */}
            <div className="mt-5">
                <Label
                    value="What type of order?"
                />
                <div className="mt-2">

                <input
                    name="order_type"
                    type="radio"
                    value='delivery'
                    className="mr-2"
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    error={errors.delivery}
                />
                <span className="d-inline-block mr-2">
                    Delivery
                </span>
                <input
                    name="order_type"
                    type="radio"
                    value='collection'
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    error={errors.collection}
                />
                <span className="d-inline-block ml-2 mr-2">
                    Collection
                </span>
                <input
                    type="radio"
                    name="order_type"
                    value='table_order'
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    error={errors.table_order}
                />
                <span className="d-inline-block ml-2 mr-2">
                    Table Order
                </span>
                </div>

            </div>
            {/* End: What type of order? */}
            {/* Start: Customer details */}
            <h2 className="mt-10 text-lg font-medium">Customer Details</h2>
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
                </div>
                {/* End: Customer phone number */}
                {/* End: Customer details */}

            <div className="text-right mt-5">
              <Button type="submit" className="w-30" processing={processing}>
                Go
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
