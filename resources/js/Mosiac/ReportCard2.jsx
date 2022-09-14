import React from 'react';
import BarChart from '@/Charts/BarChart03';

// Import utilities
import { tailwindConfig } from '@/Utils/Utils';

export default function ReportCard2({data}) {
		const chartData = {
				labels:  [
					'18-19','20-24','25-29','30-34','35-39','40-44','45-49','50+'
				],
				datasets: [
						// Stack
						{
								label: 'Females',
								data: [
									data['18-19'].females,data['20-24'].females,data['25-29'].females,data['30-34'].females,data['35-39'].females,data['40-44'].females,data['45-49'].females,data['50+'].females
								],
								backgroundColor: tailwindConfig().theme.colors.orange[700],
								hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Males',
								data: [
									data['18-19'].males,data['20-24'].males,data['25-29'].males,data['30-34'].males,data['35-39'].males,data['40-44'].males,data['45-49'].males,data['50+'].males
								],
								backgroundColor: tailwindConfig().theme.colors.orange[500],
								hoverBackgroundColor: tailwindConfig().theme.colors.orange[600],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Transgender',
								data: [
									data['18-19'].transgender,data['20-24'].transgender,data['25-29'].transgender,data['30-34'].transgender,data['35-39'].transgender,data['40-44'].transgender,data['45-49'].transgender,data['50+'].transgender
								],
								backgroundColor: tailwindConfig().theme.colors.red[800],
								hoverBackgroundColor: tailwindConfig().theme.colors.red[700],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						// Stack
						{
								label: 'Gender Non Conforming',
								data: [
									data['18-19'].genderNonConforming,data['20-24'].genderNonConforming,data['25-29'].genderNonConforming,data['30-34'].genderNonConforming,data['35-39'].genderNonConforming,data['40-44'].genderNonConforming,data['45-49'].genderNonConforming,data['50+'].genderNonConforming
								],
								backgroundColor: tailwindConfig().theme.colors.yellow[500],
								hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
								barPercentage: 0.66,
								categoryPercentage: 0.66,
						},
						{
							label: 'Gender Not Set',
							data: [
								data['18-19'].notSet,data['20-24'].notSet,data['25-29'].notSet,data['30-34'].notSet,data['35-39'].notSet,data['40-44'].notSet,data['45-49'].notSet,data['50+'].notSet
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
				<h2 className="font-semibold text-slate-800">Age Distribution Based on Gender</h2>
			</header>
			{/* Chart built with Chart.js 3 */}
			{/* Change the height attribute to adjust the chart height */}
			<BarChart data={chartData} width={595} height={248} />
		</div>
	);
}