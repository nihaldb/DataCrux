import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
	FaHome,
	FaUpload,
	FaChartBar,
	FaFileAlt,
	FaBars,
	FaTimes,
} from 'react-icons/fa';

const SidebarLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	const navLinks = [
		{ name: 'Home', to: '/', icon: <FaHome /> },
		{ name: 'Upload', to: '/upload', icon: <FaUpload /> },
		{ name: 'Dashboard', to: '/dashboard', icon: <FaChartBar /> },
		{ name: 'Report', to: '/report', icon: <FaFileAlt /> },
	];

	return (
		<div className="min-h-screen flex flex-col sm:flex-row">
			{/* Top Navbar for Mobile */}
			<div className="sm:hidden flex justify-between items-center bg-gray-900 text-white p-4">
				<h1 className="text-xl font-bold text-teal-400">DataCrux</h1>
				<button onClick={toggleSidebar} className="text-white">
					{sidebarOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>

			{/* Sidebar Vertical -> Big Screen Horizontal -> Mobile screen */}
			<aside
				className={`bg-gray-900 text-white w-full sm:w-64 sm:block ${
					sidebarOpen ? 'block' : 'hidden'
				} sm:relative absolute z-20`}>
				<div className="p-6 space-y-6">
					<nav className="flex flex-col space-y-4">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end
								className={({ isActive }) =>
									`flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-600 ${
										isActive ? 'bg-indigo-600 font-semibold' : ''
									}`
								}
								onClick={() => setSidebarOpen(false)}>
								{link.icon}
								{link.name}
							</NavLink>
						))}
					</nav>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default SidebarLayout;
