import React from 'react';

function Dashboard() {
	return (
		<div className="flex h-screen bg-gray-100 scr">
			{/* Sidebar */}
			{/* <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
				<h2 className="text-2xl font-bold text-teal-400 mb-8">DataCrux</h2>
				<nav className="space-y-4 text-sm">
					<a href="#" className="block hover:text-teal-300">
						Dashboard
					</a>
					<a href="#" className="block hover:text-teal-300">
						Upload Data
					</a>
					<a href="#" className="block hover:text-teal-300">
						Reports
					</a>
					<a href="#" className="block hover:text-teal-300">
						Settings
					</a>
				</nav>
			</aside> */}

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Navbar */}
				<header className="bg-white shadow px-6 py-4 flex justify-between items-center">
					<h1 className="text-xl font-semibold text-gray-700">
						Dashboard Overview
					</h1>
					<div className="text-sm text-gray-600">Welcome, User</div>
				</header>

				{/* Dashboard Content */}
				<main className="p-6 overflow-y-auto">
					{/* Summary Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Total Records</h3>
							<p className="text-2xl font-bold text-gray-800">1,200</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Data Sources</h3>
							<p className="text-2xl font-bold text-gray-800">3</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-gray-600 text-sm">Last Upload</h3>
							<p className="text-2xl font-bold text-gray-800">2 days ago</p>
						</div>
					</div>

					{/* Placeholder for Charts */}
					<div className="bg-white p-6 rounded-lg shadow mb-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							Data Visualization
						</h2>
						<div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
							[ Chart Component Here ]
						</div>
					</div>

					{/* Table Section */}
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							Recent Data
						</h2>
						<div className="overflow-x-auto">
							<table className="min-w-full text-sm text-left text-gray-700">
								<thead className="bg-gray-100">
									<tr>
										<th className="py-2 px-4">ID</th>
										<th className="py-2 px-4">Name</th>
										<th className="py-2 px-4">Value</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td className="py-2 px-4">1</td>
										<td className="py-2 px-4">Example</td>
										<td className="py-2 px-4">123</td>
									</tr>
									{/* More rows dynamically generated */}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Dashboard;
