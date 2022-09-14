import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AccountSettingsForm(props) {
    const page = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: page.auth.user.first_name,
        last_name: page.auth.user.last_name,
        organization: page.auth.user.organization,
        about: page.auth.user.about,
        facebook_link: page.auth.user.facebook_link,
        instagram_link: page.auth.user.instagram_link,
        twitter_link: page.auth.user.twitter_link,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        
        e.preventDefault();
        put("/admin/profile/"+page.auth.user.id);
    };
    return (
        <>
            <form className="intro-y box mt-5" onSubmit={submit}>
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Personal Information
                    </h2>
                </div>
                
                <div className="p-5">
                    <ValidationErrors errors={errors} />
                    {
                        page.success &&
                        <ValidationSuccess message={page.message} />
                    }
                    <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                        <div className="col-span-12 xl:col-span-6">
                            <div>
                                <label for="update-profile-form-6" className="form-label">First Name</label>
                                <input id="update-profile-form-6" type="text" className="form-control" placeholder="Input text"  name="first_name" onChange={onHandleChange} value={data.first_name} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Last Name</label>
                                <input id="update-profile-form-7" type="text" className="form-control" placeholder="Input text"  name="last_name" onChange={onHandleChange} value={data.last_name} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-12">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Organization</label>
                                <input id="update-profile-form-7" type="text" className="form-control" placeholder="Input text"  name="organization" onChange={onHandleChange} value={data.organization} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-12">
                            <div className="">
                                <label for="update-profile-form-8" className="form-label">About</label>
                                <textarea id="update-profile-form-8" rows={3} className="form-control" name="about" onChange={onHandleChange} value={data.about}>
                                </textarea>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="">
                                <label for="update-profile-form-9" className="form-label">Facebook Link</label>
                                <input id="update-profile-form-9" type="url" className="form-control" name="facebook_link" onChange={onHandleChange} value={data.facebook_link} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="">
                                <label for="update-profile-form-10" className="form-label">Twitter Link</label>
                                <input id="update-profile-form-10" type="url" className="form-control" name="twitter_link" onChange={onHandleChange} value={data.twitter_link} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="">
                                <label for="update-profile-form-11" className="form-label">Instagram Link</label>
                                <input id="update-profile-form-11" type="url" className="form-control" name="instagram_link" onChange={onHandleChange} value={data.instagram_link} />
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