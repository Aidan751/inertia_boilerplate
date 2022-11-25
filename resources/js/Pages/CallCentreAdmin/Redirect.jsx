import Button from "@/components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import ValidationSuccess from "@/Components/ValidationSuccess";

function Redirect(props) {
    const { errors } = usePage().props;



    const { data, setData, get, processing } = useForm({
        role: 'call_centre_admin',
    });

    window.location.replace(props.stripe_url)

}

export default Redirect;
