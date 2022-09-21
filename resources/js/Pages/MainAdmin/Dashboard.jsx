import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';

export default function Welcome(props) {
    return (
        <>
            <Authenticated
                auth={props.auth}
                activeGroup={0}
            >
                <Head title="Order It - Top Level" />
            </Authenticated>
        </>
    );
}
