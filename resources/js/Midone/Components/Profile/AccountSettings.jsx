import ValidationErrors from "@/Components/ValidationErrors";
import ValidationSuccess from "@/Components/ValidationSuccess";
import { useForm, usePage } from "@inertiajs/inertia-react";
import {titles} from "@/utils/Utils";
export default function AccountSettingsForm(props) {
    const page = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        title: page.auth.user.title,
        initials: page.auth.user.initials,
        name: page.auth.user.name,
        surname: page.auth.user.surname,
        preferred_name: page.auth.preferred_name,
        date_of_birth: page.auth.date_of_birth,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        
        e.preventDefault();
        put(route("profile.personal", { id: page.auth.user.id }));
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
                    <div className="grid grid-cols-12 gap-x-5 gap-y-6">

                        {/* Title */}
                        <div className="col-span-12 xl:col-span-6">
                            <div>
                                <label for="update-profile-form-6" className="form-label">Title</label>
                                <select name="title" id="update-profile-form-6" className="form-select" value={data.title} onChange={onHandleChange}>
                                    <option value="">Select Title</option>
                                    {
                                        titles.map((title, index) => {
                                            return (
                                                <option selected={data.title == title} key={index} value={title.value}>{title.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        {/* Initials */}
                        <div className="col-span-12 xl:col-span-6">
                            <div>
                                <label for="update-profile-form-6" className="form-label">Initials</label>
                                <input id="update-profile-form-6" type="text" className="form-control" placeholder="Input text"  name="initials" onChange={onHandleChange} value={data.initials} />
                            </div>
                        </div>
                        
                        {/* Name */}
                        <div className="col-span-12 xl:col-span-6">
                            <div>
                                <label for="update-profile-form-6" className="form-label">First Name</label>
                                <input id="update-profile-form-6" type="text" className="form-control" placeholder="Input text"  name="name" onChange={onHandleChange} value={data.name} />
                            </div>
                        </div>

                        {/* Surname */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-7" className="form-label">Last Name</label>
                                <input id="update-profile-form-7" type="text" className="form-control" placeholder="Input text"  name="surname" onChange={onHandleChange} value={data.surname} />
                            </div>
                        </div>

                        {/* Preferred Name */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-8" className="form-label">Preferred Name</label>
                                <input id="update-profile-form-8" type="text" className="form-control" placeholder="Input text"  name="preferred_name" onChange={onHandleChange} value={data.preferred_name} />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="col-span-12 xl:col-span-6">
                            <div className="">
                                <label for="update-profile-form-9" className="form-label">Date Of Birth</label>
                                <input id="update-profile-form-9" type="date" className="form-control" placeholder="Input text" name="date_of_birth" onChange={onHandleChange} value={data.date_of_birth} />
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