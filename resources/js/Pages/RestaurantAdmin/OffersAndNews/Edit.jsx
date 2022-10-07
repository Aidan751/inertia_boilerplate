import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import MidoneUpload from "@/Components/MidoneUpload";
import Label from "@/Components/Label";
import { X } from "lucide-react";
import Input from "@/Components/Input";
import Title from "@/Components/Title";
import TextArea from "@/Components/TextArea";

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
    console.log(data);
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
         <Title
            title="Edit Offer"
            subtitle="Fill in the form below to edit an offer"
            />
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}
              <form className="intro-y box p-5" onSubmit={submit}>
                {/* Start: title */}
                <div className="mb-6">
                 <Label
                    forInput="title"
                    value="Title"
                    />
                 <Input
                    type="text"
                    name="title"
                    value={data.title}
                    setData={setData}
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
                  value={data.image}
                  labelValue="Cover Image"
                  change={onHandleImageChange}
                  error={errors.image}
                  preview={imageUrl.image}
                  reset={resetImageInput}
                />
                {/* End: Image */}
                {/* Start: description */}
                <div className="mb-6 mt-8">
                    <Label
                    forInput="description"
                    value="Description"
                    />
                    <TextArea
                    name="description"
                    value={data.description}
                    setData={setData}
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
