import Button from "@/Components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";

export default function Create(props) {
console.log(props);
    const [option, selectedOption] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address_line_1: "",
        address_line_2: "",
        town: "",
        county: "",
        postcode: "",
        contact_number: "",
        email: "",
        password: "",
        password_confirmation: "",
        bio: "",
        allows_table_orders: 0,
        allows_collection: 0,
        allows_delivery: 0,
        allows_call_center: 0,
        category: "",
        logo: "",
        banner: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin-restaurants.store"));
    }

    function handleCategoryChange(e) {
        let value = e.target.value;
        data.category = value;
        selectedOption(value);
    }

    return (
        <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

        <div className="col-span-12">
            <div className="intro-y flex items-center mt-5 mb-5">
                <h2 className="text-lg font-medium mr-auto">Add new Business</h2>
            </div>
            <div className="intro-y flex items-center mb-5">
                <p className="text-gray-600">Fill in the following details to add a new Business</p>
            </div>

            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className="px-10">
                    {/* Start: Interal Only Section */}
                        <div className="mb-3 mt-8">
                            <label className="block mb-2 text-sm font-medium text-gray-600">Internal Only</label>
                            <div className="flex items-center py-3">

                                <input
                                    type="checkbox"
                                    className="input border mr-2"
                                    name="allows_table_orders"
                                    id="allows_table_orders"
                                    value={data.allows_table_orders}
                                    onChange={e => setData("allows_table_orders", e.target.checked ? 1 : 0)}
                                />
                                <label className="cursor-pointer select-none" htmlFor="allows_table_orders">Table Service</label>

                                <input
                                    type="checkbox"
                                    className="input border mr-2 ml-4"
                                    name="allows_collection"
                                    id="allows_collection"
                                    value={data.allows_collection}
                                    onChange={e => setData("allows_collection", e.target.checked ? 1 : 0)}
                                />
                                <label className="cursor-pointer select-none" htmlFor="allows_collection">Collection</label>

                                <input
                                    type="checkbox"
                                    className="input border mr-2 ml-4"
                                    name="allows_delivery"
                                    id="allows_delivery"
                                    value={data.allows_delivery}
                                    onChange={e => setData("allows_delivery", e.target.checked ? 1 : 0)}
                                />
                                <label className="cursor-pointer select-none" htmlFor="allows_delivery">Delivery</label>

                                <input
                                    type="checkbox"
                                    className="input border mr-2 ml-4"
                                    name="allows_call_center"
                                    id="allows_call_center"
                                    value={data.allows_call_center}
                                    onChange={e => setData("allows_call_center", e.target.checked ? 1 : 0)}
                                />
                                <label className="cursor-pointer select-none" htmlFor="allows_call_center">Call Center</label>

                                </div>
                        </div>
                    {/* End: Interal Only Section */}
                    {/* Start: Business Name */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="name"
                            >
                                Business Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="Business Name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-xs italic text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    {/* End: Business Name */}
                      {/* Start: Business Logo */}
                      <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="logo"
                            >
                                Logo
                            </label>
                            <input
                                className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="logo"
                                type="file"
                                name="logo"
                                value={data.logo}
                                onChange={(e) =>
                                    setData("logo", e.target.value)
                                }
                            />
                            {errors.image && (
                                <p className="text-xs italic text-red-500">
                                    {errors.logo}
                                </p>
                            )}
                        </div>
                    {/* End: Business Logo */}
                    {/* Start: Business Banner */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="banner"
                            >
                                Banner Image
                            </label>
                            <input
                                className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="banner"
                                type="file"
                                name="banner"
                                value={data.banner}
                                onChange={(e) =>
                                    setData("banner", e.target.value)
                                }
                            />
                            {errors.image && (
                                <p className="text-xs italic text-red-500">
                                    {errors.banner}
                                </p>
                            )}
                        </div>
                    {/* End: Business Banner */}
                     {/* Start: Business Categories */}
                     <div className="mb-6">
                            <label

                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="categories"
                            >
                                Category
                            </label>
                            <select
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="categories"
                                type="text"
                                name="categories"
                                value={option}
                                onChange={handleCategoryChange}
                            >
                               {props.restaurant.categories && props.restaurant.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}

                            </select>
                            {errors.category && (
                                <p className="text-xs italic text-red-500">
                                    {errors.category}
                                </p>
                            )}

                        </div>
                    {/* End: Business Categories */}
                    {/* Start: Business Address */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="address"
                            >
                                Address
                            </label>
                            <input
                                className="w-full mb-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="address_line_1"
                                type="text"
                                name="address_line_1"
                                value={data.address_line_1}
                                placeholder="Address Line 1"
                                onChange={(e) =>
                                    setData("address_line_1", e.target.value)
                                }
                            />
                            {errors.address_line_1 && (
                                <p className="text-xs italic text-red-500">
                                    {errors.address_line_1}
                                </p>
                            )}

                            <input
                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="address_line_2"
                                type="text"
                                name="address_line_2"
                                value={data.address_line_2}
                                placeholder="Address Line 2"
                                onChange={(e) =>
                                    setData("address_line_2", e.target.value)
                                }
                            />
                            {errors.address_line_2 && (
                                <p className="text-xs italic text-red-500">
                                    {errors.address_line_2}
                                </p>
                            )}

                            <input
                                className="w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="town"
                                type="text"
                                name="town"
                                value={data.town}
                                placeholder="Town"
                                onChange={(e) =>
                                    setData("town", e.target.value)
                                }
                            />
                            {errors.town && (
                                <p className="text-xs italic text-red-500">
                                    {errors.town}
                                </p>
                            )}

                            <input
                                className="w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="county"
                                type="text"
                                name="county"
                                value={data.county}
                                placeholder="County"
                                onChange={(e) =>
                                    setData("county", e.target.value)
                                }
                            />
                            {errors.county && (
                                <p className="text-xs italic text-red-500">
                                    {errors.county}
                                </p>
                            )}

                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="postcode"
                                type="text"
                                name="postcode"
                                value={data.postcode}
                                placeholder="Postcode"
                                onChange={(e) =>
                                    setData("postcode", e.target.value)
                                }
                            />
                            {errors.postcode && (
                                <p className="text-xs italic text-red-500">
                                    {errors.postcode}
                                </p>
                            )}

                        </div>
                    {/* End: Business Address */}
                    {/* Start: Business Contact Number */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="contact_number"
                            >
                                Business Contact Number
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="contact_number"
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                placeholder="Contact Number"
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                            />
                            {errors.contact_number && (
                                <p className="text-xs italic text-red-500">
                                    {errors.contact_number}
                                </p>
                            )}
                        </div>
                    {/* End: Business Contact Number */}
                    {/* Start: Business Bio */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="bio"
                            >
                                Bio
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="bio"
                                type="text"
                                name="bio"
                                placeholder="Bio"
                                value={data.bio}
                                onChange={(e) =>
                                    setData("bio", e.target.value)
                                }
                            />
                            {errors.bio && (
                                <p className="text-xs italic text-red-500">
                                    {errors.bio}
                                </p>
                            )}
                        </div>
                    {/* End: Business Bio */}



                    <hr className="mb-6 border-t" />
                    {/* start: title for restaurant user access */}
                    <h3 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Restaurant User Access
                    </h3>
                    {/* end: title for restaurant user access */}
                    {/* Start: Business Email */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-xs italic text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    {/* End: Business Email */}
                    {/* Start: Business Set Password */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="password"
                            >
                                Set Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="text-xs italic text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    {/* End: Business Set Password */}
                    {/* Start: Business Confirm Password */}
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="password_confirmation"
                            >
                                Repeat Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="password_confirmation"
                                type="password"
                                placeholder="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs italic text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>
                    {/* End: Business Confirm Password */}

                    {/* Start: Submit Button */}
                        <div className="mb-6">
                        <Button type="submit" className="w-30">
                            Add
                        </Button>
                        </div>
                    {/* End: Submit Button */}
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
        </>

)}



