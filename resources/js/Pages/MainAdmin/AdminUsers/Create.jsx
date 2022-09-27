import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Checkbox from "@/components/Checkbox";

function Create(props) {

  const [categories, setCategories] = useState([1, 3]);

  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    email_password_to_user: false,
    role: 'admin',
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

      post(route('admin-user.store'));
  };


  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={1}
            activeItem={1}
        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add new admin user</h2>
      </div>
      <div className="intro-y flex items-center mt-3">
        <p className="text-gray-600">Fill in the following details to add a new user</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

         {/* TODO: ask michael about csrf */}
          <form className="intro-y box p-5" onSubmit={submit} method="post">
            {/* First Name Form Group */}
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                First Name
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="First name..."
                name="first_name"
                required
                value={data.first_name}
                onChange={onHandleChange}
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
                placeholder="Last name..."
                name="last_name"
                required
                value={data.last_name}
                onChange={onHandleChange}
              />
                {errors.last_name && (
                    <p className="text-xs italic text-red-500">
                        {errors.last_name}
                    </p>
                )}
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Email address
              </label>
                <input
                    id="crud-form-2"
                    type="email"
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Email address..."
                    name="email"
                    value={data.email}
                    onChange={onHandleChange}
                />
                {errors.email && (
                    <p className="text-xs italic text-red-500">
                        {errors.email}
                    </p>
                )}
            </div>
            <div className="mt-3">
                <label htmlFor="crud-form-3" className="form-label">
                    Password
                </label>
                <input
                    id="crud-form-3"
                    type="password"
                    name="password"
                    required
                    value={data.password}
                    onChange={onHandleChange}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline mb-3"
                    placeholder="Password..."
                />
                {errors.password && (
                    <p className="text-xs italic text-red-500">
                        {errors.password}
                    </p>
                )}

                <input
                    id="crud-form-4"
                    type="password"
                    name="password_confirmation"
                    required
                    value={data.password_confirmation}
                    onChange={onHandleChange}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Repeat password..."
                />
                {errors.password_confirmation && (
                    <p className="text-xs italic text-red-500">
                        {errors.password_confirmation}
                    </p>
                )}
              </div>
            <div className="mt-3 pt-3">
                <Checkbox
                    name="email_password_to_user"
                    checked={data.email_password_to_user}
                    onChange={onHandleChange}
                />
                <span className="text-black-600 ml-2">Email password to new admin user?</span>
            </div>
            <div className="text-right mt-5">
              <Button type="submit" className="w-30">
                Add new Admin User
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
