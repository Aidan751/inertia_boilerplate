import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Checkbox from "@/components/Checkbox";

function Edit(props) {
    console.log(props);
  const [categories, setCategories] = useState([1, 3]);

  const { data, setData, put, processing, errors } = useForm({
    iCabbi: props.driver.iCabbi ?? '',
    first_name: props.driver.user.first_name,
    last_name: props.driver.user.last_name,
  })

  const editorConfig = {
    toolbar: {
      items: ["bold", "italic", "link"],
    },
  };

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
      e.preventDefault();
      put(route('admin-driver.update', { id: props.driver.id }));
  };


  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={4}
        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Update Driver</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill in the following details to edit driver</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* First Name Form Group */}
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                First Name
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="first_name"
                required
                value={data.first_name}
                readOnly
              />
               {errors.first_name && (
                    <p className="text-xs italic text-red-500">
                        {errors.first_name}
                    </p>
                )}
            </div>
            {/* Last Name Form Group */}
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Last Name
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="last_name"
                required
                value={data.last_name}
                readOnly
              />
                {errors.last_name && (
                    <p className="text-xs italic text-red-500">
                        {errors.last_name}
                    </p>
                )}
            </div>
            {/* START: iCabbi form group */}
            <div className="mt-3">
                <label htmlFor="crud-form-1" className="form-label">
                    iCabbi #
                </label>
                <input
                    id="crud-form-1"
                    type="text"
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="iCabbi..."
                    name="iCabbi"
                    required
                    value={data.iCabbi}
                    onChange={onHandleChange}
                />
                {errors.iCabbi && (
                    <p className="text-xs italic text-red-500">
                        {errors.iCabbi}
                    </p>
                )}
            </div>
            {/* END: iCabbi form group */}
            <div className="text-right mt-5">
              <Button type="submit" className="w-30">
                Update driver
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
