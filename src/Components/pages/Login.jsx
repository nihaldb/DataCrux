import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context';

function Login() {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setUsername, username } = useUser();
	const handleLogin = (e) => {
		e.preventDefault();

		// if (username === 'test@example.com' && password === 'password') {
		// 	navigate('/dashboard');
		// } else {
		// 	alert('Invalid credentials');
		// }

		navigate('/dashboard');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<form
				onSubmit={handleLogin}
				className="bg-gray-700 p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-teal-400">
					Login
				</h2>

				<input
					type="text"
					placeholder="enter your github username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full px-4 py-2 mb-4 bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-300"
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
					Login
				</button>

				<p className="mt-4 text-sm text-center text-white">
					Don't have an account ?{' '}
					<span
						onClick={() => navigate('/register')}
						className="text-teal-400 hover:underline cursor-pointer">
						Register
					</span>
				</p>
			</form>
		</div>
	);
}

export default Login;
