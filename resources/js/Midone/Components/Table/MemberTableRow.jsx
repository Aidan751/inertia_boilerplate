import { Link } from "@inertiajs/inertia-react";
import { CheckSquare, CreditCard, Trash2 } from "lucide-react";
import { useState,Fragment } from "react";
import { Dialog,Transition } from '@headlessui/react';
import { Inertia } from "@inertiajs/inertia";
export default function MemberTableRow(props){
    const user = props.user;
    const [isOpen, setIsOpen] = useState(false)

    const deleteRow = (event) => {
        setIsOpen(false);
        const url = "/dashboard/member/user/" + user.id;
        Inertia.delete(url);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Delete account
                        </Dialog.Title>
                        <Dialog.Description className="text-lg font-medium leading-6 text-gray-900">
                            This will permanently delete your account
                        </Dialog.Description>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            Are you sure you want to delete this account? All of the data
                            will be permanently removed. This action cannot be undone.
                            </p>
                        </div>

                        <div className="mt-4 flex items-center space-x-4">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={deleteRow}
                            >
                            Delete
                            </button>

                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                            onClick={e => setIsOpen(false)}
                            >
                            Cancel
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
            <tr className="intro-x">
                {/* Image */}
                <td className="w-40">
                    <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                            <img alt={user.first_name + " " + user.last_name} className="tooltip rounded-full" src={user.picture} title="Uploaded at 20 August 2020" />
                        </div>
                    </div>
                </td>
                {/* Personal Information */}
                <td>
                    {/* Name */}
                    <span className="font-medium whitespace-nowrap">
                        {user.first_name} {user.middle_name} {user.last_name}
                    </span>
                    {/* Email */}
                    <Link href={"mailto:"+user.email} className="block text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {user.email}
                    </Link>
                    {/* Phone */}
                    <Link href={"tel:"+user.phone} className="block text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {user.phone}
                    </Link>
                    {/* Province */}
                    <span className="block text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {user.province}
                    </span>
                </td>
                {/* Membership Number */}
                <td className="text-center">
                    {user.memberInstance.memberId}
                </td>
                {/* Membership Status */}
                <td className="w-40">
                    {
                        user.memberInstance.active == 1 && 
                        <div className="flex items-center justify-center text-success">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Active
                        </div>
                    }
                    {
                        user.memberInstance.active == 0 &&
                        <div className="flex items-center justify-center text-danger">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            InActive
                        </div>
                    }                                                        
                </td>
                {/* Actions */}
                <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                        {/* Edit Buttons */}
                        <Link href={"/dashboard/member/user/edit/" + user.id} className="flex items-center mr-3">
                            <CheckSquare className="w-4 h-4 mr-1" />
                            Edit
                        </Link>
                        {/* Delete Buttons */}
                        <button onClick={e => setIsOpen(true)} className="flex items-center text-danger"  data-tw-toggle="modal" data-tw-target="#delete-confirmation-modal">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}