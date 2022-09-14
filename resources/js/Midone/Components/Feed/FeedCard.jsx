import { Inertia } from "@inertiajs/inertia";
import { Link, useForm } from "@inertiajs/inertia-react";
import { MoreHorizontal, Share2, Smile, ThumbsDown, ThumbsUp } from "lucide-react";
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
            <div className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box">
                {/* Top Part */}
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4">
                    {
                        props.authorImage &&
                        <div className="w-10 h-10 flex-none image-fit">
                            <img  className="rounded-full" src={props.authorImage} />
                        </div>
                    }
                    {
                        props.author &&
                        <div className="ml-3 mr-auto">
                            <span className="font-medium">{props.author}</span> 
                            <div className="flex text-slate-500 truncate text-xs mt-0.5">
                                <span className="text-primary inline-block truncate">{props.organization}</span>
                                <span className="mx-1">•</span> {props.date_time} 
                            </div>
                        </div>
                    }
                </div>
                {/* Middle Pard */}
                <div className="p-5">
                    <div className="h-40 2xl:h-56 image-fit">
                        {
                            props.image &&
                            <img title={props.date_time} className="rounded-md tooltip" src={props.image} />
                        }
                    </div>
                    <Link href={props.slug} className="block font-medium text-base mt-5">
                        {props.title}
                    </Link>
                    <span className="block font-medium text-sm mt-5">
                        {props.topic}
                    </span>
                    <div className="text-slate-600 dark:text-slate-500 mt-2">
                        {
                            props.content &&

                            <div dangerouslySetInnerHTML={{__html: props.content}}/>
                        }
                    </div>
                </div>
                {
                    props.author &&
                    <div className="flex items-center px-5 py-3 border-t border-slate-200/60 ">
                        {
                            props.liked_post ?
                            <button onClick={unlike} className="intro-x w-8 h-8 flex items-center justify-center rounded-full border border-slate-300  dark:text-slate-300 text-slate-300 mr-2 tooltip bg-primary " title="Like">
                                <ThumbsDown className="w-3 h-3" />
                            </button>
                            :
                            <button onClick={like} className="intro-x w-8 h-8 flex items-center justify-center rounded-full border border-slate-300  dark:text-slate-300 text-slate-500 mr-2 tooltip" title="Like">
                                <ThumbsUp className="w-3 h-3" />
                            </button>
                        }
                        
                        <div className="intro-x flex mr-2">
                        
                        </div>
                        <Link className="intro-x w-8 h-8 flex items-center justify-center rounded-full text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300 ml-auto tooltip" title="Share"> 
                            <Share2 className="w-3 h-3" /> </Link>
                        
                    </div>
                }
                {
                    props.author &&
                    <div className="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
                        <div className="w-full flex text-slate-500 text-xs sm:text-sm justify-between">
                            <div className="mr-2"> Comments: <span className="font-medium">{props.comment_count}</span> </div>
                            <div className="ml-auto"> Likes: <span className="font-medium">{props.likes}</span> </div>
                        </div>
                        <div className="w-full flex items-center mt-3">
                            <div className="w-8 h-8 flex-none image-fit mr-3">
                                <img  className="rounded-full" src={props.authorImage} />
                            </div>
                            <form className="flex-1 relative text-slate-600" onSubmit={comment}>
                                <input type="text" value={data.comment} onChange={e => setData("comment",e.target.value)} className="form-control form-control-rounded border-transparent bg-slate-100 pr-10" placeholder="Post a comment..." />
                                <Smile data-lucide="smile" className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" /> 
                            </form>
                        </div>

                        {
                            props.comments &&
                            <button className="mx-auto block pt-2">
                                <MoreHorizontal onClick={e => setShowComments(!showComments)} className="w-6 h-6"/>
                            </button>
                        }
                        {
                            showComments && 

                            <div className="intro-y mt-1 pb-10">
                                {
                                    props.comments &&
                                    props.comments.map(commentItem => (
                                        <div className="pt-5">
                                            <div className="flex">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit">
                                                <img className="rounded-full" src={commentItem.profile_pic} />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <div className="flex">
                                                    <span className="font-medium">{commentItem.author}</span>
                                                </div>
                                                <div className="text-slate-500 text-xs sm:text-sm">{commentItem.date_time}</div>
                                                <div className="mt-2">{commentItem.comment}</div>
                                            </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                }
                

            </div>
        </>
    )
}