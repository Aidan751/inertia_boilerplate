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

  const[openHours, setOpenHours] = useState([
    {
        day: "Monday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Tuesday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Wednesday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Thursday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Friday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Saturday",
        times: [{
            from: "",
            to: ""
    }]
    },
    {
        day: "Sunday",
        times: [{
            from: "",
            to: ""
    }]
    }
  ]);

    const[collectionTimes, setCollectionTimes] = useState({
    mondayCollectionTimes: [{
        from: "",
        to: "",
    }],
    tuesdayCollectionTimes: [{
        from: "",
        to: "",
    }],
    wednesdayCollectionTimes: [{
        from: "",
        to: "",
    }],
    thursdayCollectionTimes: [{
        from: "",
        to: "",
    }],
    fridayCollectionTimes: [{
        from: "",
        to: "",
    }],
    saturdayCollectionTimes: [{
        from: "",
        to: "",
    }],
    sundayCollectionTimes: [{
        from: "",
        to: "",
    }],
});

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
                    {
                        openHours.map((day, index) => {
                           return(

                     <table className="table table-report p-2 mt-2">
                    <thead>
                        <tr>
                            <th className="border-b-2 whitespace-no-wrap">{day.day}</th>
                        </tr>
                    </thead>
                        <tbody>
                      <tr className="intro-x custom-tr">

                        {day.times.map((method, i) => {
                        return (
                        <td key={i} className="custom-td-1">
                            <div className="custom-input-1">
                            From  <input
                                type="time"
                                name={method.from}
                                value={method.from}
                                onChange={(e, i) => handleFromChange(e, i)}
                                min="00:00"
                                max="23:59"
                                className="text-sm border-gray-300 focus:border-indigo-300 leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            </div>
                            <p className="dash">-</p>
                            <div className="custom-input-2">
                            To  <input
                                type="time"
                                name={method.to}
                                value={method.to}
                                onChange={(e, i) => handleToChange(e, i)}
                                min="00:00"
                                max="23:59"
                                className="text-sm border-gray-300 focus:border-indigo-300 leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>

                        </td>
                        );
                        })}
                        <td className="custom-td-2">
                        {/* start: button to add another opening time for monday */}
                        <Button
                          className="button bg-theme-1 text-white mr-3"
                          type="button"
                          click={() => {
                            addOpeningTime(day);
                          }}
                        >
                          Add another
                        </Button>
                        {/* end: button to add another opening time for Monday */}
                        {/* start: button to remove opening time for Monday */}
                        { Object.values(openHours).length > 1 && (
                        <button
                                  className="btn btn-danger-soft h-7 text-sm border-none"
                                  type="button"
                                  onClick={() => {
                                    removeOpeningTime(day);
                                  }}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Remove
                            </button>
                        )}
                        {/* end: button to remove opening time for monday */}

                        </td>
                      </tr>
                        </tbody>
                    </table>
                        )})
                    }

                    </div>
                <div className="text-right mt-5">
                  <Button type="submit" className="w-30">
                    Save
                  </Button>
                </div>
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
