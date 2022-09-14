import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AccountContactForm(props) {
    const page = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        email: page.auth.user.email,
        phone: page.auth.user.phone,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        
        e.preventDefault();
        put("/admin/profile/email/"+page.auth.user.id);
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
                                <label for="update-profile-form-6" className="form-label">Email</label>
                                <input id="update-profile-form-6" type="email" className="form-control"   name="email" onChange={onHandleChange} value={data.email} />
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-12">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Phone</label>
                                <input id="update-profile-form-7" type="tel" className="form-control"  name="phone" onChange={onHandleChange} value={data.phone} />
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