import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Footer from '@/Components/Footer';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div>
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" />

                  <input
                    id="email"
                    type="email"
                    className="w-full mt-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    name="email"
                    value={data.email}
                    required
                    autoFocus
                    onChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full mt-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        autoComplete="current-password"
                        onChange={onHandleChange}
                    />
                </div>



                <div className="flex items-center justify-end mt-4">
                        {/* <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link> */}
                        <Link
                            href="#"
                            className="underline text-sm txt-purple hover:text-gray-900 mr-2"
                            style={{color: 'rgb(183, 38, 126)'}}
                        >
                            Forgot your password?
                        </Link>


                    <Button className="ml-4">
                        Log in
                    </Button>
                </div>
            </form>
        </Guest>
        <Footer appName="Order It" />
    </div>
    );
}
