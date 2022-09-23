import Button from "@/Components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";

export default function Create(props) {

    const [categories, setCategories] = useState(props.restaurant.categories);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        categories: props.restaurant.categories,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.restaurants.store"));
    }

    function handleCategoryChange(e) {
        console.log(e.target.value);
        let value = e.target.value;
        let index = categories.indexOf(value);
        if (index > -1) {
            categories.splice(index, 1);
        }
        else {
            categories.push(value);
        }
    }

    return (
        <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

        <div className="col-span-12">
            <h1 className="mb-8 font-bold text-3xl">Create Restaurant</h1>

            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="px-10 py-5">
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                htmlFor="name"
                            >
                                Name
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
                                Categories
                            </label>
                            <select
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="categories"
                                type="text"
                                name="categories"
                                value={categories}
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



