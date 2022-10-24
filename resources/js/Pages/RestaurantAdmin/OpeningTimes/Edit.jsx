import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { X } from "lucide-react";
import { useForm } from "@inertiajs/inertia-react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Title from "@/Components/Title";

export default function Edit(props) {
  const { data, setData, put, processing, errors } = useForm({
  });



const handleFromChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...openHours];
    list[index].times[0].from = value;
    setOpenHours(list);
};

const handleToChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...openHours];
    list[index].times[0].to = value;
    setOpenHours(list);
};

const addOpeningTime = (e, index) => {
    e.preventDefault();
    const list = [...openHours];
    list[index].times.push({from: "", to: ""});
    setOpenHours(list);
};

const removeOpeningTime = (e, index, timeIndex) => {
    e.preventDefault();
    const list = [...openHours];
    list[index].times.splice(timeIndex, 1);
    setOpenHours(list);
};

const[openHours, setOpenHours] = useState([
    {
        day: "Monday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Tuesday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Wednesday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Thursday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Friday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Saturday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    },
    {
        day: "Sunday",
        times: [
            {
                from: "10:00",
                to: "20:00"
            }
        ]
    }

]);



  const submit = (e) => {
    e.preventDefault();
    put(
      route("restaurant.operating-hours.update")
    );
  };

  return (
    <>
      <Authenticated auth={props.auth} errors={props.errors} activeGroup={12}>
        <div className="col-span-12">
          {/* <Title
            title="Update
                    Opening and Collection Times "
            subtitle="Fill in the details below for your opening and collection times. You can select multiple time periods per day (i.e. if you're open for lunch and close before the evening). The opening times will be displayed on your mini profile on the app, and also combine to be your delivery time availability. "
            /> */}
          <div className="grid grid-cols-12 mt-5">
            <div className="intro-y col-span-12">
              {/* BEGIN: Form Layout */}
              <form
                className="intro-y box sm:p-5 p-2"
                onSubmit={submit}
                method="post"
              >
                {/* start: opening times */}
                <div className="intro-y col-span-12 overflow-auto">
                  <div className="intro-y box p-5">
                    <div className="flex items-center">
                      <h2 className="font-medium text-base mr-auto mt-5 mb-5">
                        Opening Times
                      </h2>
                    </div>
                    <div className="grid grid-cols-12 sm:gap-6 gap-2">
                      {openHours.map((day, index) => {
                        return (
                          <>
                            <h2 className="col-span-12 text-md font-medium mt-5">
                              {day.day}
                            </h2>

                            {day.times &&
                              day.times.map((time, key) => (
                                <>
                                  <div className="sm:col-span-4 col-span-12 row-span-1 flex sm:flex-nowrap flex-wrap items-center">
                                    <label className="mr-2 sm:mb-0 mb-2">
                                      From
                                    </label>

                                    <input
                                      type="time"
                                      name="from"
                                      value={day.times[key].from}
                                      id={key}
                                      onChange={(e) =>
                                        handleFromChange(e, index)
                                      }
                                      min="00:00"
                                      max="23:59"
                                      className="form-control border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    />
                                  </div>

                                  <div className="sm:col-span-1 col-span-12 flex items-center justify-center">
                                    <div className="sm:mt-0 mt-5">-</div>
                                  </div>
                                  <div className="sm:flex-nowrap flex-wrap sm:no-wrap sm:col-span-4 col-span-12 flex items-center">
                                    <label className="mr-2 sm:mb-0 mb-2">
                                      To
                                    </label>

                                    <input
                                      type="time"
                                      name="to"
                                      value={day.times[key].to}
                                      onChange={(e) => handleToChange(e, index)}
                                      min="00:00"
                                      max="23:59"
                                      className="form-control border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    />
                                  </div>
                                </>
                              ))}

                            <div className="sm:col-span-3 col-span-12 flex items-center gap-3 sm:mt-0 sm:mb-0 mb-3 mt-3 items-end">
                              <Button
                                className="btn btn-primary text-white"
                                type="button"
                                click={(e) => {
                                  addOpeningTime(e, index);
                                }}
                              >
                                Add another
                              </Button>

                              <button
                                className="btn btn-danger-soft text-sm border-none"
                                type="button"
                                onClick={(e) => {
                                  removeOpeningTime(e, index);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
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
