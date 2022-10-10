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

  const [mondayOpeningHours, setMondayOpeningHours] = useState([
    [
        {
            from: props.opening_hours_monday.from || "",
            to: props.opening_hours_monday.to || "",
        }
  ]
]);

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

    console.log(data);
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
            title="Update
Add another
Opening and Collection Times "
            subtitle="Fill in the details below for your opening and collection times. You can select multiple time periods per day (i.e. if you're open for lunch and close before the evening). The opening times will be displayed on your mini profile on the app, and also combine to be your delivery time availability. "
            />
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-6">
              {/* BEGIN: Form Layout */}

              <form className="intro-y box p-5" onSubmit={submit} method="post">
                {/* start: opening times */}
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                  <div className="intro-y box p-5">
                    <div className="flex flex-col sm:flex-row items-center">
                      <h2 className="font-medium text-base mr-auto mt-5 mb-3">
                        Opening Times
                      </h2>
                    </div>
                     {/* start: monday to and from opening hours */}
                     <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                     <table className="table table-report mt-2 w-full">
                    <Label
                    value="monday"
                    className="mb-2"
                    />
                    <div>
                      <tr className="col-span-12">
                        <td style={{width: '50vw'}}>

                        {mondayOpeningHours.map((mondayOpeningHour, index) => {
                        return (
                            <div key={index} className="flex items-center">
                            <Input
                                type="time"
                                name="opening_hours_monday_from"
                                value={data.opening_hours_monday_from}
                                setData={setData}
                                min="00:00"
                                max="23:59"
                                className="flex-1 w-74"

                            />
                            <p className="flex-2 ml-5 mr-5">-</p>
                            <Input
                                type="time"
                                name="opening_hours_monday_to"
                                value={data.opening_hours_monday_to}
                                setData={setData}
                                min="00:00"
                                max="23:59"
                                className="flex-1 w-74"
                                />

                            </div>
                        );
                        })}
                        </td>
                        <div style={{width: '30vw'}} className="flex justify-end back-none">
                        {/* start: button to add another opening time for monday */}
                        <Button
                          className="button bg-theme-1 text-white mr-3"
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
                        { mondayOpeningHours.length > 1 && (
                        <button
                                  className="btn btn-danger-soft h-7 text-sm border-none"
                                  type="button"
                                  onClick={() => {
                                    setMondayOpeningHours(
                                        mondayOpeningHours.slice(0, -1)
                                    );
                                  }}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Remove
                            </button>
                        )}
                        {/* end: button to remove opening time for monday */}

                        </div>
                      </tr>


                      </div>
                    </table>
                    </div>
                    {/* end: monday to and from opening hours */}
                    {/* start: tuesday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="tuesday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {tuesdayOpeningHours.map((tuesdayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_tuesday_from"
                                    value={data.opening_hours_tuesday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_tuesday_to"
                                    value={data.opening_hours_tuesday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for tuesday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            tuesdayOpeningHours.length > 1 && <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() => {
                                        setTuesdayOpeningHours(
                                            tuesdayOpeningHours.slice(0, -1)
                                        );
                                        }}
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                </button>
                            }
                            {/* end: button to remove opening time for tuesday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: tuesday to and from opening hours */}
                    {/* start: wednesday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="wednesday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {wednesdayOpeningHours.map((wednesdayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_wednesday_from"
                                    value={data.opening_hours_wednesday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_wednesday_to"
                                    value={data.opening_hours_wednesday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for wednesday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            wednesdayOpeningHours.length > 1 &&
                            <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() => {
                                        setWednesdayOpeningHours(
                                            wednesdayOpeningHours.slice(0, -1)
                                        );
                                        }}
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                </button>
                            }
                            {/* end: button to remove opening time for wednesday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: wednesday to and from opening hours */}
                    {/* start: thursday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="thursday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {thursdayOpeningHours.map((thursdayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_thursday_from"
                                    value={data.opening_hours_thursday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_thursday_to"
                                    value={data.opening_hours_thursday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for thursday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            thursdayOpeningHours.length > 1 &&
                            <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() => {
                                        setThursdayOpeningHours(
                                            thursdayOpeningHours.slice(0, -1)
                                        );
                                        }}
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                </button>
                            }
                            {/* end: button to remove opening time for thursday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: thursday to and from opening hours */}
                    {/* start: friday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="friday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {fridayOpeningHours.map((fridayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_friday_from"
                                    value={data.opening_hours_friday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_friday_to"
                                    value={data.opening_hours_friday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for friday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            fridayOpeningHours.length > 1 &&
                            <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() => {
                                        setFridayOpeningHours(
                                            fridayOpeningHours.slice(0, -1)
                                        );
                                        }}

                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                </button>
                            }
                            {/* end: button to remove opening time for friday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: friday to and from opening hours */}
                    {/* start: saturday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="saturday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {saturdayOpeningHours.map((saturdayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_saturday_from"
                                    value={data.opening_hours_saturday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_saturday_to"
                                    value={data.opening_hours_saturday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />


                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for saturday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            saturdayOpeningHours.length > 1 &&
                            <button
                                        className="btn btn-danger-soft h-7 text-sm border-none"
                                        type="button"
                                        onClick={() => {
                                        setSaturdayOpeningHours(
                                            saturdayOpeningHours.slice(0, -1)
                                        );
                                        }}
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Remove
                                </button>
                            }
                            {/* end: button to remove opening time for saturday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: saturday to and from opening hours */}
                    {/* start: sunday to and from opening hours */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="sunday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {sundayOpeningHours.map((sundayOpeningHour, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="opening_hours_sunday_from"
                                    value={data.opening_hours_sunday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="opening_hours_sunday_to"
                                    value={data.opening_hours_sunday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another opening time for sunday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
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
                            {
                            sundayOpeningHours.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setSundayOpeningHours(
                                    sundayOpeningHours.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove opening time for sunday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: sunday to and from opening hours */}
                    <h2 className="font-medium text-base mr-auto mt-5 mb-3">
                        Collection Times
                      </h2>
                    {/* start: monday to and from collection times */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="monday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {mondayCollectionTimes.map((mondayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_monday_from"
                                    value={data.collection_times_monday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />
                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_monday_to"
                                    value={data.collection_times_monday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for monday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setMondayCollectionTimes([
                                    ...mondayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>
                            {/* end: button to add another collection time for monday */}
                            {/* start: button to remove collection time for monday */}
                            {
                            mondayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setMondayCollectionTimes(
                                    mondayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for monday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: monday to and from collection times */}
                    {/* start: tuesday to and from collection times */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="tuesday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {tuesdayCollectionTimes.map((tuesdayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_tuesday_from"
                                    value={data.collection_times_tuesday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_tuesday_to"
                                    value={data.collection_times_tuesday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for tuesday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setTuesdayCollectionTimes([
                                    ...tuesdayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for tuesday */}
                            {/* start: button to remove collection time for tuesday */}
                            {
                            tuesdayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setTuesdayCollectionTimes(
                                    tuesdayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for tuesday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: tuesday to and from collection times */}
                    {/* start: wednesday to and from collection times */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="wednesday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {wednesdayCollectionTimes.map((wednesdayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_wednesday_from"
                                    value={data.collection_times_wednesday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_wednesday_to"
                                    value={data.collection_times_wednesday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for wednesday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setWednesdayCollectionTimes([
                                    ...wednesdayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for wednesday */}
                            {/* start: button to remove collection time for wednesday */}
                            {
                            wednesdayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setWednesdayCollectionTimes(
                                    wednesdayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for wednesday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: wednesday to and from collection times */}
                         {/* start: thursday to and from collection times */}
                         <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="thursday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {thursdayCollectionTimes.map((thursdayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_thursday_from"
                                    value={data.collection_times_thursday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_thursday_to"
                                    value={data.collection_times_thursday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for thursday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setThursdayCollectionTimes([
                                    ...thursdayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for thursday */}
                            {/* start: button to remove collection time for thursday */}
                            {
                            thursdayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setThursdayCollectionTimes(
                                    thursdayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for thursday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: thursday to and from collection times */}
                         {/* start: friday to and from collection times */}
                         <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="friday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {fridayCollectionTimes.map((fridayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_friday_from"
                                    value={data.collection_times_friday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_friday_to"
                                    value={data.collection_times_friday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for friday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setFridayCollectionTimes([
                                    ...fridayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for friday */}
                            {/* start: button to remove collection time for friday */}
                            {
                            fridayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setFridayCollectionTimes(
                                    fridayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for friday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: friday to and from collection times */}
                         {/* start: saturday to and from collection times */}
                         <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="saturday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {saturdayCollectionTimes.map((saturdayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_saturday_from"
                                    value={data.collection_times_saturday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_saturday_to"
                                    value={data.collection_times_saturday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for saturday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setSaturdayCollectionTimes([
                                    ...saturdayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for saturday */}
                            {/* start: button to remove collection time for saturday */}
                            {
                            saturdayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setSaturdayCollectionTimes(
                                    saturdayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for saturday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: saturday to and from collection times */}
                         {/* start: sunday to and from collection times */}
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report mt-2 w-full">
                        <Label
                        value="sunday"
                        className="mb-2"
                        />
                        <div>
                        <tr className="col-span-12">
                            <td style={{width: '50vw'}}>
                            {sundayCollectionTimes.map((sundayCollectionTime, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                <Input
                                    type="time"
                                    name="collection_times_sunday_from"
                                    value={data.collection_times_sunday_from}
                                    setData={setData}
                                    className="flex-1 w-74"

                                />

                                <p className="flex-2 ml-5 mr-5">-</p>
                                <Input
                                    type="time"
                                    name="collection_times_sunday_to"
                                    value={data.collection_times_sunday_to}
                                    setData={setData}
                                    className="flex-1 w-74"
                                    />

                                </div>
                            );
                            })}
                            </td>
                            <div style={{width: '30vw'}} className="flex justify-end back-none">
                            {/* start: button to add another collection time for sunday */}
                            <Button
                                className="button bg-theme-1 text-white mr-3"
                                type="button"
                                click={() => {
                                setSundayCollectionTimes([
                                    ...sundayCollectionTimes,
                                    {
                                    from: "",
                                    to: "",
                                    },
                                ]);
                                }}
                            >
                                Add another
                            </Button>

                            {/* end: button to add another collection time for sunday */}
                            {/* start: button to remove collection time for sunday */}
                            {
                            sundayCollectionTimes.length > 1 &&
                            <button
                                className="btn btn-danger-soft h-7 text-sm border-none"
                                type="button"
                                onClick={() => {
                                setSundayCollectionTimes(
                                    sundayCollectionTimes.slice(0, -1)
                                );
                                }}
                            >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                            </button>
                            }
                            {/* end: button to remove collection time for sunday */}
                            </div>
                        </tr>
                        </div>
                    </table>
                    </div>
                    {/* end: sunday to and from collection times */}
                    </div>
                    {/* end: collection times */}
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
