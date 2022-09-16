import React from 'react';
import ApplicationLogo from '@/images/logo_sml.png';
import illustration from '@/images/illustration.svg';

export default function AuthLayout({ children }) {
    return (
        <section className="login bg-zinc-100">
            <div className='container sm:px-10'>
                <div className='block xl:grid grid-cols-2 gap-4'>
                    {/* Intro */}
                    <div class="hidden xl:flex flex-col min-h-screen">
                        <a href="/" class="-intro-x flex pt-5">
                            <img alt="South African Guild of Actors" class="h-10 w-auto" src={ApplicationLogo} />
                            <span class="text-white text-lg ml-3"> ORDER IT </span> 
                        </a>
                        <div class="my-auto">
                            <img alt="South African Guild of Actors" class="-intro-x -mt-16 max-h-60" src={illustration} />
                            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                A few more clicks to 
                                <br />
                                sign in to your account.
                            </div>
                            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 ">Manage all your accounts in one place.</div>
                        </div>
                    </div>

                    {/* Auth Page */}
                    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                        <div className="my-auto mx-auto xl:ml-20 bg-white  xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                            {children}
                        </div>
                    </div>
                </div>
                
            </div>
            
            
        </section>
    );
}
