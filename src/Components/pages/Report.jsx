import React, { useContext } from 'react';
import { DataContext } from '../../Context/DataContext';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

function Report() {
	const { data, headers } = useContext(DataContext);
	const navigate = useNavigate();

	const totalRows = data.length;
	const totalColumns = headers.length;
	const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

	const getValueCounts = (key) => {
		const counts = {};
		data.forEach((row) => {
			const value = row[key] ?? 'NULL';
			counts[value] = (counts[value] || 0) + 1;
		});
		return counts;
	};

	const getNullStats = () => {
		const nullCounts = {};
		headers.forEach((header) => {
			nullCounts[header] = data.filter(
				(row) =>
					row[header] === null ||
					row[header] === '' ||
					row[header] === undefined
			).length;
		});
		return nullCounts;
	};

	const handleExportPDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text('DataCrux Report Summary', 20, 20);
		doc.setFontSize(12);
		doc.text(`Total Rows: ${totalRows}`, 20, 35);
		doc.text(`Total Columns: ${totalColumns}`, 20, 45);
		doc.text(`Columns: ${headers.join(', ')}`, 20, 55);

		doc.text('Missing Value Stats:', 20, 70);
		const nullStats = getNullStats();
		let y = 80;
		for (const [key, val] of Object.entries(nullStats)) {
			doc.text(`${key}: ${val} null values`, 25, y);
			y += 10;
		}

		doc.save('DataCrux_Report.pdf');
	};

	const valueCounts = headers[0] ? getValueCounts(headers[0]) : {};

	const chartData = Object.entries(valueCounts).map(([key, value]) => ({
		name: key,
		value,
	}));

	const nullStats = getNullStats();

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-5xl mx-auto bg-white p-8 rounded shadow">
				<h1 className="text-2xl font-bold mb-6 text-indigo-600">
					📊 Data Report
				</h1>

				{data.length === 0 ? (
					<p className="text-gray-600">
						No data uploaded. Please go to the upload page first.
					</p>
				) : (
					<>
						<ul className="mb-6 text-gray-700">
							<li>
								<strong>Total Rows:</strong> {totalRows}
							</li>
							<li>
								<strong>Total Columns:</strong> {totalColumns}
							</li>
							<li>
								<strong>Columns:</strong> {headers.join(', ')}
							</li>
						</ul>

						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-2 text-gray-800">
								Missing Values
							</h2>
							<ul className="bg-gray-50 p-4 rounded text-sm">
								{Object.entries(nullStats).map(([key, val]) => (
									<li key={key}>
										{key}: <strong>{val}</strong> null or empty
									</li>
								))}
							</ul>
						</div>

						{chartData.length > 0 && (
							<div className="mb-8">
								<h2 className="text-lg font-semibold mb-2 text-gray-800">
									Value Distribution for:{' '}
									<span className="text-indigo-500">{headers[0]}</span>
								</h2>
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
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</div>
						)}

						<div className="flex gap-4 mt-4 flex-wrap">
							<button
								onClick={handleExportPDF}
								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
								Export PDF
							</button>
							<button
								onClick={() => navigate('/dashboard')}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
								Go to Dashboard
							</button>
							<button
								onClick={() => navigate('/upload')}
								className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
								Re-upload Data
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Report;
