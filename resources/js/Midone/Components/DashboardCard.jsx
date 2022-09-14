import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";

export default function DashboardCard(props){

    return (
        <>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                
                <div className="report-box zoom-in">
                    
                    <div className="box p-5">
                        
                        <div className="flex">
                            {
                                props.children
                            }                            
                            <div className="ml-auto">
                                <div className="report-box__indicator bg-success tooltip cursor-pointer" title="">
                                    {props.percentage}
                                    {
                                        props.up && 
                                        <ChevronUp className="w-4 h-4 ml-0.5" />
                                    }
                                    {
                                        props.down && 
                                        <ChevronDown className="w-4 h-4 ml-0.5" />
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="text-3xl font-medium leading-8 mt-6">
                            {props.amount}
                        </div>
                        <div className="text-base text-slate-500 mt-1">
                            {props.title}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}