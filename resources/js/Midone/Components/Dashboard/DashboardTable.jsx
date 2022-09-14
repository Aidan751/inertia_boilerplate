import { FileText } from "lucide-react";
import {useState} from "react";
import useTable from "../../../hooks/useMyTable";
import DashboardTableFooter from "./DashboardTableFooter";
import DashboardTableItem from './DashboardTableItem';


export default function DashboardTable(props){

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(props.data, page, 5);

    const count = props.data.length;
    return (
        <>
        <div className="col-span-12 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
                <h2 className="text-sm font-medium truncate mr-5 flex space-x-2 items-center">
                {props.title}
                <div className=" bg-teal-800 py-1 px-4 tooltip cursor-pointer ml-5 text-zinc-100 font-sans font-bold tracking-wider text-sm rounded-full">
                    {count}
                </div>
                </h2>
                <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                <a href={props.download ?? ""} download={props.download ?? ""} className="btn box flex items-center text-slate-600 dark:text-slate-300">
                    <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export to Excel </a>
                </div>
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                <table className="table table-report sm:mt-2">
                <thead>
                    <tr>
                    <th className="whitespace-nowrap">IMAGES</th>
                    <th className="whitespace-nowrap">FULL NAME</th>
                    <th className="text-center whitespace-nowrap">TOTAL ATTENDANTS</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    
                {slice.map((el) => (
                    <DashboardTableItem
                        name={el.first_name + " " + el.last_name}
                        email={el.email}
                        phone={el.phone}
                        image={el.image}
                        key={el.id}
                        id={el.id}
                        attendants={el.totalAttendants}
                    />
                ))}
                    
                </tbody>
                </table>
            </div>
            {/*  */}

            <DashboardTableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </div>

        </>
    )
}