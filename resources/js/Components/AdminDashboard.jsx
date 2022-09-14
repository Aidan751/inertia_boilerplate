import { Link } from "@inertiajs/inertia-react"
import { RefreshCcw, ShoppingCart, Aperture } from "lucide-react";
import DashboardCard from '@/Midone/Components/Dashboard/DashboardCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useState,useEffect } from "react";
import axios from "axios";

  import DonutChart from "@/Components/donut-chart/Main";
  import PieChart from "@/Components/pie-chart/Main";
export default function AdminDashboard(props){


    const [metrics,setMetrics] = useState({});
    const [graphData,setGraphData] = useState({});
    const toggle = () => {

    }
    useEffect(() => {

        axios.get("/api/dashboard/metrics").then(
            response => setMetrics(response.data)
        ).catch(
            error => console.log(error)
        )
    },[])
    useEffect(() => {

        axios.get("/api/dashboard/graphs").then(
            response => setGraphData(response.data)
        ).catch(
            error => console.log(error)
        )
    },[])

    return (
        <>
    
            <div className="col-span-12 mt-8">

                {/* Title */}
                <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                    General Report
                    </h2>
                    <Link href={"/dashboard"} className="ml-auto flex items-center text-primary">
                        <RefreshCcw className="w-4 h-4 mr-3" /> 
                        Reload Data
                    </Link>
                </div>

                {/* Cards */}

                <Splide
                    options={ {
                        type:"loop",
                        rewind: true,
                        perPage:5,
                        gap   : '1rem',
                        perMove:1,
                        breakpoints: {
                            640: {
                                perPage: 1,
                            },
                            768: {
                                perPage: 2,
                            },
                            1024: {
                                perPage: 3,
                            },
                            1280: {
                                perPage: 4,
                            },
                            1536: {
                                perPage: 4,
                            },
                    }
                    } }
                aria-label="My Favorite Images">
                    <SplideSlide>
                        <DashboardCard title="Course Sales" amount={metrics.sales ?? 0} notes="" success={true}>
                            <ShoppingCart className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    <SplideSlide>
                        <DashboardCard title="Total Members" amount={metrics.members ?? 0} notes="" success={true}>
                            <Aperture className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    <SplideSlide>
                        <DashboardCard title="Total Customers" amount={metrics.customers ?? 0} notes="" success={true}>
                            <Aperture className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    <SplideSlide>
                        <DashboardCard title="Total Courses" amount={metrics.courses ?? 0} notes="" success={true}>
                            <Aperture className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    <SplideSlide>
                        <DashboardCard title="Total Categories" amount={metrics.categories ?? 0} notes="" success={true}>
                            <Aperture className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    <SplideSlide>
                        <DashboardCard title="Courses Enrollments" amount={metrics.courseEnrollments ?? 0} notes="" success={true}>
                            <Aperture className="report-box__icon text-primary" />
                        </DashboardCard>
                    </SplideSlide>
                    
                </Splide>

                {/* Sales per month */}
                {/* Course Completion Per Month */}
                {/* Course Enrollment Per Month */}
                
                <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                    <div className="col-span-12 lg:col-span-6">
                        {/* BEGIN: Membership Types */}
                        <div className="intro-y box mt-5">
                            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60">
                                <h2 className="font-medium text-base mr-auto">Membership Types</h2>
                            </div>
                            <div className="p-5">
                                <DonutChart data1={graphData["full member"]} data2={graphData["associate member"]} data3={graphData["student member"]} height={400} />
                            </div>
                        </div>
                        {/* END: Membership Types */}
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        {/* BEGIN: Pie Chart */}
                        <div className="intro-y box mt-5">
                                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60">
                                <h2 className="font-medium text-base mr-auto">Members Vs Customers</h2>
                            </div>
                            <div className="p-5">
                                <PieChart data1={metrics.customers} data2={metrics.members} height={400}  />
                            </div>
                        </div>
                        {/* END: Pie Chart */}
                    </div>
                </div>
                
            </div>
            
        </>
    )
}