import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function AccountContactForm(props) {
    
    /**
     * InertiaJS page props are available in the hook. You can use them to get the current page data. In this instant they used to get the current user data.
     */
    const page = usePage().props;

    /**
     * UseForm Hook for handling form data and validation errors and success messages for the form.
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.phone
     * @param {string} data.telephone
     * @param {string} data.mobile
     */
    const { data, setData, put, processing, errors, reset } = useForm({
        email: page.auth.user.email,
        phone: page.auth.user.phone,
        telephone: page.auth.user.telephone,
        mobile: page.auth.user.mobile,
    });

    /**
     * Function to handle change event
     * @param {Input Event} event 
     */
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    /**
     * Function to handle submit form
     * @param {Form Submit} event 
     */
    const onHandleSubmit = (event) => {
        event.preventDefault();
        put(route("profile.contact", { id: page.auth.user.id }));
    };
    return (
        <>
            <form className="intro-y box mt-5" onSubmit={onHandleSubmit}>
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Contact Information
                    </h2>
                </div>
                
                <div className="p-5">
                    <ValidationErrors errors={errors} />
                    {
                        page.success &&
                        <ValidationSuccess message={page.message} />
                    }
                    <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                        {/* Email */}
                        <div className="col-span-12 xl:col-span-6">
                            <div>
                                <label for="update-profile-form-6" className="form-label">Email</label>
                                <input id="update-profile-form-6" type="email" className="form-control" name="email" onChange={onHandleChange} required aria-required="Please fill in your email address" value={data.email} />
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Phone</label>
                                <input id="update-profile-form-7" type="tel" className="form-control"  name="phone" onChange={onHandleChange} value={data.phone} />
                            </div>
                        </div>
                        {/* Mobile */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-8" className="form-label">Mobile</label>
                                <input id="update-profile-form-8" type="tel" className="form-control"  name="mobile" onChange={onHandleChange} value={data.mobile} />
                            </div>
                        </div>
                        {/* Telephone */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-9" className="form-label">Telephone</label>
                                <input id="update-profile-form-9" type="tel" className="form-control"  name="telephone" onChange={onHandleChange} value={data.telephone} />
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