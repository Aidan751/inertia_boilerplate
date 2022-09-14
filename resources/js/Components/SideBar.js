import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import AdminSideBar from '@/Partials/AdminSideBar';


export default function SideBar({ user }) {
    return (

            <div className="row justify-content-center">
                <div className="col-sm-3 sidebar col-fixed">

                    <AdminSideBar />

                </div>
            </div>


    )
}
