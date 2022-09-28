import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Checkbox from "@/components/Checkbox";

export default function Show( props ) {
    console.log( props.restaurant );
    const [option, selectedOption] = useState(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: props.restaurant.name || '',
        address_line_1: props.restaurant.address_line_1 || '',
        address_line_2: props.restaurant.address_line_2 || '',
        town: props.restaurant.town || '',
        county: props.restaurant.county || '',
        postcode: props.restaurant.postcode || '',
        contact_number: props.restaurant.contact_number || '',
        email: props.restaurant.email || '',
        password: props.restaurant.password || '',
        password_confirmation: props.restaurant.password_confirmation || '',
        bio: props.restaurant.bio || '',
        allows_table_orders: props.restaurant.allows_table_orders || '',
        allows_collection: props.restaurant.allows_collection || '',
        allows_delivery: props.restaurant.allows_delivery || '',
        allows_call_center: props.restaurant.allows_call_center || '',
        category: props.restaurant.category || '',
        logo: props.restaurant.logo || '',
        banner: props.restaurant.banner || '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin-applications.approve', props.restaurant.id), {
            preserveScroll: true,
            onSuccess: () => {
            }
        });
    }

    const handleDecline = (e) => {
        e.preventDefault();
        delete(route('admin-applications.decline', props.restaurant.id), {
            preserveScroll: true,
            onSuccess: () => {
            }
        });
    }

    return (
        <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={4}
            activeItem={3}
        >

        <div className="col-span-12">
            <div className="intro-y flex items-center mt-5 mb-5">
                <h2 className="text-lg font-medium mr-auto">Business Application</h2>
            </div>

            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="px-10">
                    {/* Start: Interal Only Section */}
                        <div className="mb-3 mt-8">
                            <label className="block mb-2 text-sm font-medium text-gray-600">Internal Only</label>
                            <div className="flex items-center py-3">

                             <Checkbox
                                name="allows_table_orders"
                                value={data.allows_table_orders}
                                handleChange={(e) => setData('allows_table_orders', e.target.checked)}
                            />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_table_orders">Table Service</label>

                                <Checkbox
                                    name="allows_collection"
                                    value={data.allows_collection}
                                    handleChange={(e) => setData('allows_collection', e.target.checked)}
                                />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_collection">Collection</label>

                             <Checkbox
                                name="allows_delivery"
                                value={data.allows_delivery}
                                handleChange={(e) => setData('allows_delivery', e.target.checked)}
                            />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_delivery">Delivery</label>

                                <Checkbox
                                    name="allows_call_center"
                                    value={data.allows_call_center}
                                    handleChange={(e) => setData('allows_call_center', e.target.checked)}
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
                           <img src={data.logo} id="logo_img" alt="Logo" className="mb-3" />
                            <input
                                className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="logo"
                                type="file"
                                name="logo"
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
                            <img className="mb-3" id="banner_img" src={data.banner} alt="Banner" />
                            <input
                                className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="banner"
                                type="file"
                                name="banner"

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



                    {/* Start: Submit Button */}
                        <div className="mb-6">
                        <Button type="submit" className="w-30">
                           Update
                        </Button>
                        </div>
                    {/* End: Submit Button */}
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
        </>
    );

}
