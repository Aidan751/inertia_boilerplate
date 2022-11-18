

import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import {
    Search,
    CheckSquare,
    ChevronRight,
    ChevronsRight,
    ChevronsLeft,
    XCircle,
    Trash2,
    ChevronLeft,
    Eye
} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Complete(props){


    const [stripe] = useState(props.stripe);

    if(stripe){
        return (
            <>
                <Authenticated
                    auth={props.auth}
                    errors={props.errors}
                    activeGroup={9}
                    activeItem={1}
                >

                    {/* Define Page Title */}
                    <Head title="Stripe Connection" />


                    {/* Page Content */}
                    <main className="col-span-12 p-10">

                        {/* Page Header */}
                        <h2 className="intro-y text-lg font-medium mt-10 mb-5">Stripe id: {stripe.id}</h2>

                        {/* Show Success Validation Component */}
                        {
                            props.success &&
                            <ValidationSuccess message={props.success} />
                        }

                        {/*  */}

                        <div class="title">
                            Your Stripe account has been setup and is linked to the platform. Your restaurant listing is live.</div>
                        <br />
                        <b>Important:</b>
                        <p className="mb-5">Your Stripe login details are separate to this admin. Please take note of your Stripe login details, these are required to login to Stripe and view all transations.</p>
                        <b>Payments:</b>
                        <p className="mb-5">All payments are made directly into your Stripe account only. In order to withdraw your payments you will need to login to your Stripe account and withdraw to your bank account.</p>

                    </main>

                </Authenticated>
            </>
        )
    }else{


        return (
            <>
                <Authenticated
                    auth={props.auth}
                    errors={props.errors}
                    activeGroup={9}
                    activeItem={1}
                >

                    {/* Define Page Title */}
                    <Head title="Stripe Connection" />


                    {/* Page Content */}
                    <main className="col-span-12 p-10">

                        {/* Page Header */}
                        <h2 className="intro-y text-lg font-medium mt-10 mb-5">Stripe Connection</h2>

                        {/* Show Success Validation Component */}
                        {
                            props.success &&
                            <ValidationSuccess message={props.success} />
                        }

                        {/*  */}

                        <div class="title">

                            <Link href={route("restaurant.stripe.link")} className="btn btn-primary">
                                <Eye className="w-4 h-4 mr-1" />{" "}
                                Click to connect your account
                            </Link>

                        </div>

                    </main>

                </Authenticated>
            </>
        )
    }


}
