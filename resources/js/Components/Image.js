import React from 'react'
import { render } from 'react-dom'
import { Head, Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'


export default function Image(props) {
    return (
        <div>
           <img src={props.src} alt={props.alt} style={{ borderRadius: "10px" }} height={props.height} width={props.width} />
        </div>

    )
}
