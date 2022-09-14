import React from 'react';
import BarChart from '@/Charts/BarChart03';

// Import utilities
import { tailwindConfig } from '@/Utils/Utils';

export default function ReportCard1({data}) {
		const chartData = {
				labels:  [
					'18-19','20-24','25-29','30-34','35-39','40-44','45-49','50+'
				],
				datasets: [
						// Stack
						{
								label: 'KwaZulu-Natal',
								data: [
									data['18-19']["KwaZulu-Natal"],data['20-24']["KwaZulu-Natal"],data['25-29']["KwaZulu-Natal"],data['30-34']["KwaZulu-Natal"],data['35-39']["KwaZulu-Natal"],data['40-44']["KwaZulu-Natal"],data['45-49']["KwaZulu-Natal"],data['50+']["KwaZulu-Natal"]
								],
								backgroundColor: tailwindConfig().theme.colors.orange[700],
								hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Eastern Cape',
								data: [
									data['18-19']["Eastern Cape"],data['20-24']["Eastern Cape"],data['25-29']["Eastern Cape"],data['30-34']["Eastern Cape"],data['35-39']["Eastern Cape"],data['40-44']["Eastern Cape"],data['45-49']["Eastern Cape"],data['50+']["Eastern Cape"]
								],
								backgroundColor: tailwindConfig().theme.colors.orange[500],
								hoverBackgroundColor: tailwindConfig().theme.colors.orange[600],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Western Cape',
								data: [
									data['18-19']["Western Cape"],data['20-24']["Western Cape"],data['25-29']["Western Cape"],data['30-34']["Western Cape"],data['35-39']["Western Cape"],data['40-44']["Western Cape"],data['45-49']["Western Cape"],data['50+']["Western Cape"]
								],
								backgroundColor: tailwindConfig().theme.colors.red[800],
								hoverBackgroundColor: tailwindConfig().theme.colors.red[700],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Limpopo',
								data: [
									data['18-19']["Limpopo"],data['20-24']["Limpopo"],data['25-29']["Limpopo"],data['30-34']["Limpopo"],data['35-39']["Limpopo"],data['40-44']["Limpopo"],data['45-49']["Limpopo"],data['50+']["Limpopo"]
								],
								backgroundColor: tailwindConfig().theme.colors.yellow[500],
								hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						{
							label: 'Gauteng',
							data: [
								data['18-19']["Gauteng"],data['20-24']["Gauteng"],data['25-29']["Gauteng"],data['30-34']["Gauteng"],data['35-39']["Gauteng"],data['40-44']["Gauteng"],data['45-49']["Gauteng"],data['50+']["Gauteng"]
							],
							backgroundColor: tailwindConfig().theme.colors.green[700],
							hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
							barPercentage: 0.66,
							categoryPercentage: 0.66,
					},
		],
	};

	return (
		<div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
			<header className="px-5 py-4 border-b border-slate-100 flex items-center">
				<h2 className="font-semibold text-slate-800">Age Distribution Based on Province</h2>
			</header>
			{/* Chart built with Chart.js 3 */}
			{/* Change the height attribute to adjust the chart height */}
			<BarChart data={chartData} width={595} height={248} />
		</div>
	);
}