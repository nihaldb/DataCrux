import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();

		// Simulate registration
		alert('Registration successful');
		navigate('/login');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<form
				onSubmit={handleRegister}
				className="bg-gray-700 p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-teal-400">
					Register
				</h2>

				<input
					type="text"
					placeholder="Full Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-2 mb-4  rounded focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-900 text-teal-300"
					required
				/>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 mb-4 text-teal-300 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-2 mb-4 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-300"
					required
				/>

				<button
					type="submit"
					className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
					Register
				</button>

				<p className="mt-4 text-sm text-center text-white">
					Already have an account ?{' '}
					<span
						onClick={() => navigate('/login')}
						className="text-teal-400 hover:underline cursor-pointer">
						Login
					</span>
				</p>
			</form>
		</div>
	);
}

export default Registration;
