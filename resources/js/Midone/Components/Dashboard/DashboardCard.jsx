import { ChevronDown, ChevronUp } from "lucide-react";

export default function DashboardCard(props){

    return (
        <>
            <div className="intro-y">
                <div className="report-box zoom-in">
                    <div className="box p-5">
                        <div className="flex">
                            {props.children} 
                            <div className="ml-auto">
                                {
                                    props.success ?
                                        <div className="report-box__indicator bg-success tooltip cursor-pointer" title={props.title}>
                                            {props.notes}
                                            <ChevronUp className="w-4 h-4 ml-0.5" />
                                        </div>
                                : 
                                            <div className="report-box__indicator bg-danger tooltip cursor-pointer" title={props.title}>
                                            {props.notes}
                                            <ChevronDown className="w-4 h-4 ml-0.5" />
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="text-3xl font-medium leading-8 mt-6">{props.amount}</div>
                        <div className="text-base text-slate-500 mt-1">{props.title}</div>
                    </div>
                </div>
            </div>
        </>
    )
}