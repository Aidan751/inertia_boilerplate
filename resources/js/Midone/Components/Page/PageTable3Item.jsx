import { Link } from "@inertiajs/inertia-react";
import { Aperture, CheckSquare, Edit2, Eye, Trash2 } from "lucide-react";

export default function PageTable3Item(props){
    // This data can take a while to load
    return (
        <>
            <tr className="intro-x">
                <td className="">
                    <span className="font-medium block">
                        {props.attendant.attendee.first_name + " "+ props.attendant.attendee.last_name}
                    </span> 
                </td>
                <td>
                    <span className="text-slate-800 text-sm block mt-0.5">
                        Age: {props.attendant.attendee.age}
                    </span>
                    <span className="text-slate-800 text-sm block mt-0.5">
                        {props.attendant.attendee.phone}
                    </span>
                    <span className="text-slate-800 text-sm block mt-0.5">
                    {props.attendant.attendee.street}, {props.attendant.attendee.suburb}, {props.attendant.attendee.city}, {props.attendant.attendee.province}, South Africa, {props.attendant.attendee.postal_code}
                    </span>
                </td>
                <td class="">
                    <span className={props.attendant.attendee.vaccinated ? "flex items-center mr-3 text-success" : "flex items-center mr-3 text-danger"}>
                        <Aperture className="w-4 h-4 mr-1" />
                        {props.attendant.attendee.vaccinated ? "Yes" : "No"}
                    </span>
                </td>
                <td class="text-center">
                    <span className={props.attendant.film_consent ? "flex items-center mr-3 text-success" : "flex items-center mr-3 text-danger"}>
                        <Aperture className="w-4 h-4 mr-1" />
                        {props.attendant.film_consent ? "Yes" : "No"}
                    </span>
                </td>
                <td className="table-report__action w-56">
                    <span className={props.attendant.attended_workshop ? "flex items-center mr-3 text-success" : "flex items-center mr-3 text-danger"}>
                        <Aperture className="w-4 h-4 mr-1" />
                        {props.attendant.attended_workshop ? "Yes" : "No"}
                    </span>
                </td>
            </tr>
        </>
    )
}