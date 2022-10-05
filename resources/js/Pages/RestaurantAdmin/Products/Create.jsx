import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import MidoneUpload from "@/Components/MidoneUpload";

function Create(props) {
console.log(props);
  const { data, setData, post, processing, errors } = useForm({
    menu_category_id: '',
    restaurant_id: '',
    title: '',
    description: '',
    dietary_requirements: '',
    price: '',
    image: null,
    size: '',
    additional_charge: '',
    categories: props.categories,
    extras: props.extras
  })

  const [imageUrl, setImageUrl] = useState({
    image: null,
});

const [sizes, setSizes] = useState([]);

const [chosenExtras, setChosenExtras] = useState([]);

const addSizes = () => {
    const newSize = {
        size: '',
        additional_charge: ''
    }
    setSizes([...sizes, newSize]);
}

const removeSize = (index) => {
    const newSizes = sizes.filter((size, i) => i !== index);
    setSizes(newSizes);
}

const addExtras = () => {
    const newExtra = {
        extra_id: '',
    }
    setChosenExtras([...chosenExtras, newExtra]);
}

/**
 * Handle the file upload and set the state
 * @param {*} event Image file event
 */
const onHandleImageChange = (event) => {

    // If there are files uploaded add them to image list
    if(event.target.files.length !== 0){

        // Add Image File
        setData(event.target.name,event.target.files[0]);

        //  Set Preview Image
        const image = URL.createObjectURL(event.target.files[0]);

        // Get Data Structure
        let tempImageUrl = imageUrl;

        tempImageUrl[event.target.name] = image;
    }
    else{
        setData(event.target.name,null);
    }
}

const resetImageInput = (event) => {

    // Set the file input to null
    setData(event.target.id,null);

    //
    let tempImageUrl = imageUrl;

    tempImageUrl[event.target.id] = null;
}

const handleSizeChange = (i, e) => {
    const {name, value} = e.target;
    const newSizes = [...sizes];
    newSizes[i][name] = value;
    setSizes(newSizes);
}

const handleExtraChange = (i, e) => {
    const {name, value} = e.target;
    const newExtras = [...chosenExtras];
    newExtras[i][name] = value;
    setChosenExtras(newExtras);
}

  const submit = (e) => {
      e.preventDefault();
      post(route('restaurant.menu.items.index'));
  };

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Product</h2>
      </div>
      <div className="intro-y flex items-center mt-6">
        <p className="text-gray-600">Fill in the following details to add a new product</p>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}
          <form className="intro-y box p-5" onSubmit={submit}>
           <MidoneUpload
                name="image"
                label="Item Image"
                value={data.image}
                change={onHandleImageChange}
                error={errors.image}
                preview={imageUrl.image}
                reset={resetImageInput}
            />
            {/* Start: title */}
                <div className="mb-6 mt-6">
                    <label
                        className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) =>
                            setData("title", e.target.value)
                        }
                    />
                    {errors.title && (
                        <p className="text-xs italic text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>
            {/* End: title */}
            {/* Start: description */}
                <div className="mb-6">
                    <label
                        className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
            {/* End: description */}
            {/* Start: dietary_requirements */}
                <div className="mb-6">
                    <label
                        className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                        htmlFor="dietary_requirements"
                    >
                        Dietary Requirements
                    </label>
                    <textarea
                        className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="dietary_requirements"
                        type="text"
                        name="dietary_requirements"
                        value={data.dietary_requirements}
                        onChange={(e) =>
                            setData("dietary_requirements", e.target.value)
                        }
                    />
                    {errors.dietary_requirements && (
                        <p className="text-xs italic text-red-500">
                            {errors.dietary_requirements}
                        </p>
                    )}
                </div>
            {/* End: dietary_requirements */}
            {/* Start: price */}
                <div className="mb-6">
                    <label
                        className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                        htmlFor="price"
                    >
                        Regular Price
                    </label>
                    <input
                        className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        name="price"
                        value={data.price}
                        onChange={(e) =>
                            setData("price", e.target.value)
                        }
                    />
                    {errors.price && (
                        <p className="text-xs italic text-red-500">
                            {errors.price}
                        </p>
                    )}
                </div>
            {/* End: price */}
            {/* Start: Assign a category */}
                <div className="mb-6">
                    <label
                        className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                        htmlFor="category_id"
                    >
                        Assign a category
                    </label>
                    <select
                        className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="category_id"
                        type="text"
                        name="category_id"
                        value={data.category_id}
                        onChange={(e) =>
                            setData("category_id", e.target.value)
                        }
                    >
                        <option value="">Select a category</option>
                        {props.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <p className="text-xs italic text-red-500">
                            {errors.category_id}
                        </p>
                    )}
                </div>
            {/* End: Assign a category */}
            {
                sizes.map((size, index) => {

                {/* Start: Add size option  */}
                    <div className="mb-6 mt-10">
                        <label
                            className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                            htmlFor="size"
                        >
                            Add size option if applicable
                        </label>
                        <input
                            className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="size"
                            type="text"
                            name="size"
                            value={size}
                            onChange={(e) =>
                                setData("size", e.target.value)
                            }
                        />

                        {errors.size && (
                            <p className="text-xs italic text-red-500">
                                {errors.size}
                            </p>
                        )}
                    </div>
                {/* End: Add size option  */}
                {/* Start: Additional Charge */}
                    <div className="mb-6">
                        <label
                            className="block mb-3 text-sm text-gray-600 dark:text-gray-400"
                            htmlFor="additional_charge"
                        >
                            Additional Charge
                        </label>
                        <div className="flex items-center">
                        <p className="mr-5">£</p>
                        <input
                            className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="additional_charge"
                            type="text"
                            name="additional_charge"
                            value={data.additional_charge}
                            onChange={(e) =>
                                setData("additional_charge", e.target.value)
                            }
                        />
                        </div>
                        {errors.additional_charge && (
                            <p className="text-xs italic text-red-500">
                                {errors.additional_charge}
                            </p>
                        )}
                    </div>
                {/* End: Additional Charge */}
                })
            }
            {/* Start: Button to add another size option with an additional charge */}
                <div className="mb-6">
                    <Button
                        className="btn btn-primary"
                        type="button"
                    >
                        Add another
                    </Button>
                </div>
            {/* End: Button to add another size option with an additional charge */}
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
