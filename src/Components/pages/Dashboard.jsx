import React, { useContext, useState, useMemo } from 'react';
import { DataContext, useUser } from '../../Context';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useGithub from '../../API/github';

function Dashboard() {
	const { username } = useUser();
	const user = useGithub(username);
	const { data, headers } = useContext(DataContext);

	const [filterColumn, setFilterColumn] = useState('');
	const [filterValue, setFilterValue] = useState('');

	const totalRecords = data.length;
	const totalColumns = headers.length;
	const lastUpload = totalRecords > 0 ? 'Just now' : 'No uploads yet';

	const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

	//  Filtered data
	const filteredData = useMemo(() => {
		if (!filterColumn || !filterValue) return data;
		return data.filter((row) => String(row[filterColumn]) === filterValue);
	}, [data, filterColumn, filterValue]);

	// Get chart data for first column in filteredData
	const getValueCounts = (key) => {
		const counts = {};
		filteredData.forEach((row) => {
			const value = row[key] ?? 'NULL';
			counts[value] = (counts[value] || 0) + 1;
		});
		return Object.entries(counts).map(([name, value]) => ({ name, value }));
	};

	const chartData = headers.length > 0 ? getValueCounts(headers[0]) : [];

	// Get distinct values for current filter column
	const columnValues = useMemo(() => {
		if (!filterColumn) return [];
		const unique = new Set(data.map((row) => String(row[filterColumn])));
		return Array.from(unique);
	}, [filterColumn, data]);

	return (
		<div className="flex h-screen bg-gray-100">
			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="bg-white shadow px-6 py-4 flex justify-between items-center">
					<h1 className="text-xl font-semibold text-gray-700">
						Dashboard Overview
					</h1>

					<div className="flex items-center gap-3">
						{user.avatar_url && (
							<img
								src={user.avatar_url}
								alt="avatar"
								className="w-10 h-10 rounded-full"
							/>
						)}
						<span>Hello! {user.name || username}</span>
					</div>
				</header>

				<main className="p-6 overflow-y-auto">
					{/* Summary Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Total Records</h3>
							<p className="text-2xl font-bold text-gray-800">{totalRecords}</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Filtered Rows</h3>
							<p className="text-2xl font-bold text-gray-800">
								{filteredData.length}
							</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Last Upload</h3>
							<p className="text-2xl font-bold text-gray-800">{lastUpload}</p>
						</div>
					</div>

					{/* Filters */}
					<div className="flex gap-4 items-end mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Filter Column
							</label>
							<select
								value={filterColumn}
								onChange={(e) => {
									setFilterColumn(e.target.value);
									setFilterValue('');
								}}
								className="border rounded px-3 py-2 w-48">
								<option value="">-- Select Column --</option>
								{headers.map((header, idx) => (
									<option key={idx} value={header}>
										{header}
									</option>
								))}
							</select>
						</div>

						{filterColumn && (
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Filter Value
								</label>
								<select
									value={filterValue}
									onChange={(e) => setFilterValue(e.target.value)}
									className="border rounded px-3 py-2 w-48">
									<option value="">-- Select Value --</option>
									{columnValues.map((val, idx) => (
										<option key={idx} value={val}>
											{val}
										</option>
									))}
								</select>
							</div>
						)}
					</div>

					{/* Chart Section */}
					<div className="bg-white p-6 rounded-lg shadow mb-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							Value Distribution (for: {headers[0] ?? 'N/A'})
						</h2>
						{chartData.length > 0 ? (
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={100}
										label>
										{chartData.map((entry, index) => (
											<Cell key={index} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						) : (
							<p className="text-gray-400">No chart data available.</p>
						)}
					</div>

					{/* Table */}
					{filteredData.length > 0 && (
						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-xl font-semibold mb-4 text-gray-700">
								Filtered Data Preview
							</h2>
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm text-left text-gray-700">
									<thead className="bg-gray-100">
										<tr>
											{headers.map((header, idx) => (
												<th key={idx} className="py-2 px-4">
													{header}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{filteredData.slice(0, 5).map((row, rowIdx) => (
											<tr key={rowIdx} className="border-b">
												{headers.map((header, hIdx) => (
													<td key={hIdx} className="py-2 px-4">
														{String(row[header] ?? '')}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default Dashboard;
