import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'

function Create(props) {

  const [categories, setCategories] = useState([1, 3]);

  const { data, setData, post, processing, errors } = useForm({
    name: '',
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

      post(route('admin-restaurantcategories.store'));
  };


  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={3}
            activeItem={1}
        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add new category</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill in the following details to add a new category</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* Name Form Group */}
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Category
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Category..."
                name="name"
                required
                value={data.name}
                onChange={onHandleChange}
              />
            </div>

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
