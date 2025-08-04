import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './../index';

const Contact = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: '', email: '', message: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Message sent!');
		setForm({ name: '', email: '', message: '' });
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white font-sans">
			{/* Header */}
			<Header />
			{/* Contact Section */}
			<section className="px-6 py-20 max-w-2xl mx-auto text-center">
				<h2 className="text-4xl font-bold text-teal-400 mb-4">Contact Us</h2>
				<p className="text-gray-300 mb-10">
					We'd love to hear from you! Fill out the form below and we'll get back
					to you soon.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6 text-left ">
					<div>
						<label className="block mb-1 text-sm">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
						/>
					</div>
					<div>
						<label className="block mb-1 text-sm">Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
						/>
					</div>
					<div>
						<label className="block mb-1 text-sm">Message</label>
						<textarea
							name="message"
							value={form.message}
							onChange={handleChange}
							rows="5"
							required
							className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
						/>
					</div>
					<button
						type="submit"
						className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded transition">
						Send
					</button>
				</form>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-center py-6 text-sm text-gray-400">
				© 2025 DataCrux. All rights reserved.
			</footer>
		</div>
	);
};

export default Contact;
