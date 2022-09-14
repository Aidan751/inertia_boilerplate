import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'


export default function SideBarListHeading({ title }) {
    return (
        <div style={{backgroundColor: "#D4D4D4"}}>
            <li style={{padding: "20px", fontWeight: "bold"}}>{ title }</li>
        </div>

    )
}
