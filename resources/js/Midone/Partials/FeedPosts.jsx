import DropdownEditMenu from '@/Components/DropdownEditMenu';
import { Link, useForm } from '@inertiajs/inertia-react';
import { Save } from 'lucide-react';
import React, {  useState } from 'react';
import MidoneCkEditor from '../Components/Forms/MidoneCkEditor';
import MidoneInput from '../Components/Forms/MidoneInput';
import MidoneUpload from '../Components/Forms/MidoneUpload';
import ModalBasic from '../Components/Modals/ModalBasic';


function FeedPosts({userImage,userName,organization,title,topic,image,date_time,content,id,is_public}) {

    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
    const { data, setData, put, processing, errors, reset } = useForm({
        title: title,
        topic: topic,
        content: content,
        is_public:is_public,
        image: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const [imageUrl,setImageUrl] = useState({
        image:image,
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
        put("/admin/profile/user-post"+id);
    };

  return (
    <>

      {/* Post 2 */}
      <div key={id} className="bg-white shadow-md rounded border border-slate-200 p-5">
        {/* Header */}
        <header className="flex justify-between items-start space-x-3 mb-3">
          {/* User */}
          <div className="flex items-start space-x-3">
            <img className="rounded-full shrink-0" src={userImage ?? ""} width="40" height="40" />
            <div>
              <div className="leading-tight">
                <a className="text-sm font-semibold text-slate-800" href="#0">
                  {userName}
                </a>
              </div>
              <div className="inline-flex items-center">
                <div className="text-xs text-slate-500">{organization ?? ""}</div>
              </div>
            </div>
          </div>
          {/* Menu button */}
          <DropdownEditMenu align="right" className="relative inline-flex shrink-0">
            <li>
              <button className="font-medium w-full text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                Edit
              </button>
            </li>
            
            <li>
              <Link as='button' method='DELETE' action={"/admin/profile/user-post/"+id} className="font-medium w-full text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" >
                Delete
              </Link>
            </li>
          </DropdownEditMenu>
        </header>
        {/* Body */}
        <div className="text-sm text-slate-800 space-y-2 mb-5">
            <span className='font-sans font-semibold text-base'>{title ?? ""}</span>
            <span className='font-sans font-semibold text-base'>{topic ?? ""}</span>
            
            <div className="relative !my-4">
                <img className="block w-full" src={image ?? ""} width="590" height="332" alt="Feed 01" />
                <div className="absolute left-0 right-0 bottom-0 p-4 bg-black bg-opacity-25 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-slate-300">Uploaded on {date_time}</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                dangerouslySetInnerHTML={{__html: content}}
                />
        </div>
        
      </div>

      
        {/* Edit Form */}
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
                                                </button>
                                                <button onClick={submit} processing={processing} type="submit" className="dropdown-toggle btn btn-primary shadow-md flex items-center" >
                                                    Save
                                                    <Save className="w-4 h-4 ml-2" />
                                                </button>
                                            </div>
                                        </div>
                                    </ModalBasic>
    </>
  );
}

export default FeedPosts;
