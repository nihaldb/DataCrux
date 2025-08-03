import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { DataProvider } from './Context/DataContext.jsx';

import App from './App.jsx';
import {
	Dashboard,
	Landing,
	Report,
	Upload,
	Settings,
} from './Components/index.js';
import SidebarLayout from './SidebarLayout.jsx';
import {
	SettingsContext,
	SettingsProvider,
} from './Context/SettingsContext.jsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="" element={<Landing />} />
			<Route element={<SidebarLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/report" element={<Report />} />
				<Route path="/setting" element={<Settings />} />
			</Route>
		</>
	)
);
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SettingsProvider>
			<DataProvider>
				<RouterProvider router={router} />
			</DataProvider>
		</SettingsProvider>
	</StrictMode>
);
