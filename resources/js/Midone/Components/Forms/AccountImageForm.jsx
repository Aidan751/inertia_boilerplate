import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";
import MidoneUpload from "./MidoneUpload";
import {useState} from "react"

export default function AccountImageForm(props) {
    const page = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        profile_picture: null,
        _method:"put"
    });

    const [imageUrl,setImageUrl] = useState({
        profile_picture:null,
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

    const onHandleSubmit = (e) => {
        
        e.preventDefault();
        post(route("profile.avatar", { id: page.auth.user.id }));
    };
    return (
        <>
            <form className="intro-y box mt-5" onSubmit={onHandleSubmit}>
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Change Profile Picture
                    </h2>
                </div>
                
                <div className="p-5">
                    <ValidationErrors errors={errors} />
                    {
                        page.success &&
                        <ValidationSuccess message={page.message} />
                    }
                    <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                        <div className="col-span-12 xl:col-span-12">
                            <div>
                                <label for="update-profile-form-6" className="form-label">Profile Image</label>
                                <MidoneUpload change={onHandleImageInputChange} name="profile_picture" preview={imageUrl.profile_picture} reset={resetImageInput} />

                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="btn btn-primary w-20 mr-auto">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}