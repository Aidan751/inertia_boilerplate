import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Checkbox from "@/components/Checkbox";
import MidoneUpload from "@/Components/MidoneUpload";

export default function Edit( props ) {
    const [option, selectedOption] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.restaurant.name,
        address_line_1: props.restaurant.address_line_1,
        address_line_2: props.restaurant.address_line_2,
        town: props.restaurant.town,
        county: props.restaurant.county,
        postcode: props.restaurant.postcode,
        contact_number: props.restaurant.contact_number,
        email: props.user.email,
        password: props.user.password,
        password_confirmation: props.user.password_confirmation,
        bio: props.restaurant.bio,
        allows_table_orders: props.restaurant.allows_table_orders === 1 ? true : false,
        allows_collection: props.restaurant.allows_collection === 1 ? true : false,
        allows_delivery: props.restaurant.allows_delivery === 1 ? true : false,
        allows_call_center: props.restaurant.allows_call_center === 1 ? true : false,
        category: props.restaurant.restaurant_category_id,
        logo: null,
        banner: null,
        _method: 'PUT',
    });

    const [fileUrl, setFileUrl] = useState({
        logo: props.restaurant.logo.img_url,
        banner: props.restaurant.banner.img_url,
    });


    /**
     * Handle the file upload and set the state
     * @param {*} event Image file event
     */
    const onHandleFileChange = (event) => {

        // If there are files uploaded add them to image list
        if(event.target.files.length !== 0){

            // Add Image File
            setData(event.target.name,event.target.files[0]);

            //  Set Preview Image
            const file = URL.createObjectURL(event.target.files[0]);

            // Get Data Structure
            let tempFileUrl = fileUrl;

            tempFileUrl[event.target.name] = file;
        }
        else{
            setData(event.target.name,null);
        }
    }

    const resetFileInput = (event) => {

        // Set the file input to null
        setData(event.target.id,null);

        //
        let tempFileUrl = fileUrl;

        tempFileUrl[event.target.id] = null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-restaurants.update', props.restaurant.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('password', 'password_confirmation')
            }
        });
    }


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };


    return (
        <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            activeGroup={4}
        >

        <div className="col-span-12 overflow-auto">
            <div className="flex items-center mt-5 mb-5 intro-y">
                <h2 className="mr-auto text-lg font-medium">Update Business</h2>
            </div>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="px-10">
                    {/* Start: Interal Only Section */}
                        <div className="mt-8 mb-3">
                            <label className="block mb-2 text-sm font-medium text-gray-600">Internal Only</label>
                            <div className="flex items-center py-3">

                             <Checkbox
                                name="allows_table_orders"
                                value={data.allows_table_orders}
                                handleChange={onHandleChange}
                                checked={data.allows_table_orders === true ? "checked" : false}
                            />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_table_orders">Table Service</label>

                                <Checkbox
                                    name="allows_collection"
                                    value={data.allows_collection}
                                    handleChange={onHandleChange}
                                    checked={data.allows_collection === true ? "checked" : false}
                                />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_collection">Collection</label>

                             <Checkbox
                                name="allows_delivery"
                                value={data.allows_delivery}
                                handleChange={onHandleChange}
                                checked={data.allows_delivery === true ? "checked" : false}
                            />
                                <label className="mr-3 cursor-pointer select-none" htmlFor="allows_delivery">Delivery</label>

                                <Checkbox
                                    name="allows_call_center"
                                    value={data.allows_call_center}
                                    handleChange={onHandleChange}
                                    checked={data.allows_call_center === true ? "checked" : false}
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
                        {/* Start: logo */}
                        <div className="mb-6">
                            <MidoneUpload label="Logo Upload" change={onHandleFileChange} name="logo" preview={fileUrl.logo} reset={resetFileInput} />
                        </div>
                        {/* End: logo */}
                        {/* Start: banner */}
                        <div className="mb-6">
                            <MidoneUpload label="Banner Upload" change={onHandleFileChange} name="banner" preview={fileUrl.banner} reset={resetFileInput} />
                        </div>
                        {/* End: banner */}
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
                                name="categories"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)}
                            >
                                {props.restaurant.categories.map((category) => (
                                    <option id={category.id} value={category.id}>
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
                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
