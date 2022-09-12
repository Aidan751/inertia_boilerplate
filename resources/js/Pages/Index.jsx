import React from 'react'

import { Head } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'


export default function Login({ hello }) {
    return (
     <div>
        <h1>Welcome</h1>
        <p>Hello {hello}, welcome to your first Inertia app!</p>
     </div>
    )
  }
