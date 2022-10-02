import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Checkbox from "@/components/Checkbox";

function Create(props) {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    email_password_to_user: false,
    role: 'restaurant_admin',
    restaurant_id: props.auth.user.restaurant_id,
  })

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
      e.preventDefault();

      post(route('restaurant.users.store'));
  };

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={8}
            activeItem={1}
        >

    <div className="col-span-12">
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add new admin user</h2>
      </div>
      <div className="flex items-center mt-3 intro-y">
        <p className="text-gray-600">Fill in the following details to add a new user</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Layout */}

          <form className="p-5 intro-y box" onSubmit={submit} method="post">
            {/* First Name Form Group */}
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                First Name
              </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="first_name"
                    value={data.first_name}
                    placeholder="First Name"
                    onChange={onHandleChange}
                    error={errors.first_name}
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
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
            <div className="pt-3 mt-3">
                <Checkbox
                    name="email_password_to_user"
                    checked={data.email_password_to_user}
                    onChange={onHandleChange}
                />
                <span className="ml-2 text-black-600">Email password to new admin user?</span>
            </div>
            <div className="mt-5 text-right">
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
