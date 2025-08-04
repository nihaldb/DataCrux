import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
	FaHome,
	FaUpload,
	FaChartBar,
	FaFileAlt,
	FaBars,
	FaTimes,
	FaCog,
} from 'react-icons/fa';

const SidebarLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const navLinks = [
		{ name: 'Home', to: '/', icon: <FaHome /> },
		{ name: 'Upload', to: '/upload', icon: <FaUpload /> },
		{ name: 'Dashboard', to: '/dashboard', icon: <FaChartBar /> },
		{ name: 'Report', to: '/report', icon: <FaFileAlt /> },
		// { name: 'Settings', to: '/setting', icon: <FaCog /> },
	];

	return (
		<div className="min-h-screen flex flex-col sm:flex-row">
			{/* Toggle Button */}
			<button
				onClick={toggleSidebar}
				className="sm:hidden p-4 text-indigo-700 bg-gray-100 shadow-md z-10 flex items-center gap-2">
				{sidebarOpen ? <FaTimes /> : <FaBars />}
				Menu
			</button>

			{/* Sidebar */}
			<aside
				className={`bg-gray-900 text-white sm:w-64 w-full sm:block ${
					sidebarOpen ? 'block' : 'hidden'
				} sm:relative absolute z-20 sm:z-0`}>
				<div className="p-6 space-y-6 h-full">
					<h1 className="text-2xl text-teal-400 font-bold"> DataCrux</h1>
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
								}>
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
