import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
	const navigate = useNavigate();
	function toDash() {
		navigate('/dashboard');
	}
	return (
		<div className="min-h-screen bg-gray-900 text-white font-sans">
			{/* Header */}
			<header className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
				<h1 className="text-2xl font-bold text-teal-400">DataCrux</h1>
				<nav>
					<ul className="flex space-x-6 text-sm">
						<li>
							<a href="#features" className="hover:text-teal-300">
								Features
							</a>
						</li>
						<li>
							<a href="#about" className="hover:text-teal-300">
								About
							</a>
						</li>
						<li>
							<a href="#contact" className="hover:text-teal-300">
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</header>

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center px-4 py-20">
				<h2 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-4">
					Turn Raw Data Into Visual Insights
				</h2>
				<p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
					DataCrux lets you upload JSON or CSV files and instantly view your
					data through dynamic, interactive dashboards — no code required.
				</p>
				<button
					onClick={toDash}
					className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
					Get Started
				</button>
			</section>

			{/* Features Section */}
			<section id="features" className="bg-gray-800 py-16 px-6">
				<div className="max-w-5xl mx-auto text-center">
					<h3 className="text-3xl font-bold text-teal-300 mb-8">
						Why DataCrux?
					</h3>
					<div className="grid md:grid-cols-3 gap-8 text-left">
						<div>
							<h4 className="text-xl font-semibold mb-2">
								📂 Easy File Upload
							</h4>
							<p className="text-gray-400">
								Drag and drop your CSV or JSON file — we handle the rest.
							</p>
						</div>
						<div>
							<h4 className="text-xl font-semibold mb-2">
								📊 Auto Visual Dashboard
							</h4>
							<p className="text-gray-400">
								Get instant graphs and summaries without writing a single line
								of code.
							</p>
						</div>
						<div>
							<h4 className="text-xl font-semibold mb-2">
								🌐 Accessible Anywhere
							</h4>
							<p className="text-gray-400">
								Use DataCrux on desktop, tablet, or mobile — it’s fully
								responsive.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-center py-6 text-sm text-gray-400">
				© 2025 DataCrux. All rights reserved.
			</footer>
		</div>
	);
}

export default Landing;
