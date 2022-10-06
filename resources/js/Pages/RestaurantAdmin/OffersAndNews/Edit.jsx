import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import MidoneUpload from "@/Components/MidoneUpload";
import { X } from "lucide-react";

function Edit(props) {
console.log(props);
  const { data, setData, post, processing, errors } = useForm({
    title: props.offer.title,
    description: props.offer.description,
    image: null,
    _method: 'PUT',
  });

  const [imageUrl, setImageUrl] = useState({
    image: props.offer.image,
  });

  const [sizes, setSizes] = useState(props.offer.sizes ?? []);

  const [extras, setExtras] = useState(props.offer.extras ?? []);

  const addSizes = () => {
    setSizes([
      ...sizes,
      {
        id: sizes.length + 1,
        size: "",
        additional_charge: "",
      },
    ]);
  };

  const addExtras = (e) => {
    setData(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
    data.existingExtras.forEach((extra) => {
        if (extra.id == e.target.value) {
            setExtras([
                ...extras,
                {
                    id: extra.id,
                    name: extra.name,
                    additional_charge: extra.additional_charge,
                },
            ]);
        }
    });
  };

  // to input elements and record their values in state
  const handleSizeInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizes];
    list[index][name] = value;
    setSizes(list);
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

  /**
   * Handle the file upload and set the state
   * @param {*} event Image file event
   */
  const onHandleImageChange = (event) => {
    // If there are files uploaded add them to image list
    if (event.target.files.length !== 0) {
      // Add Image File
      setData(event.target.name, event.target.files[0]);

      //  Set Preview Image
      const image = URL.createObjectURL(event.target.files[0]);

      // Get Data Structure
      let tempImageUrl = imageUrl;

      tempImageUrl[event.target.name] = image;
    } else {
      setData(event.target.name, null);
    }
  };

  const resetImageInput = (event) => {
    // Set the file input to null
    setData(event.target.id, null);

    //
    let tempImageUrl = imageUrl;

    tempImageUrl[event.target.id] = null;
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("restaurant.offers.update", props.offer.id));
  };

  return (
    <>
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      activeGroup={14}
      >
        <div className="col-span-12">
          <div className="intro-y flex items-center mt-8">
            <h2 className="text-lg font-medium mr-auto">Update offer/news</h2>
          </div>
          <div className="intro-y flex items-center mt-6">
            <p className="text-gray-600">
              Fill in the following details to update a new offer/news
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}
              <form className="intro-y box p-5" onSubmit={submit}>
                {/* Start: title */}
                <div className="mb-6">
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
                    placeholder="Title..."
                    name="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-xs italic text-red-500">
                      {errors.title}
                    </p>
                  )}
                </div>
                {/* End: title */}
                {/* Start: Image */}
                <MidoneUpload
                  name="image"
                  label="Cover Image"
                  value={data.image}
                  change={onHandleImageChange}
                  error={errors.image}
                  preview={imageUrl.image}
                  reset={resetImageInput}
                />
                {/* End: Image */}
                {/* Start: description */}
                <div className="mb-6 mt-8">
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
                    placeholder="Description..."
                    name="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-xs italic text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>
                {/* End: description */}
                <div className="text-right mt-5">
                  <Button type="submit" className="w-30">
                    Update
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
