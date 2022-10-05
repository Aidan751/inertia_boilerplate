import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'

function Create(props) {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    additional_charge: '',
  })

  const editorConfig = {
    toolbar: {
      items: ["bold", "italic", "link"],
    },
  };

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
  };

  const submit = (e) => {
      e.preventDefault();
      post(route('restaurant.extras.store'));
  };

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={10}
            activeItem={7}
        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Product Extras</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill in the following details to add a new extra</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* start: title */}
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label mb-3 text-md font-medium">
                title
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Title..."
                name="name"
                value={data.name}
                onChange={onHandleChange}
              />
              {errors.name && (
                <div className="text-theme-6 mt-2">{errors.name}</div>
                )}
            </div>
            {/* end: title */}
            {/* start: description */}
            <div className="mt-5">
                <label htmlFor="crud-form-1" className="form-label text-md font-medium mb-3">
                    description
                </label>
               <textarea
                id="crud-form-1"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Description..."
                name="description"
                value={data.description}
                onChange={onHandleChange}
                />
                {errors.description && (
                    <div className="text-theme-6 mt-2">{errors.description}</div>
                )}
            </div>
            {/* end: description */}
            {/* start: additional_charge */}
            <div className="mt-5">
                <label htmlFor="crud-form-1" className="form-label text-md font-medium">
                    additional charge if applicable
                </label>
                <div className="flex items-center">
                <p className="mr-4 text-sm">£</p>
                <input
                    id="crud-form-1"
                    type="text"
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="additional_charge..."
                    name="additional_charge"
                    value={data.additional_charge}
                    onChange={onHandleChange}
                />
                </div>
                {errors.additional_charge && (
                    <div className="text-theme-6 mt-2">{errors.additional_charge}</div>
                )}
            </div>
            {/* end: additional_charge */}

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

export default Create;
