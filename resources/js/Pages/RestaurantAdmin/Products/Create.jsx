import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import MidoneUpload from "@/Components/MidoneUpload";
import { X } from "lucide-react";

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

const [sizes, setSizes] = useState([{
    id: 1,
    size: '',
    additional_charge: ''
}]);

const [extras, setExtras] = useState([]);

const addSizes = () => {
    setSizes([
        ...sizes,
        {
            id: sizes.length + 1,
            size: "",
            additional_charge: ""
        },
    ]);
    console.log(sizes);
}

const addExtras = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    console.log(props.extras);
    props.extras.forEach(extra => {
    if (extra.id == e.target.value) {
    setExtras([
        ...extras,
        {
            id: extra.id,
            name: extra.name,
            additional_charge: extra.additional_charge,
        },
    ])
}
})
}

   // to input elements and record their values in state
   const handleSizeInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizes];
    list[index][name] = value;
    setSizes(list);
};

const handleExtraInputChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    const { name, value } = e.target;
    const list = [...extras];
    list[name] = value;
    setExtras(list);
    console.log(name, value, list);
};

  // user click yes delete a specific row of id:i
  const handleSizeRemoveClick = (i) => {
    const list = [...sizes];
    list.splice(i, 1);
    setSizes(list);
};

const handleExtraRemoveClick = (i) => {
    const list = [...extras];
    list.splice(i, 1);
    setExtras(list);
};


const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

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
                sizes.map((size, i) => {
                    return (
        <>

                    <div className="mb-6 mt-10">
                        <label
                            className="block mb-3 text-md font-medium text-sm text-gray-600 dark:text-gray-400"
                            htmlFor="size"
                        >
                            Add size option if applicable
                        </label>
                        <input
                            className="w-full px-3 py-2 pl-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="text"
                            name="size"
                            value={size.size}
                            onChange={(e) => handleSizeInputChange(e, i)}
                        />

                        {errors.size && (
                            <p className="text-xs italic text-red-500">
                                {errors.size}
                            </p>
                        )}
                    </div>

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
                            type="text"
                            name="additional_charge"
                            value={size.additional_charge}
                            onChange={(e) => handleSizeInputChange(e, i)}
                        />
                        </div>
                        {errors.additional_charge && (
                            <p className="text-xs italic text-red-500">
                                {errors.additional_charge}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                    <button
                        className="btn btn-danger-soft h-7 text-sm border-none"
                        type="button"
                        onClick={() => handleSizeRemoveClick(i)}
                    >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                    </button>
                    </div>
                    </>
                    );

                })
            }
            {/* Start: Button to add another size option with an additional charge */}
                <div className="mb-6 flex justify-start">
                    <Button
                        className="btn btn-primary mr-3"
                        type="button"
                        click={addSizes}
                    >
                        Add another
                    </Button>
                </div>
            {/* End: Button to add another size option with an additional charge */}
            {/* start: select extras title and description */}
                <div className="mb-6">
                        <div className="intro-y flex items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto">Select Extra</h2>
                        </div>
                        <div className="intro-y flex items-center mt-3 mb-3">
                            <p className="text-gray-600">Search and select all the extras to be added to the product</p>
                        </div>
                    <select
                        className="w-full px-3 py-2 pl-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="extras"
                        type="text"
                        name="extras"
                        value={data.extras}
                        onChange={(e) => addExtras(e)}
                    >
                        <option value="">Select Extras</option>
                        {props.extras.map((extra, key) => (
                            <option key={key} value={extra.id}>
                                {extra.name}
                            </option>
                        ))}
                    </select>
                    {errors.extras && (
                        <p className="text-xs italic text-red-500">
                            {errors.extras}
                        </p>
                    )}
                </div>
            {/* end: select extras title and description */}
            {/* start: table mapping extras added to group deal */}
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-no-wrap">EXTRA NAME</th>
                                <th className="whitespace-no-wrap">ADDITIONAL CHARGE</th>
                                <th className="whitespace-no-wrap text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extras.map((extra, key) => {
                               return ( <tr key={key} className="intro-x">
                                    <td>
                                        <a href="" className="font-medium whitespace-no-wrap">
                                            {extra.name}
                                        </a>
                                    </td>
                                    <td>
                                        {extra.additional_charge ?? "N/A"}
                                    </td>
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                          <button
                                             className="btn btn-danger-soft h-7 text-sm border-none"
                                             type="button"
                                             onClick={() => handleExtraRemoveClick(key)}
                                           >
                                            <X className="w-4 h-4 mr-1" />
                                            Remove
                                          </button>
                                        </div>
                                    </td>
                                </tr>
                               )
                            })}
                        </tbody>
                    </table>
                </div>
            {/* end: table mapping extras added to group deal */}


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
