import { Link } from "@inertiajs/inertia-react";
import { FileText } from "lucide-react";
import {useState} from "react";
import useTable from "../../../hooks/useMyTable";
import DashboardTableFooter from "../Dashboard/DashboardTableFooter";
import PageTable2Item from './PageTable2Item';


export default function PageTable2(props){

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(props.data, page, 5);
    return (
        <>
        <div className="col-span-12 mt-6">
            <div className="intro-y block sm:flex items-center justify-between h-10">
                <h2 className="text-sm font-medium truncate mr-5">
                {props.title}
                </h2>
                <Link href={"/admin/workshop-group/view/"+props.groupId+"/create"} className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
                    <FileText className="hidden sm:block w-4 h-4 mr-2" /> Add Facilitator </Link>
                
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                <table className="table table-report sm:mt-2">
                <thead>
                    <tr>
                    <th className="whitespace-nowrap">IMAGES</th>
                    <th className="whitespace-nowrap">WORKSHOP DETAILS</th>
                    <th className="whitespace-nowrap">WORKSHOP DATE</th>
                    <th className="text-center whitespace-nowrap">TOTAL ATTENDANTS</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    
                {slice.map((el) => (
                    <PageTable2Item
                        workshop={el}
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