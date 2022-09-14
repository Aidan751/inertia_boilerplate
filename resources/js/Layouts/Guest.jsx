import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import "@/Css/skillfy.css";
import PublicFooter from '@/Skillfy/Components/PublicFooter';
import PublicHeader from '@/Skillfy/Components/PublicHeader';
export default function Guest({ children }) {
    return (
        <>
            <PublicHeader />
                <main className='min-h-screen'>
                    {children}
                </main>
            <PublicFooter />
        </>
    );
}
