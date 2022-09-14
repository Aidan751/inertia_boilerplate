import React from 'react';
import PieChart from '@/Charts/PieChart';

// Import utilities
import { tailwindConfig } from '@/Utils/Utils';

export default function ReportCard5({title,yes,no}) {
    
  const chartData = {
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [
      {
        label: 'Attendees Vaccination Status After Workshop',
        data: [yes, no],
        backgroundColor: [
            'rgb(13,33,54)','rgb(46,119,174)',"rgb(224,234,245)"
        ],
        hoverBackgroundColor: [
            'rgb(13,33,54)','rgb(46,119,174)',"rgb(224,234,245)"
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Vaccination Status Change After Workshop in {title}</h2>
      </header>
      <div className='py-4'></div>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={220} />
    </div>
  );
}
