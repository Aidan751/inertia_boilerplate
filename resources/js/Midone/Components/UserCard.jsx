import UserCardMenuDropdown from "@/Components/UserCardMenuDropdown";
import { Mail, PhoneCall } from "lucide-react";

export default function UserCard(props){

    return (
        <>
            <div key={props.id} className="intro-y col-span-12 md:col-span-6 lg:col-span-4 relative">
                {/* Drop Down Container */}
                <div className="absolute block right-0 w-full h-8 z-30">
                    <UserCardMenuDropdown id={props.id} />
                </div>
                <div className="box">
                    <div className="flex items-start justify-between px-5 pt-5 ">

                        {/* Top Half */}
                        <div className="w-full flex flex-col lg:flex-row items-center">
                            {/* Image */}
                            <div className="w-16 h-16 image-fit">
                                <img alt={props.name} className="rounded-full" src={props.image} />
                            </div>
                            {/* User Details */}
                            <div className="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                                <span className="font-medium">{props.name}</span> 
                                <div className="text-slate-500 text-xs mt-0.5">
                                    {props.province}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center lg:text-left p-5">
                        <a href={"mailto:" + props.email} className="flex items-center justify-center lg:justify-start text-slate-500 mt-5">
                            <Mail className="w-3 h-3 mr-2" />
                            {props.email}
                        </a>
                        <a href={"tel:" + props.phone} className="flex items-center justify-center lg:justify-start text-slate-500 mt-5">
                            <PhoneCall className="w-3 h-3 mr-2" />
                            {props.phone}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}