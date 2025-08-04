import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import {
	Dashboard,
	Landing,
	Report,
	Upload,
	Settings,
	Login,
	Registration,
	About,
	Contact,
} from './Components/index.js';
import SidebarLayout from './SidebarLayout.jsx';

import { DataProvider, SettingsProvider, UserProvider } from './Context';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="" element={<Landing />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Registration />} />
			<Route path="contact" element={<Contact />} />
			<Route path="about" element={<About />} />

			<Route element={<SidebarLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/report" element={<Report />} />
				{/* <Route path="/setting" element={<Settings />} /> */}
			</Route>
		</>
	)
);
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SettingsProvider>
			<DataProvider>
				<UserProvider>
					<RouterProvider router={router} />
				</UserProvider>
			</DataProvider>
		</SettingsProvider>
	</StrictMode>
);
