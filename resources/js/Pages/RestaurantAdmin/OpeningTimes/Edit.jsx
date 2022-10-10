import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from "@inertiajs/inertia-react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Title from "@/Components/Title";

export default function Edit(props) {
  const { data, setData, put, processing, errors } = useForm({
    opening_hours_monday_from: props.opening_hours_monday.from || "",
    opening_hours_monday_to: props.opening_hours_monday.to || "",
    opening_hours_tuesday_from: props.opening_hours_tuesday.from || "",
    opening_hours_tuesday_to: props.opening_hours_tuesday.to || "",
    opening_hours_wednesday_from: props.opening_hours_wednesday.from || "",
    opening_hours_wednesday_to: props.opening_hours_wednesday.to || "",
    opening_hours_thursday_from: props.opening_hours_thursday.from || "",
    opening_hours_thursday_to: props.opening_hours_thursday.to || "",
    opening_hours_friday_from: props.opening_hours_friday.from || "",
    opening_hours_friday_to: props.opening_hours_friday.to || "",
    opening_hours_saturday_from: props.opening_hours_saturday.from || "",
    opening_hours_saturday_to: props.opening_hours_saturday.to || "",
    opening_hours_sunday_from: props.opening_hours_sunday.from || "",
    opening_hours_sunday_to: props.opening_hours_sunday.to || "",
    collection_times_monday_from: props.collection_times_monday.from || "",
    collection_times_monday_to: props.collection_times_monday.to || "",
    collection_times_tuesday_from: props.collection_times_tuesday.from || "",
    collection_times_tuesday_to: props.collection_times_tuesday.to || "",
    collection_times_wednesday_from: props.collection_times_wednesday.from || "",
    collection_times_wednesday_to: props.collection_times_wednesday.to || "",
    collection_times_thursday_from: props.collection_times_thursday.from || "",
    collection_times_thursday_to: props.collection_times_thursday.to || "",
    collection_times_friday_from: props.collection_times_friday.from || "",
    collection_times_friday_to: props.collection_times_friday.to || "",
    collection_times_saturday_from: props.collection_times_saturday.from || "",
    collection_times_saturday_to: props.collection_times_saturday.to || "",
    collection_times_sunday_from: props.collection_times_sunday.from || "",
    collection_times_sunday_to: props.collection_times_sunday.to || "",
  });

  const [mondayOpeningHours, setMondayOpeningHours] = useState([{
    from: props.opening_hours_monday.from || "",
    to: props.opening_hours_monday.to || "",
  }]);

    const [tuesdayOpeningHours, setTuesdayOpeningHours] = useState([{
    from: props.opening_hours_tuesday.from || "",
    to: props.opening_hours_tuesday.to || "",
    }]);

    const [wednesdayOpeningHours, setWednesdayOpeningHours] = useState([{
    from: props.opening_hours_wednesday.from || "",
    to: props.opening_hours_wednesday.to || "",
    }]);

    const [thursdayOpeningHours, setThursdayOpeningHours] = useState([{
    from: props.opening_hours_thursday.from || "",
    to: props.opening_hours_thursday.to || "",
    }]);

    const [fridayOpeningHours, setFridayOpeningHours] = useState([{
    from: props.opening_hours_friday.from || "",
    to: props.opening_hours_friday.to || "",
    }]);

    const [saturdayOpeningHours, setSaturdayOpeningHours] = useState([{
    from: props.opening_hours_saturday.from || "",
    to: props.opening_hours_saturday.to || "",
    }]);

    const [sundayOpeningHours, setSundayOpeningHours] = useState([{
    from: props.opening_hours_sunday.from || "",
    to: props.opening_hours_sunday.to || "",
    }]);

    const [mondayCollectionTimes, setMondayCollectionTimes] = useState([{
    from: props.collection_times_monday.from || "",
    to: props.collection_times_monday.to || "",
    }]);

    const [tuesdayCollectionTimes, setTuesdayCollectionTimes] = useState([{
    from: props.collection_times_tuesday.from || "",
    to: props.collection_times_tuesday.to || "",
    }]);

    const [wednesdayCollectionTimes, setWednesdayCollectionTimes] = useState([{
    from: props.collection_times_wednesday.from || "",
    to: props.collection_times_wednesday.to || "",
    }]);

    const [thursdayCollectionTimes, setThursdayCollectionTimes] = useState([{
    from: props.collection_times_thursday.from || "",
    to: props.collection_times_thursday.to || "",
    }]);

    const [fridayCollectionTimes, setFridayCollectionTimes] = useState([{
    from: props.collection_times_friday.from || "",
    to: props.collection_times_friday.to || "",
    }]);

    const [saturdayCollectionTimes, setSaturdayCollectionTimes] = useState([{
    from: props.collection_times_saturday.from || "",
    to: props.collection_times_saturday.to || "",
    }]);

    const [sundayCollectionTimes, setSundayCollectionTimes] = useState([{
    from: props.collection_times_sunday.from || "",
    to: props.collection_times_sunday.to || "",
    }]);

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
         <Title
            title="Edit Offer"
            subtitle="Fill in the form below to edit an offer"
            />
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}

              <form className="intro-y box p-5" onSubmit={submit} method="post">
                {/* start: opening times */}
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                  <div className="intro-y box p-5">
                    <div className="flex flex-col sm:flex-row items-center">
                      <h2 className="font-medium text-base mr-auto">
                        Opening Times
                      </h2>
                    </div>
                     {/* start: monday to and from opening hours */}
                     <div className="mt-5">
                    <Label
                    value="monday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {mondayOpeningHours.map((mondayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_monday_from"
                              value={mondayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_monday_to"
                                value={mondayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for monday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setMondayOpeningHours([
                              ...mondayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for Monday */}
                        {/* start: button to remove opening time for Monday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setMondayOpeningHours(
                                    mondayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for monday */}
                      </div>
                    </div>
                    {/* end: monday to and from opening hours */}
                    {/* start: tuesday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="tuesday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {tuesdayOpeningHours.map((tuesdayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_tuesday_from"
                              value={tuesdayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_tuesday_to"
                                value={tuesdayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for tuesday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setTuesdayOpeningHours([
                              ...tuesdayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for tuesday */}
                        {/* start: button to remove opening time for tuesday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setTuesdayOpeningHours(
                                    tuesdayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for tuesday */}
                      </div>
                    </div>
                    {/* end: tuesday to and from opening hours */}
                    {/* start: wednesday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="Wednesday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {wednesdayOpeningHours.map((wednesdayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_wednesday_from"
                              value={wednesdayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_wednesday_to"
                                value={wednesdayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for wednesday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setWednesdayOpeningHours([
                              ...wednesdayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for wednesday */}
                        {/* start: button to remove opening time for wednesday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setWednesdayOpeningHours(
                                    wednesdayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for wednesday */}
                      </div>
                    </div>
                    {/* end: wednesday to and from opening hours */}
                    {/* start: thursday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="Thursday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {thursdayOpeningHours.map((thursdayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_thursday_from"
                              value={thursdayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_thursday_to"
                                value={thursdayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for thursday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setThursdayOpeningHours([
                              ...thursdayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for thursday */}
                        {/* start: button to remove opening time for thursday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setThursdayOpeningHours(
                                    thursdayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for thursday */}
                      </div>
                    </div>
                    {/* end: thursday to and from opening hours */}
                    {/* start: friday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="Friday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {fridayOpeningHours.map((fridayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_friday_from"
                              value={fridayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_friday_to"
                                value={fridayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for friday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setFridayOpeningHours([
                              ...fridayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for friday */}
                        {/* start: button to remove opening time for friday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setFridayOpeningHours(
                                    fridayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for friday */}
                      </div>
                    </div>
                    {/* end: friday to and from opening hours */}
                    {/* start: saturday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="Saturday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {saturdayOpeningHours.map((saturdayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_saturday_from"
                              value={saturdayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_saturday_to"
                                value={saturdayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for saturday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setSaturdayOpeningHours([
                              ...saturdayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for saturday */}
                        {/* start: button to remove opening time for saturday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setSaturdayOpeningHours(
                                    saturdayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for saturday */}
                      </div>
                    </div>
                    {/* end: saturday to and from opening hours */}
                    {/* start: sunday to and from opening hours */}
                    <div className="mt-5">
                    <Label
                    value="Sunday"
                    className="mb-2"
                    />
                      <div className="w-full flex items-start justify-between sm:w-40">
                      <div className="flex flex-col">

                      {sundayOpeningHours.map((sundayOpeningHour, index) => {
                        return (
                          <div key={index} className="flex flex-1 mb-2 items-center">
                            <Input
                              type="time"
                              name="opening_hours_sunday_from"
                              value={sundayOpeningHour.from}
                              setData={setData}
                              className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_sunday_to"
                                value={sundayOpeningHour.to}
                                setData={setData}
                                className="flex-1 w-74"
                                />

                          </div>
                        );
                      })}
                      </div>

                        {/* start: button to add another opening time for sunday */}
                        <Button
                          className="button bg-theme-1 text-white mt-3"
                          type="button"
                          click={() => {
                            setSundayOpeningHours([
                              ...sundayOpeningHours,
                              {
                                from: "",
                                to: "",
                              },
                            ]);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for sunday */}
                        {/* start: button to remove opening time for sunday */}
                        <Button
                            className="button btn-danger-soft text-white mt-3"
                            type="button"
                            click={() => {
                                setSundayOpeningHours(
                                    sundayOpeningHours.slice(0, -1)
                                );
                            }}
                        >
                            Remove
                        </Button>
                        {/* end: button to remove opening time for sunday */}
                      </div>
                    </div>
                    {/* end: sunday to and from opening hours */}


                  </div>
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
