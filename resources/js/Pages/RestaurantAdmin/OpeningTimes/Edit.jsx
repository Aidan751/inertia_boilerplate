import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import Title from "@/Components/Title";
import ValidationSuccess from "@/Components/ValidationSuccess";

export default function Edit(props) {
    const { data, setData, put, processing, errors } = useForm({});

    const handleFromChange = (e, index, key) => {
      const { name, value } = e.target;
      const list = [...openHours];
      list[index][0][key].from = value;
      setOpenHours(list);
    };

    const handleToChange = (e, index, key) => {
      const { name, value } = e.target;
      const list = [...openHours];
      list[index][0][key].to = value;
      setOpenHours(list);
    };

    const handleCollectionTimeFromChange = (e, index, key) => {
      const { name, value } = e.target;
      const list = [...collectionTimes];
      list[index][0][key].from = value;
      setCollectionTimes(list);
    };

    const handleCollectionTimeToChange = (e, index, key) => {
      const { name, value } = e.target;
      const list = [...collectionTimes];
      list[index][0][key].to = value;
      setCollectionTimes(list);
    };

    const addOpeningTime = (e, index) => {
      e.preventDefault();
      const list = [...openHours];
      list[index][0].push({ from: "", to: "" });

      setOpenHours(list);
    };

    const removeOpeningTime = (e, index) => {
      e.preventDefault();
      const list = [...openHours];
      list[index][0].pop();
      setOpenHours(list);
    };

    const addCollectionTime = (e, index) => {
      e.preventDefault();
      const list = [...collectionTimes];
      list[index][0].push({ from: "", to: "" });

      setCollectionTimes(list);
    };

    const removeCollectionTime = (e, index) => {
      e.preventDefault();
      const list = [...collectionTimes];
      list[index][0].pop();
      setCollectionTimes(list);
    };

    const handleAutoFill = (e) => {
      e.preventDefault();
      setData(e.target.name, e.target.value);
      const list = [...openHours];
      setCollectionTimes(list);
    };

    const [mondayOpenHours, setMondayOpenHours] = useState([
      props.opening_hours_monday
    ]);

    const [tuesdayOpenHours, setTuesdayOpenHours] = useState([
      props.opening_hours_tuesday
    ]);

    const [wednesdayOpenHours, setWednesdayOpenHours] = useState([
      props.opening_hours_wednesday
    ]);

    const [thursdayOpenHours, setThursdayOpenHours] = useState([
      props.opening_hours_thursday
    ]);

    const [fridayOpenHours, setFridayOpenHours] = useState([
      props.opening_hours_friday
    ]);

    const [saturdayOpenHours, setSaturdayOpenHours] = useState([
      props.opening_hours_saturday
    ]);

    const [sundayOpenHours, setSundayOpenHours] = useState([
      props.opening_hours_sunday
    ]);

    const [openHours, setOpenHours] = useState([
      mondayOpenHours,
      tuesdayOpenHours,
      wednesdayOpenHours,
      thursdayOpenHours,
      fridayOpenHours,
      saturdayOpenHours,
      sundayOpenHours
    ]);

    const [mondayCollectionTimes, setMondayCollectionTimes] = useState([
      props.collection_times_monday
    ]);

    const [tuesdayCollectionTimes, setTuesdayCollectionTimes] = useState([
      props.collection_times_tuesday
    ]);

    const [wednesdayCollectionTimes, setWednesdayCollectionTimes] = useState([
      props.collection_times_wednesday
    ]);

    const [thursdayCollectionTimes, setThursdayCollectionTimes] = useState([
      props.collection_times_thursday
    ]);

    const [fridayCollectionTimes, setFridayCollectionTimes] = useState([
      props.collection_times_friday
    ]);

    const [saturdayCollectionTimes, setSaturdayCollectionTimes] = useState([
      props.collection_times_saturday
    ]);

    const [sundayCollectionTimes, setSundayCollectionTimes] = useState([
      props.collection_times_sunday
    ]);

    const [collectionTimes, setCollectionTimes] = useState([
      mondayCollectionTimes,
      tuesdayCollectionTimes,
      wednesdayCollectionTimes,
      thursdayCollectionTimes,
      fridayCollectionTimes,
      saturdayCollectionTimes,
      sundayCollectionTimes
    ]);

    const submit = (e) => {
      e.preventDefault();
      data.openHours = openHours;
      data.collectionTimes = collectionTimes;
      put(route("restaurant.opening-hours.update"));
    };

    console.log(openHours);
    return (
      <>
        <Authenticated auth={props.auth} errors={props.errors} activeGroup={12}>
          <div className="col-span-12">
            <Title
            title="Update
                    Opening and Collection Times "
            subtitle="Fill in the details below for your opening and collection times. You can select multiple time periods per day (i.e. if you're open for lunch and close before the evening). The opening times will be displayed on your mini profile on the app, and also combine to be your delivery time availability. "
            />
                {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                }
            <div className="grid grid-cols-12 mt-5">
              <div className="intro-y col-span-12">
                {/* BEGIN: Form Layout */}
                <form
                  className="intro-y box sm:p-5 p-2"
                  onSubmit={submit}
                  method="put"
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
                                {index === 0
                                  ? "Monday"
                                  : index === 1
                                  ? "Tuesday"
                                  : index === 2
                                  ? "Wednesday"
                                  : index === 3
                                  ? "Thursday"
                                  : index === 4
                                  ? "Friday"
                                  : index === 5
                                  ? "Saturday"
                                  : "Sunday"}
                              </h2>
                              {day[0] &&
                                day[0].map((time, key) => (
                                  <>
                                    <div className="md:col-span-4 col-span-12 row-span-1 flex sm:flex-nowrap flex-wrap items-center">
                                      <label className="mr-2 sm:mb-0 mb-2">
                                        From
                                      </label>
                                      <input
                                        type="time"
                                        name="from"
                                        value={time.from}
                                        id={key}
                                        onChange={(e) =>
                                          handleFromChange(e, index, key)
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
                                        value={time.to}
                                        onChange={(e) =>
                                          handleToChange(e, index, key)
                                        }
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
                                {
                                day[0] && day[0].length > 1 &&
                                <button
                                  className="btn btn-danger-soft text-sm border-none"
                                  type="button"
                                  onClick={(e) => {
                                    removeOpeningTime(e, index);
                                  }}
                                >
                                  Remove
                                </button>
                                }
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* end: opening times */}
                  {/* start: collection times */}
                  <div className="intro-y col-span-12 overflow-auto">
                    <div className="intro-y box p-5">
                      <div className="flex items-center">
                        <h2 className="font-medium text-base mr-auto mt-5 mb-5">
                          Collection Times
                        </h2>
                      </div>
                      {/* Start: Autofill */}
                      <div className="mt-3 mb-3">
                        <input
                          id="autofill"
                          name="autofill"
                          type="radio"
                          value="autofill"
                          className="mr-2"
                          onChange={handleAutoFill}
                        />
                        <span className="d-inline-block mr-2">
                          Autofill slots from Opening Times above
                        </span>
                      </div>
                      {/* End: Autofill */}
                      <div className="grid grid-cols-12 sm:gap-6 gap-2">
                        {collectionTimes.map((day, index) => {
                          return (
                            <>
                              <h2 className="col-span-12 text-md font-medium mt-5">
                                {index === 0
                                  ? "Monday"
                                  : index === 1
                                  ? "Tuesday"
                                  : index === 2
                                  ? "Wednesday"
                                  : index === 3
                                  ? "Thursday"
                                  : index === 4
                                  ? "Friday"
                                  : index === 5
                                  ? "Saturday"
                                  : "Sunday"}
                              </h2>
                              {day[0] &&
                                day[0].map((time, key) => (
                                  <>
                                    <div className="md:col-span-4 col-span-12 row-span-1 flex sm:flex-nowrap flex-wrap items-center">
                                      <label className="mr-2 sm:mb-0 mb-2">
                                        From
                                      </label>
                                      <input
                                        type="time"
                                        name="from"
                                        value={time.from}
                                        id={key}
                                        onChange={(e) =>
                                          handleCollectionTimeFromChange(
                                            e,
                                            index,
                                            key
                                          )
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
                                        value={time.to}
                                        onChange={(e) =>
                                          handleCollectionTimeToChange(
                                            e,
                                            index,
                                            key
                                          )
                                        }
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
                                    addCollectionTime(e, index);
                                  }}
                                >
                                  Add another
                                </Button>
                                {

                            day[0] && day[0].length > 1 && (
                                <button
                                  className="btn btn-danger-soft text-sm border-none"
                                  type="button"
                                  onClick={(e) => {
                                    removeCollectionTime(e, index);
                                  }}
                                >
                                  Remove
                                </button>
                            )
                                }
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* end: collection times */}
                  <div className="flex justify-end mt-5">
                    <Button type="submit" className="btn btn-primary">
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
