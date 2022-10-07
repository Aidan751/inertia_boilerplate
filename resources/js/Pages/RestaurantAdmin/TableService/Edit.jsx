import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";

export default function Edit(props) {

    const { data, setData, put, processing, errors } = useForm({
      table_number: props.tableNumber.table_number,
      table_reference: props.tableNumber.table_reference,
    })

    const onHandleChange = (event) => {
      setData(event.target.name, event.target.value)
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('restaurant.tables.update',{tableNumber:props.tableNumber.id}));
    };

    return (
      <>
          <Authenticated
              auth={props.auth}
              errors={props.errors}
              activeGroup={13}
          >

      <div className="col-span-12">
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Manage Tables</h2>
        </div>
        <div className="intro-y flex items-center mt-3">
          <p className="text-gray-600">Fill in the following details to edit table</p>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 lg:col-span-6">
            {/* BEGIN: Form Layout */}

            <form className="intro-y box p-5" onSubmit={submit} method="post">
              {/* start: value */}
              <div className="mt-3">
                <Label
                  value="Table #"
                  required={true}
                  forInput="table_number"
                  className="font-medium"
                  />

                  {/* start: description */}
                  <p className="text-xs text-gray-600 mt-2">Easily number your table</p>
                  {/* end: description */}
                <Input
                  id="table_number"
                  name="table_number"
                  type="text"
                  placeholder="Table #"
                  value={data.table_number}
                  setData={setData}
                  error={errors.table_number}
                  />
                {errors.name && (
                  <div className="text-theme-6 mt-2">{errors.name}</div>
                  )}
              </div>
              {/* end: value */}
              {/* start: description */}
              <div className="mt-5">
                  <Label
                      value="Reference"
                      forInput="table_reference"
                  />
                  {/* start: description */}
                  <p className="text-xs text-gray-600 mt-2">Give your table number an internal only reference, this can be used to aid where tables are in your facility</p>
                  {/* end: description */}
                  <TextArea
                      id="table_reference"
                      name="table_reference"
                      placeholder="Reference"
                      value={data.table_reference}
                      setData={setData}
                  />
                  {errors.description && (
                      <div className="text-theme-6 mt-2">{errors.description}</div>
                  )}
              </div>
              {/* end: description */}
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
