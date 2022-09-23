import Button from "@/Components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";

export default function Create(props) {

    const [option, selectedOption] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        allows_table_orders: 0,
        allows_collection: 0,
        allows_delivery: 0,
        allows_call_center: 0,
        categories: props.restaurant.categories,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.restaurants.store"));
    }

    function handleCategoryChange(e) {
        let value = e.target.value;
        selectedOption(value);
    }

    return (
        <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

        <div className="col-span-12">
            <div className="intro-y flex items-center mt-8 mb-5 ">
                <h2 className="text-lg font-medium mr-auto">Add new Business</h2>
            </div>
            <div className="intro-y flex items-center mb-5">
                <p className="text-gray-600">Fill in the following details to add a new Business</p>
            </div>

            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="px-10">
                        <div className="mb-3 mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-600">Internal Only</label>
                            <div className="flex items-center py-5">

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


                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="address"
                            >
                                Address
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            {errors.address && (
                                <p className="text-xs italic text-red-500">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="phone"
                            >
                                Phone
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            {errors.phone && (
                                <p className="text-xs italic text-red-500">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

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

                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="website"
                            >
                                Website
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="website"
                                type="text"
                                name="website"
                                value={data.website}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                            />
                            {errors.website && (
                                <p className="text-xs italic text-red-500">
                                    {errors.website}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-xs italic text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

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
                               {data.categories && data.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}

                            </select>
                            {errors.categories && (
                                <p className="text-xs italic text-red-500">
                                    {errors.categories}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="image"
                            >
                                Image
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                name="image"
                                value={data.image}
                                onChange={(e) =>
                                    setData("image", e.target.value)
                                }
                            />
                            {errors.image && (
                                <p className="text-xs italic text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
        </>

)}



