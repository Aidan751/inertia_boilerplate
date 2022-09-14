import { Menu, Transition,Dialog } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Delete, Edit2, MoreHorizontal } from 'lucide-react'
import { Inertia } from '@inertiajs/inertia'

export default function UserCardMenuDropdown(props) {

	const [isOpen, setIsOpen] = useState(false)

    const deleteRow = (event) => {
        setIsOpen(false);
        const url = "/dashboard/customer/user/" + props.id;
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

			<div className="absolute top-0 w-56 right-0 text-right">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<MoreHorizontal className="w-5 h-5 text-slate-500" />
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item>
									<button className={'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'}>
										<Edit2 />
										Edit
									</button>
								</Menu.Item>
							</div>
							<div className="px-1 py-1">
								<Menu.Item>
									<button onClick={e => setIsOpen(true)} className={'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'}>
										<Delete />
										Delete
									</button>
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</>
		
	)
}
