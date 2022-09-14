import {
    Modal,
    ModalBody,
  } from "@/base-components";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import {  CheckSquare, Eye, XCircle, PlusSquare, Trash2, } from "lucide-react";

export default function MidoneCourseSectionCard({section}){
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const openModal = (event) => {
        event.preventDefault();
        setDeleteConfirmationModal(true);
    }

    return (
        <>
            <div key={section.id} className="intro-y col-span-12 md:col-span-6 lg:col-span-4 ">
                <div className="box">
                    <div className="p-5">
                        <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                            <img alt={section.name} className="rounded-md" src={"/images/video-img.png"} />
                                                
                            <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                                <Link href={"/dashboard/admin/courses/course-material/view/" + section.id} className="block font-medium text-base">
                                    {section.name}
                                </Link>
                            </div>
                        </div>
                        <div className="text-slate-600 dark:text-slate-500 mt-5">
                            <div className="flex items-center">
                                {section.introduction}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60">
                        <Link className="flex items-center text-primary mr-auto" href={"/dashboard/admin/courses/course-material/view/" + section.id}>
                            <PlusSquare  className="w-4 h-4 mr-1" /> Add Material
                        </Link>
                        <Link className="flex items-center mr-3" href={"/dashboard/admin/courses/course-section/edit/" + section.id}>
                            <CheckSquare  className="w-4 h-4 mr-1" /> Edit
                        </Link>
                        <Link className="flex items-center text-danger" href={"/dashboard/admin/courses/course-material/delete/" + section.id} as="button" method="delete" onClick={openModal}>
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Link>
                    </div>
                </div>
            </div>


            {/* BEGIN: Delete Confirmation Modal */}
            <Modal
                show={deleteConfirmationModal}
                onHidden={() => {
                setDeleteConfirmationModal(false);
                }}
            >
                <ModalBody className="p-0">
                <div className="p-5 text-center">
                    <XCircle
                    className="w-16 h-16 text-danger mx-auto mt-3"
                    />
                    <div className="text-3xl mt-5">Are you sure?</div>
                    <div className="text-slate-500 mt-2">
                    Do you really want to delete these records? <br />
                    This process cannot be undone.
                    </div>
                </div>
                <div className="px-5 pb-8 text-center">
                    <button
                    type="button"
                    onClick={() => {
                        setDeleteConfirmationModal(false);
                    }}
                    className="btn btn-outline-secondary w-24 mr-1"
                    >
                    Cancel
                    </button>
                    <Link href={"/dashboard/admin/courses/course-section/delete/" + section.id} as="button" method="delete" className="btn btn-danger w-24">
                    Delete
                    </Link>
                </div>
                </ModalBody>
            </Modal>
            {/* END: Delete Confirmation Modal */}
        </>
    )
}