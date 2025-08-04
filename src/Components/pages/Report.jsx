import React, { useEffect, useState, useRef, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { DataContext } from '../../Context/DataContext';

Chart.register(...registerables);
const Report = () => {
	const { data: contextData, headers: contextHeaders } =
		useContext(DataContext);
	const [filters, setFilters] = useState(
		() => JSON.parse(localStorage.getItem('filters')) || {}
	);
	const [search, setSearch] = useState('');
	const [chartType, setChartType] = useState('pie');
	const chartRef = useRef(null);
	const chartInstance = useRef(null);

	const rawData = contextData || [];
	const headers = contextHeaders || [];

	useEffect(() => {
		localStorage.setItem('filters', JSON.stringify(filters));
	}, [filters]);

	const filteredData = rawData
		.filter((row) => {
			return headers.every((header) => {
				const filterValue = filters[header];
				if (!filterValue) return true;
				return row[header]
					?.toString()
					.toLowerCase()
					.includes(filterValue.toLowerCase());
			});
		})
		.filter((row) =>
			Object.values(row).some((val) =>
				val?.toString().toLowerCase().includes(search.toLowerCase())
			)
		);

	const clearAllFilters = () => {
		setFilters({});
		setSearch('');
		localStorage.removeItem('filters');
	};

	const exportCSV = () => {
		const csv = Papa.unparse(filteredData);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'report.csv');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const exportPDF = () => {
		const doc = new jsPDF();

		// Prepare table header and body for autoTable
		const tableHeaders = [headers];
		const tableRows = filteredData.map((row) =>
			headers.map((header) => row[header] || '')
		);

		autoTable(doc, {
			head: tableHeaders,
			body: tableRows,
			startY: 20,
			theme: 'grid',
			headStyles: { fillColor: [33, 150, 243] },
			didDrawPage: () => {
				doc.setFontSize(16);
				doc.text('Report Data', 14, 15);
			},
		});

		doc.save('report.pdf');
	};

	// CHART: Prepare data
	const numericKey = headers.find((h) =>
		filteredData.every((row) => !isNaN(Number(row[h])))
	);
	const groupingKey = headers.find((h) => h !== numericKey);

	const chartLabels = [...new Set(filteredData.map((row) => row[groupingKey]))];
	const chartData = chartLabels.map((label) => {
		return filteredData
			.filter((row) => row[groupingKey] === label)
			.reduce((sum, row) => sum + Number(row[numericKey]), 0);
	});

	useEffect(() => {
		if (!chartRef.current) return;

		if (chartInstance.current) chartInstance.current.destroy();

		chartInstance.current = new Chart(chartRef.current, {
			type: chartType,
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: numericKey,
						data: chartData,
						backgroundColor: [
							'#36A2EB',
							'#FF6384',
							'#FFCE56',
							'#4BC0C0',
							'#9966FF',
						],
					},
				],
			},
			options: { responsive: true, maintainAspectRatio: false },
		});
	}, [chartLabels, chartData, chartType, numericKey]);

	return (
		<div className="p-4 space-y-6">
			<h1 className="text-2xl font-bold">Report Dashboard</h1>

			{/* Filters and Search */}
			<div className="flex flex-wrap gap-4">
				{headers.map((header) => (
					<input
						key={header}
						type="text"
						placeholder={`Filter by ${header}`}
						value={filters[header] || ''}
						onChange={(e) =>
							setFilters({ ...filters, [header]: e.target.value })
						}
						className="p-2 border rounded"
					/>
				))}
				<input
					type="text"
					placeholder="Search all"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="p-2 border rounded"
				/>
				<button
					onClick={clearAllFilters}
					className="bg-red-500 text-white px-4 py-2 rounded">
					Clear All Filters
				</button>
			</div>

			{/* Chart toggle */}
			<div className="flex items-center gap-2">
				<label className="font-medium">Chart Type:</label>
				<select
					value={chartType}
					onChange={(e) => setChartType(e.target.value)}
					className="p-2 border rounded">
					<option value="pie">Pie</option>
					<option value="bar">Bar</option>
					<option value="line">Line</option>
				</select>
			</div>

			{/* Chart */}
			<div className="h-[400px]">
				<canvas ref={chartRef}></canvas>
			</div>

			{/* Table */}
			<div id="report-table" className="overflow-x-auto border">
				<table className="min-w-full text-left">
					<thead>
						<tr>
							{headers.map((header) => (
								<th key={header} className="border px-4 py-2 bg-gray-100">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredData.map((row, idx) => (
							<tr key={idx}>
								{headers.map((header) => (
									<td key={header} className="border px-4 py-1">
										{row[header]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Export Buttons */}
			<div className="flex gap-4">
				<button
					onClick={exportCSV}
					className="bg-green-600 text-white px-4 py-2 rounded">
					Export CSV
				</button>
				<button
					onClick={exportPDF}
					className="bg-blue-600 text-white px-4 py-2 rounded">
					Export PDF
				</button>
			</div>
		</div>
	);
};

export default Report;
