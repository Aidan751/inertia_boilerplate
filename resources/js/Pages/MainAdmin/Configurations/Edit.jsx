import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import ValidationSuccess from "@/components/ValidationSuccess";

function Edit(props) {
  const [categories, setCategories] = useState([1, 3]);

  const { data, setData, put, processing, errors } = useForm({
        mile: props.configuration.mile,
        minute: props.configuration.minute,
  })


  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
      e.preventDefault();
      put(route('admin-configurations.update', { id: props.configuration.id }));
  };


  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={6}
            activeItem={1}

        >

    <div className="col-span-12">
   {/* Show Success Validation Component */}
   {
        props.success &&
        <ValidationSuccess message={props.success} />
    }
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Delivery Costs</h2>
      </div>
      <div className="flex items-center mt-3 intro-y">
        <p className="text-gray-600">The prices below will determine the delivery costs across the app. Total cost of miles + cost of approximate time = Delivery cost.</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Layout */}
          <form className="p-5 intro-y box" onSubmit={submit} method="post">
            <div className="mt-3">
                <label className="form-label">Price per Mile</label>
                <input
                    type="number"
                    step="any"
                    className="rounded form-control"
                    placeholder="Mile"
                    name="mile"
                    value={data.mile}
                    onChange={onHandleChange}
                />
                {errors.mile && <span className="text-theme-6">{errors.mile}</span>}
            </div>
            <div className="mt-3">
                <label className="form-label">Price per Minute</label>
                <input
                    type="number"
                    step="any"
                    className="rounded form-control"
                    placeholder="Minute"
                    name="minute"
                    value={data.minute}
                    onChange={onHandleChange}
                />
                {errors.minute && <span className="text-theme-6">{errors.minute}</span>}
            </div>

            <div className="mt-5 text-right">
              <Button type="submit" className="w-30">
                Update
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

export default Edit;
