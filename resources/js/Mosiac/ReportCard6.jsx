import React from 'react';
import BarChart from '@/Charts/BarChart05';

// Import utilities
import { tailwindConfig } from '@/Utils/Utils';

export default function ReportCard6({before,after}) {

  const chartData = {
    labels: [
        'Not safe at all?',
        'A little safe?',
        'Moderately safe?',
        'Very safe?',
    ],
    datasets: [
      // Indigo bars
      {
        label: 'Before Workshop',
        data: [ before['Not safe at all?'], before['A little safe?'], before['Moderately safe?'], before['Very safe?'],],
        backgroundColor: tailwindConfig().theme.colors.teal[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.teal[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Grey bars
      {
        label: 'After Workshop',
        data: [after['Not safe at all?'], after['A little safe?'], after['Moderately safe?'], after['Very safe?']],
        backgroundColor: tailwindConfig().theme.colors.green[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Vaccination Safety Metrics Before & After the Workshop</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}