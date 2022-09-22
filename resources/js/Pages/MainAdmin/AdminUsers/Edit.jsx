import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'

function Edit(props) {
    // console.log(props.user.first_name);
  const [categories, setCategories] = useState([1, 3]);

  const { data, setData, put, processing, errors } = useForm({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    email: props.user.email,
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

      put(route('admin-user.edit', { id: props.user.id }));
  };


  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Edit admin user</h2>
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
                className="form-control w-full"
                placeholder="First name..."
                name="first_name"
                required
                value={data.first_name}
                onChange={onHandleChange}
              />
            </div>
            {/* Last Name Form Group */}
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Last Name
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="form-control w-full"
                placeholder="Last name..."
                name="last_name"
                required
                value={data.last_name}
                onChange={onHandleChange}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Email address
              </label>
                <input
                    id="crud-form-2"
                    type="email"
                    required
                    className="form-control w-full"
                    placeholder="Email address..."
                    name="email"
                    value={data.email}
                    onChange={onHandleChange}
                />
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
                    className="form-control w-full"
                    placeholder="Password..."
                />

                <input
                    id="crud-form-4"
                    type="password"
                    name="password_confirmation"
                    required
                    value={data.password_confirmation}
                    onChange={onHandleChange}
                    className="form-control w-full mt-3"
                    placeholder="Repeat password..."
                />
              </div>
            <div className="mt-3 pt-3">
                <input type="checkbox"
                  className="input border mr-2"
                  id="input-1"
                  name="email_password_to_user"
                  value={data.email_password_to_user}
                  onChange={onHandleChange} />
                <span className="text-black-600 ml-2">Email password to new admin user?</span>
            </div>
            <div className="text-right mt-5">
              <Button type="submit" className="w-30">
                Update Admin User
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
