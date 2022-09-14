import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AccountPasswordForm(props) {
    
    /**
     * InertiaJS page props are available in the hook. You can use them to get the current page data. In this instant they used to get the current user data.
     */
    const page = usePage().props;
    /**
     * UseForm Hook for handling form data and validation errors and success messages for the form.
     */
    const { data, setData, put, processing, errors, reset } = useForm({
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    /**
     * Function to handle change event
     * @param {Input Change} event 
     */
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    /**
     * Function to handle submit form and send data to the server via InertiaJS. The form updates the user password.
     * @param {Password Change} event 
     */
    const onHandleSubmit = (event) => {
        
        event.preventDefault();
        put(route("profile.password", { id: page.auth.user.id }),{
            onSuccess: () => {
                reset();
            }
        });
    };


    return (
        <>
            <form className="intro-y box mt-5" onSubmit={onHandleSubmit}>
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Change Password
                    </h2>
                </div>
                
                <div className="p-5">
                    <ValidationErrors errors={errors} />
                    <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                        <div className="col-span-12 xl:col-span-12">
                            <div>
                                <label for="update-profile-form-6" className="form-label">Old Password</label>
                                <input id="update-profile-form-6" type="password" className="form-control"   name="old_password" onChange={onHandleChange} value={data.old_password} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-12">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">New Password</label>
                                <input id="update-profile-form-7" type="password" className="form-control"  name="password" onChange={onHandleChange} value={data.password} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-12">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Confirm Password</label>
                                <input id="update-profile-form-7" type="password" className="form-control"  name="password_confirmation" onChange={onHandleChange} value={data.password_confirmation} />
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="btn btn-primary w-20 mr-auto">
                            {
                                processing ? "Processing..." : "Save"
                            }
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}