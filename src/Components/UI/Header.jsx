import React from 'react';
import { Link, NavLink , useNavigate} from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
	return (
		<header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md ">
			<h1 className="text-2xl font-bold text-teal-400">DataCrux</h1>
			<nav>
				<ul className="flex space-x-6 text-sm ">
					<li className="flex  items-end">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? 'text-teal-300 font-semibold' : 'hover:text-teal-300'
							}>
							Home
						</NavLink>
					</li>
					<li className="flex  items-end">
						<NavLink
							to="/about"
							className={({ isActive }) =>
								isActive ? 'text-teal-300 font-semibold' : 'hover:text-teal-300'
							}>
							About
						</NavLink>
					</li>
					<li className="flex items-end">
						<NavLink
							to="/contact"
							className={({ isActive }) =>
								isActive ? 'text-teal-300 font-semibold' : 'hover:text-teal-300'
							}>
							Contact
						</NavLink>
					</li>
					<li>
						<button
							type="button"
							onClick={() => {
								navigate('/register');
							}}
							className="w-[100px] h-8 bg-teal-500 text-white  rounded hover:bg-teal-600 transition">
							Register
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
