import DashboardCard from "@/Midone/Components/DashboardCard";
import { Link, usePage } from "@inertiajs/inertia-react"
import { RefreshCcw, ChevronsRight,GraduationCap, MoreVertical, Eye, CheckSquare, Trash2, ChevronsLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import MidoneMemberCategory from "@/Midone/Components/Course/MidoneMemberCategory";
import { Tippy } from "@/base-components";
import classNames from "classnames";

export default function MemberDashboard(){

    const memberInfo = usePage().props.memberInfo;
    const enrollments = usePage().props.enrollments;

    const [dropdown,setDropdown] = useState(false);

    const trimText = (text,length) => {

        var trimmedString = text.length > length ?
        text.substring(0, length - 3) + "..." :
        text

        return trimmedString;
    }
    return (
        <>
            <div className="col-span-12 grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="grid grid-cols-12 gap-6">
                        {/* BEGIN: General Report */}
                        <div className="col-span-12 mt-8">
                            <div className="intro-y flex items-center h-10">
                                <h2 className="text-lg font-medium truncate mr-5">
                                    General Report
                                </h2> 
                                <Link href="/dashboard" className="ml-auto flex items-center text-primary">
                                    <RefreshCcw className="w-4 h-4 mr-3" />
                                    Reload Data
                                </Link>
                            </div>
                            <div className="grid grid-cols-12 gap-6 mt-5">
                            
                                {/* Course Sales */}
                                <DashboardCard up={true} down={false} amount={memberInfo.enrolled ?? 0} title="Enrolled Courses" percentage="0">
                                    <GraduationCap className="report-box__icon text-pending" />
                                </DashboardCard>

                                {/* Course Sales */}
                                <DashboardCard up={true} down={false} amount={memberInfo.inProgress ?? 0} title="Courses In Progress" percentage="0">
                                    <GraduationCap className="report-box__icon text-pending" />
                                </DashboardCard>

                                {/* Course Sales */}
                                <DashboardCard up={true} down={false} amount={memberInfo.completed ?? 0} title="Courses Completed" percentage="0">
                                    <GraduationCap className="report-box__icon text-pending" />
                                </DashboardCard>

                                {/* Course Sales */}
                                <DashboardCard up={true} down={false} amount={memberInfo.assessmentCompleted ?? 0} title="Quizzes Completed" percentage="0">
                                    <GraduationCap className="report-box__icon text-pending" />
                                </DashboardCard>
                            </div>
                        
                        </div>
                    </div>
                </div>
            

                {/* BEGIN: My Courses */}
                <div className="col-span-12 mt-6">
                    {/* Heading */}
                    <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            My Courses
                        </h2>
                    </div>
                    {/* Table */}
                    <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                        <table className="table table-report sm:mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">IMAGES</th>
                                    <th className="">COURSE</th>
                                    <th className="text-center whitespace-nowrap">MODULES</th>
                                    <th className="text-center whitespace-nowrap">STATUS</th>
                                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                            {enrollments.map((enrollment, fakerKey) => (
                                <tr key={fakerKey} className="intro-x">
                                    {/* First Column */}
                                    <td className="w-40">
                                        <div className="flex">
                                            <div className="w-10 h-10 image-fit zoom-in">
                                                <Tippy tag="img" alt={enrollment.course.name} className="rounded-full" src={enrollment.course.featureImage} content={`Uploaded at ${enrollment.created_at}`} />
                                            </div>
                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                <Tippy tag="img" alt={enrollment.course.name} className="rounded-full" src={enrollment.course.headerImage} content={`Uploaded at ${enrollment.created_at}`} />
                                            </div>
                                        </div>
                                    </td>
                                    {/* Course Details */}
                                    <td>
                                        <span className="font-medium whitespace-nowrap">
                                            {enrollment.course.name}
                                        </span>
                                        <div className="text-slate-700 text-xs mt-0.5">
                                            {trimText(enrollment.course.metaDescription,100)}
                                        </div>
                                    </td>
                                    {/* Amount of Course Sections */}
                                    <td className="text-center">
                                        {enrollment.course.sections.length}
                                    </td>
                                    {/* Course Completion Status */}
                                    <td className="w-40">
                                        <div
                                            className={classNames({
                                                "flex items-center justify-center": true,
                                                "text-success": enrollment.completed,
                                                "text-warning": !enrollment.completed,
                                            })}
                                        >
                                            <CheckSquare className="w-4 h-4 mr-2" />
                                            {enrollment.completed ? "Completed" : "In Progress"}
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            <Link className="flex items-center mr-3 text-success" href={"/dashboard/courses/"+enrollment.course.id}>
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    
                </div>
                {/* END: My Courses */}
            </div>
        </>
    )
}