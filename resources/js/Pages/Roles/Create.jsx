import ValidationErrors from "@/Components/ValidationErrors";
// TODO: Add the rest of the imports
// import ValidationSuccess from "@/Components/ValidationSuccess";
// import AdminLayout from "@/Layouts/AdminLayout";
// import MidoneButton from "@/Midone/Components/Forms/MidoneButton";
// import MidoneInput from "@/Midone/Components/Forms/MidoneInput";
// import MidoneTextArea from "@/Midone/Components/Forms/MidoneTextArea";
import { Head, useForm } from '@inertiajs/inertia-react';

export default function CreatePermissions(props){

    const { data, setData, post, processing, errors, reset } = useForm({
        display_name: '',
        name: '',
        description: '',
        permissions: [],
    });
    console.log(props.permissions)
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('site-admin.roles.store'));
    };

    return (
        <>
            <AdminLayout
            auth={props.auth}
            errors={props.errors}
            activeGroup={1}

        >
            <Head title="Site Admin - Roles" />

            <div className="col-span-12">
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        Create Roles
                    </h2>
                </div>
                <div className=" grid grid-cols-12 gap-6 mt-5">
                    <div className="intro-y col-span-12 lg:col-span-9">
                        {/* BEGIN: Form */}
                        <form onSubmit={submit} className="intro-y box p-5">

                            {
                                props.success &&
                                <ValidationSuccess message={props.message} />
                            }

                            <ValidationErrors errors={errors}  />

                            {/* Display Name */}
                            <MidoneInput name="display_name" type="text" value={data.display_name} changeFunc={onHandleChange} label="Display Name" placeholder="Admin" />

                            {/* Name */}
                            <MidoneInput name="name" type="text" value={data.name} changeFunc={onHandleChange} label="Name" placeholder="admin" />

                            {/* Description */}
                            <MidoneTextArea name="description"  value={data.description} change={onHandleChange} label="Description" placeholder="lorem ipsum" />

                            {/* Submit Button */}
                            <MidoneButton type="submit" title="Create" processing={processing} />
                        </form>
                        {/* END: Form */}
                    </div>
                </div>
            </div>
        </AdminLayout>
        </>
    )
}
