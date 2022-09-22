import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';

export default function Dashboard(props) {
    return (
        <>
            <Authenticated
                auth={props.auth}
                // TODO: query as to why this active group is not working as intended
                activeGroup={0}
            >
                <Head title="Order It - Restaurant Admin Level" />
            </Authenticated>
        </>
    );
}
