import { Link } from "@inertiajs/inertia-react";
import { FileText, Link2 } from "lucide-react";
import {useState} from "react";
import useTable from "../../../hooks/useMyTable";
import PageTable5Item from './PageTable5Item';


export default function PageTable5(props){

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(props.data, page, 5);

    return (
        <>
        <div className="col-span-12 mt-6">
            
            <div className="intro-y block sm:flex items-center h-10">
                <h2 className="text-sm font-medium truncate mr-5">
                {props.title}
                </h2>
                <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                <a href={props.download ?? ""} download={props.download ?? ""} className="btn box flex items-center text-slate-600 dark:text-slate-300">
                    <FileText className="hidden sm:block w-4 h-4 mr-2" />
                    Export to Excel
                </a>
                {/* <Link method="POST" as="button" action={"/admin/workshop/create-registration-link/"+ props.id} className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <Link2 className="hidden sm:block w-4 h-4 mr-2" /> Generate Registration Link </Link> */}
                </div>
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                <table className="table table-report sm:mt-2">
                <thead>
                    <tr>
                    <th className="whitespace-nowrap">IMAGE</th>
                    <th className="whitespace-nowrap">FULL NAME</th>
                    <th className="whitespace-nowrap">ORGANIZATION</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    
                {slice.map((el) => (
                    <PageTable5Item
                        dataCapturer={el}
                    />
                ))}
                    
                </tbody>
                </table>
            </div>
            {/*  */}

            <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                <nav className="w-full sm:w-auto sm:mr-auto">
                    <ul className="pagination">
                        {props.pages.map(link => (
                            <li className={`${ link.active ? "page-item active" : "page-item"}`}>
                                    <Link className="page-link" href={link.url}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                
            </div>
        </div>

        </>
    )
}