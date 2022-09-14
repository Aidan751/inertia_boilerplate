import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AccountPasswordForm(props) {
    const page = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        old_password: page.auth.user.old_password,
        password: page.auth.user.password,
        password_confirmation: page.auth.user.password_confirmation,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        
        e.preventDefault();
        put("/admin/profile/account/"+page.auth.user.id);
    };
    return (
        <>
            <form className="intro-y box mt-5" onSubmit={submit}>
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Change Password
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
                        <button type="submit" className="btn btn-primary w-20 mr-auto">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}