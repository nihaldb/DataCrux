import React, { useContext, useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Context/DataContext';

function Upload() {
	const [file, setFile] = useState(null);
	const [error, setError] = useState('');
	const { setData, setHeaders, data, headers } = useContext(DataContext);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setError('');
		setData([]);
		setHeaders([]);
		const selected = e.target.files[0];

		if (!selected) return;

		const allowedTypes = ['application/json', 'text/csv'];
		if (!allowedTypes.includes(selected.type)) {
			setError('Only CSV or JSON files are allowed.');
			return;
		}

		setFile(selected);

		const reader = new FileReader();

		reader.onload = (event) => {
			const content = event.target.result;

			if (selected.type === 'text/csv') {
				Papa.parse(content, {
					header: true,
					skipEmptyLines: true,
					complete: (results) => {
						setHeaders(Object.keys(results.data[0] || {}));
						setData(results.data);
					},
					error: () => {
						setError('Error parsing CSV file');
					},
				});
			} else {
				try {
					const jsonData = JSON.parse(content);
					if (Array.isArray(jsonData)) {
						setHeaders(Object.keys(jsonData[0] || {}));
						setData(jsonData);
					} else if (typeof jsonData === 'object') {
						setHeaders(Object.keys(jsonData));
						setData([jsonData]);
					} else {
						setError('Unsupported JSON structure.');
					}
				} catch {
					setError('Invalid JSON file.');
				}
			}
		};

		reader.readAsText(selected);
		console.log(data);
	};

	const handleClear = () => {
		setFile(null);
		setData([]);
		setHeaders([]);
		setError('');
	};

	const handleExport = () => {
		const csv = Papa.unparse(data);
		const blob = new Blob([csv], { type: 'text/csv' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'data_export.csv';
		link.click();
	};

	const goToDashboard = () => {
		navigate('/dashboard');
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
				<h1 className="text-2xl font-bold mb-6 text-teal-600">
					Upload Your Data
				</h1>

				<input
					type="file"
					accept=".csv,.json"
					onChange={handleFileChange}
					className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-teal-50 file:text-teal-700
                     hover:file:bg-teal-100"
				/>

				{error && <p className="text-red-500 mb-4">{error}</p>}

				{data.length > 0 && (
					<>
						<div className="flex gap-4 mb-4">
							<button
								onClick={handleClear}
								className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
								Clear File
							</button>
							<button
								onClick={handleExport}
								className="bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600">
								Export to CSV
							</button>
							<button
								onClick={goToDashboard}
								className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
								View Dashboard
							</button>
						</div>

						<div className="overflow-auto max-h-[500px] border rounded">
							<table className="min-w-full text-sm text-left text-gray-700">
								<thead className="bg-gray-100 sticky top-0">
									<tr>
										{headers.map((header, idx) => (
											<th key={idx} className="py-2 px-4 border-b">
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{data.map((row, idx) => (
										<tr key={idx} className="border-b hover:bg-gray-50">
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
					</>
				)}
			</div>
		</div>
	);
}

export default Upload;
