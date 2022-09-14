import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'


export default function SideBarListItem({ title, url = '#' }) {
    return (
        <li>
            <a href={url} className="text-dark">{ title }</a>
        </li>

    )
}
