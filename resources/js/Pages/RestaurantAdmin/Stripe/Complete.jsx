{/* <div class="admin-header">
<h3>Stripe</h3>
</div>


<div class="title">Your Stripe account has been setup and is linked to the platform. Your restaurant listing is now live.</div>
<br>
<b>Important:</b>
<p>Your Stripe login details are separate to this admin. Please take note of your Stripe login details, these are required to login to Stripe and view all transations.</p>
<b>Payments:</b>
<p>All payments are made directly into your Stripe account only. In order to withdraw your payments you will need to login to your Stripe account and withdraw to your bank account.</p> */}


import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Complete(props){


    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={10}
                activeItem={4}
            >

                {/* Define Page Title */}
                <Head title="Stripe login" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">Stripe</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                    <div class="title">Your Stripe account has been setup and is linked to the platform. Your restaurant listing is now live.</div>
                    <br />
                    <b>Important:</b>
                    <p>Your Stripe login details are separate to this admin. Please take note of your Stripe login details, these are required to login to Stripe and view all transations.</p>
                    <b>Payments:</b>
                    <p>All payments are made directly into your Stripe account only. In order to withdraw your payments you will need to login to your Stripe account and withdraw to your bank account.</p>
                    </div>

                </main>

            </Authenticated>
        </>
    )
}
