import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";

export default function Edit(props) {
  const { data, setData, put, processing, errors } = useForm({
    opening_hours: props.opening_hours,
    collection_times: props.collection_times,
    from_monday_opening_hours: props.from_monday_opening_hours,
    from_monday_collection_times: props.from_monday_collection_times,
    from_tuesday_opening_hours: props.from_tuesday_opening_hours,
    from_tuesday_collection_times: props.from_tuesday_collection_times,
    from_wednesday_opening_hours: props.from_wednesday_opening_hours,
    from_wednesday_collection_times: props.from_wednesday_collection_times,
    from_thursday_opening_hours: props.from_thursday_opening_hours,
    from_thursday_collection_times: props.from_thursday_collection_times,
    from_friday_opening_hours: props.from_friday_opening_hours,
    from_friday_collection_times: props.from_friday_collection_times,
    from_saturday_opening_hours: props.from_saturday_opening_hours,
    from_saturday_collection_times: props.from_saturday_collection_times,
    from_sunday_opening_hours: props.from_sunday_opening_hours,
    from_sunday_collection_times: props.from_sunday_collection_times,
    to_monday_opening_hours: props.to_monday_opening_hours,
    to_monday_collection_times: props.to_monday_collection_times,
    to_tuesday_opening_hours: props.to_tuesday_opening_hours,
    to_tuesday_collection_times: props.to_tuesday_collection_times,
    to_wednesday_opening_hours: props.to_wednesday_opening_hours,
    to_wednesday_collection_times: props.to_wednesday_collection_times,
    to_thursday_opening_hours: props.to_thursday_opening_hours,
    to_thursday_collection_times: props.to_thursday_collection_times,
    to_friday_opening_hours: props.to_friday_opening_hours,
    to_friday_collection_times: props.to_friday_collection_times,
    to_saturday_opening_hours: props.to_saturday_opening_hours,
    to_saturday_collection_times: props.to_saturday_collection_times,
    to_sunday_opening_hours: props.to_sunday_opening_hours,
    to_sunday_collection_times: props.to_sunday_collection_times,
  });

  const submit = (e) => {
    e.preventDefault();
    put(
      route("restaurant.operating-hours.update")
    );
  };

  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors} activeGroup={13}>
        <div className="col-span-12">
          <div className="intro-y flex items-center mt-8">
            <h2 className="text-lg font-medium mr-auto">
              Opening and Collection Times
            </h2>
          </div>
          <div className="intro-y flex items-center mt-3">
            <p className="text-gray-600">
              Fill in the details below for your opening and collection times.
              You can select multiple time periods per day (i.e. if you're open
              for lunch and close before the evening). The opening times will be
              displayed on your mini profile on the app, and also combine to be
              your delivery time availability.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}

              <form className="intro-y box p-5" onSubmit={submit} method="post">
                {/* start: opening times */}
                <div className="intro-y col-span-12 lg:col-span-6">
                  <div className="intro-y box p-5">
                    <div className="flex flex-col sm:flex-row items-center">
                      <h2 className="font-medium text-base mr-auto">
                        Opening Times
                      </h2>
                    </div>
                    {/* start: monday to and from opening hours */}
                    <div className="flex flex-col sm:flex-row items-center mt-3">
                      <Label className="w-full sm:w-40 sm:text-right sm:mr-5">
                        Monday
                      </Label>
                      <div className="w-full sm:w-40">
                        <Input
                          className="input border mt-2 flex-1"
                          type="time"
                          name="from_monday_opening_hours"
                          value={data.from_monday_opening_hours}
                          setData={setData}
                        />{" "}
                        -{" "}
                        <Input
                          className="input border mt-2 flex-1"
                          type="time"
                          name="to_monday_opening_hours"
                          value={data.to_monday_opening_hours}
                          setData={setData}
                        />
                        {/* start: button to add another opening time for monday */}
                        <Button
                          className="button bg-theme-1 text-white mt-5"
                          type="button"
                          onClick={() => {
                            setData(
                              "monday_opening_hours",
                              data.monday_opening_hours.concat({
                                from_monday_opening_hours: "",
                                to_monday_opening_hours: "",
                              })
                            );
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for monday */}
                      </div>
                    </div>
                  </div>
                  {/* end: monday to and from opening hours */}
                </div>
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
