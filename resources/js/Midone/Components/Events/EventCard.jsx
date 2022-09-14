import { Inertia } from "@inertiajs/inertia";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Eye, MoreHorizontal, Share2, Smile, ThumbsDown, ThumbsUp } from "lucide-react";
import {useState} from "react";
export default function FeedCard(props){
    const { data, setData, post, processing, errors, reset } = useForm({
        comment:"",
        post:props.id
    });
    const [showComments,setShowComments] = useState(false);
    function unlike(){
        const url = "/admin/feed/like/" + props.currentLike[0].id;
        
        Inertia.delete(url,{
            post:props.id
        });
    }

    function like(){
        const url = "/admin/feed/like";
        Inertia.post(url,{
            post:props.id
        });
    }
    function comment(e){
        e.preventDefault();
        post("/admin/feed/comment");
    }

    return (
        <>
            <div key={props.key} className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box !shadow-2xl">
                {/* Top Part */}
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4">
                    {
                        props.authorImage &&
                        <div className="w-10 h-10 flex-none image-fit">
                            <img src={props.authorImage} srcSet={props.authorImage}  className="rounded-full" />
                        </div>
                    }
                    {
                        props.author &&
                        <div className="ml-3 mr-auto">
                            <span className="font-medium">{props.author}</span> 
                            <div className="flex text-slate-500 truncate text-xs mt-0.5">
                                {/* <span className="text-primary inline-block truncate">{props.organization}</span> */}
                                <span className="mx-1">•</span> {props.workshop_date_time} 
                            </div>
                        </div>
                    }
                </div>
                {/* Middle Pard */}
                <div className="p-5">
                    <div className="h-40 2xl:h-56 image-fit">
                        {
                            props.coverImage &&
                            <img title={props.workshop_date_time} className="rounded-md tooltip" src={props.coverImage} />
                        }
                    </div>
                    <span className="block font-medium text-base mt-5">
                        {props.title}
                    </span>
                    <span className="block font-medium text-sm mt-5">
                        {props.workshop_title}
                    </span>
                    <span className="block font-medium text-sm mt-5">
                        Workshop Rating: {props.workshopRating}
                    </span>
                    
                </div>
                <div className="flex px-5 py-3 border-t border-slate-200/60 ">
                    <Link className="intro-x w-12 h-12 flex items-center justify-center rounded-full text-primary bg-primary/10  dark:text-slate-300 ml-auto tooltip" title="View Workshop" 
                    href={"/admin/workshop/"+props.id+"/attendance"}> 
                        <Eye className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </>
    )
}