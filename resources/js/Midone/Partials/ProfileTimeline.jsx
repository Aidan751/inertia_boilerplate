import FeedLeftContent from '@/Midone/Partials/FeedLeftContent';
import ModalBasic from '@/Midone/Components/Modals/ModalBasic';
import MidoneInput from '@/Midone/Components/Forms/MidoneInput';
import MidoneCkEditor from '@/Midone/Components/Forms/MidoneCkEditor';
import MidoneUpload from '@/Midone/Components/Forms/MidoneUpload';
import { useForm, usePage } from '@inertiajs/inertia-react';
import {  Gem, Image,  MessageCircle, Save, SidebarClose,  Video } from 'lucide-react';
import React, {  useState } from 'react';
import ValidationSuccess from '@/Components/ValidationSuccess';
import ValidationErrors from '@/Components/ValidationErrors';
import FeedPosts from './FeedPosts';

export default function ProfileTimeline(props){

    const page = usePage().props;

    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        topic: '',
        content: '',
        is_public:true,
        image: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const [imageUrl,setImageUrl] = useState({
        image:null,
        headerImage:null
    }) ;

    const onHandleImageInputChange = (event) => {

        // If there are files uploaded add them to image list
        if(event.target.files.length !== 0){

            // Add Image File
            setData(event.target.name,event.target.files[0]);

            //  Set Preview Image
            const image = URL.createObjectURL(event.target.files[0]);
            
            // Get Data Structure
            let temporaryImageArray = imageUrl;

            temporaryImageArray[event.target.name] = image;
        }
        else{
            setData(event.target.name,null);
        }
    }

    const resetImageInput = (event) => {

        setData(event.target.id,null);
        let temporaryImageArray = imageUrl;

        temporaryImageArray[event.target.id] = null;

    }
    const submit = (e) => {
        
        e.preventDefault();
        post("/admin/profile/user-post");
    };
    return(
        <>

            <div className="px-5 pt-5 mt-5 bg-zinc-100 intro-y">
            {
                page.success && 
                    <div className='md:col-span-2'>
                        <ValidationSuccess message={page.message} />
                    </div>
            }
            <div className='md:col-span-2'>
                <ValidationErrors errors={errors}  />
            </div>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">
                        <div className="xl:flex">

                            {/* Left + Middle content */}
                            <div className="md:flex flex-1">

                                <FeedLeftContent 
                                    title="My Timeline" 
                                    active="timeline"
                                    toggleFunction1={props.toggleFunction1}
                                    toggleFunction2={props.toggleFunction2}
                                    toggleFunction3={props.toggleFunction3} />

                                {/* Middle content */}
                                <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
                                <div className="md:py-8">

                                    {/* Blocks */}
                                    <div className="space-y-4">

                                    {/* Post Block */}
                                    <div className="bg-white shadow-md rounded border border-slate-200 p-5" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                                        <div className="flex items-center space-x-3 mb-5">
                                        <img className="rounded-full shrink-0" src={props.auth.user.image} width="40" height="40" alt={props.auth.user.first_name + " "+ props.auth.user.last_name} />
                                        <div className="grow">
                                            <label htmlFor="status-input" className="sr-only">
                                            What's happening, {props.auth.user.first_name}
                                            </label>
                                            <input
                                            id="status-input"
                                            className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 placeholder-slate-500"
                                            type="text"
                                            disabled
                                            onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}
                                            placeholder={"What's happening, "+ props.auth.user.first_name+"?"}
                                            />
                                        </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="grow flex space-x-5">

                                                {/* Media Button */}
                                                <button className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-700">
                                                    <Video className='w-4 h-4 mr-2' />
                                                    <span>Media</span>
                                                </button>
                                                {/* Image Button */}
                                                <button className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-700">
                                                    <Image className='w-4 h-4 mr-2' />
                                                    <span>GIF</span>
                                                </button>
                                                {/* Emoji Button */}
                                                <button className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-700">
                                                    <Gem className='w-4 h-4 mr-2' />
                                                    <span>Emoji</span>
                                                </button>
                                                
                                            </div>
                                        <div>
                                            <button disabled className="dropdown-toggle btn btn-primary shadow-md flex items-center">
                                                Post
                                                <MessageCircle className='w-4 h-4 mr-2' />
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="New Post">
                                        {/* Modal content */}
                                        <div className="px-5 py-4">
                                        
                                            <div className="space-y-3">
                                                {/* Title */}
                                                <MidoneInput name="title" type="text" value={data.title} changeFunc={onHandleChange} label="" placeholder="Title" />
                                                
                                                {/* Topic */}
                                                <MidoneInput name="topic" type="text" value={data.topic} changeFunc={onHandleChange} label="" placeholder="Topic" />
                                                {/* Image Upload */}
                                                <MidoneUpload label="" change={onHandleImageInputChange} name="image" preview={imageUrl.image} reset={resetImageInput} />

                                                {/* Content */}
                                                <MidoneCkEditor name="content" type="text" value={data.content} changeFunc={e => setData("content",e)} label="" placeholder="John" />
                                                
                                                {/* Is Post Public */}
                                                <div className="form-check form-switch flex flex-col items-start mt-3">
                                                    <label htmlFor="post-form-5" className="form-check-label ml-0 mb-2">Public</label>
                                                    <input id="post-form-5" className="form-check-input" name='is_public' onChange={onHandleChange} value={data.is_public} type="checkbox" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="px-5 py-4 border-t border-slate-200">
                                            <div className="flex flex-wrap justify-end space-x-2">
                                                <button className="btn box mr-2 flex items-center ml-auto sm:ml-0" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancel
                                                <SidebarClose className='className="w-4 h-4 ml-2"'/>
                                                </button>
                                                <button onClick={submit} processing={processing} type="submit" className="dropdown-toggle btn btn-primary shadow-md flex items-center" >
                                                    Post
                                                    <Save className="w-4 h-4 ml-2" />
                                                </button>
                                            </div>
                                        </div>
                                    </ModalBasic>
                                    {/* Posts */}
                                    {
                                        props.userPosts &&

                                        props.userPosts.map(post => (
                                            <FeedPosts
                                                userImage={props.auth.user.image}
                                                userName={props.auth.user.first_name + " " + props.auth.user.last_name}
                                                image={post.image}
                                                organization={props.auth.user.organization}
                                                title={post.title}
                                                topic={post.topic}
                                                date_time={post.date_time}
                                                content={post.content}
                                                is_public={post.is_public}
                                                id={post.id}

                                            />
                                        ))
                                    }

                                    </div>

                                </div>
                                </div>                

                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}