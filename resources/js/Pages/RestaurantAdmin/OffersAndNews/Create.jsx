import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import MidoneUpload from "@/Components/MidoneUpload";
import { X } from "lucide-react";
import Title from "@/Components/Title";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";

function Create(props) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState({
    image: null,
  });

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
    post(route("restaurant.offers.store"));
  };

  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors}
           activeGroup={14}
           activeItem={1}>
        <div className="col-span-12">
         <Title
            title="Add Offer/News"
            description="Add a new offer or news to your restaurant"
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
                    Add
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
