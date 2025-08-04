import React from 'react';
import { Header } from './../index';

const About = () => {
	return (
		<div className="min-h-screen bg-gray-900 text-white font-sans pt-16">
			{/*Header */}
			<div>
				<Header />
			</div>
			<div className="bg-gray-900 max-w-4xl mx-auto px-4 py-10 text-white">
				<h1 className="text-4xl font-bold mb-4 text-blue-600">About Our App</h1>

				<p className="text-gray-400 mb-6">
					This dashboard application is designed to help users upload CSV/JSON
					files, visualize data using interactive charts, apply filters, and
					export reports as PDF/CSV. It’s built using modern web technologies
					like React, TailwindCSS, and Chart.js.
				</p>

				<h2 className="text-2xl font-semibold mb-2">✨ Features</h2>
				<ul className="list-disc list-inside text-gray-400 mb-6">
					<li>File upload (CSV/JSON)</li>
					<li>Dynamic report generation</li>
					<li>Pie and bar chart visualization</li>
					<li>Search and multi-filter system</li>
					<li>Export reports as CSV or PDF</li>
					<li>GitHub user avatar integration</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-2">🛠 Tech Stack</h2>
				<ul className="list-disc list-inside text-gray-400 mb-6">
					<li>React + React Router</li>
					<li>TailwindCSS</li>
					<li>Chart.js</li>
					<li>PapaParse</li>
					<li>GitHub API</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-2">👨‍💻 Developer</h2>
				<p className="text-gray-400">
					Developed by <strong>Nihal Dubey</strong>. Connect with me on GitHub:
					<a
						href="https://github.com/nihaldb"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 underline ml-1">
						@nihaldb
					</a>
				</p>
			</div>
		</div>
	);
};

export default About;
