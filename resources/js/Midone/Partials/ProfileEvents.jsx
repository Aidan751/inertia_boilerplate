import FeedLeftContent from '@/Midone/Partials/FeedLeftContent';
import { useForm, usePage } from '@inertiajs/inertia-react';
import React, {  useState } from 'react';
import ValidationSuccess from '@/Components/ValidationSuccess';
import ValidationErrors from '@/Components/ValidationErrors';
import FeedEvents from './FeedEvents';

export default function ProfileEvents(props){

    const page = usePage().props;

    
    return(
        <>

            <div className="px-5 pt-5 mt-5 bg-zinc-100 intro-y">
                <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">
                    <div className="xl:flex">

                        {/* Left + Middle content */}
                        <div className="md:flex flex-1">
                            <FeedLeftContent 
                                title="My Events" 
                                active={"events"}
                                toggleFunction1={props.toggleFunction1}
                                toggleFunction2={props.toggleFunction2}
                                toggleFunction3={props.toggleFunction3}
                                />

                            {/* Middle content */}
                            <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
                            <div className="md:py-8">
                                {/* Blocks */}
                                <div className="space-y-4">
                                
                                    {/* Posts */}
                                    {
                                        props.events &&

                                        props.events.map(event => (
                                            <FeedEvents
                                                userImage={props.auth.user.image}
                                                userName={props.auth.user.first_name + " " + props.auth.user.last_name}
                                                organization={props.auth.user.organization}
                                                event={event}

                                            />
                                        ))
                                    }

                                </div>

                            </div>
                            </div>                

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}