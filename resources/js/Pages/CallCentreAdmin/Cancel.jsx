import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import ValidationSuccess from "@/Components/ValidationSuccess";

function Cancel(props) {
    const { errors } = usePage().props;

    const { data, setData, get, processing } = useForm({
        role: 'call_centre_admin',
    })

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={16}
                activeItem={1}
            >
                <div className="col-span-12">
                    <div className="intro-y flex items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto">Payment Cancelled</h2>
                    </div>
                    <div className="intro-y flex items-center mt-3">
                        <p className="text-gray-600">Unfortunately your payment is cancelled</p>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}

export default Cancel;
