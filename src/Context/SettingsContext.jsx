import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();
useEffect(() => {
	localStorage.setItem('theme', theme);
	document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);

export const SettingsProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
	const [chartType, setChartType] = useState(
		localStorage.getItem('chartType') || 'bar'
	);
	const [exportFormat, setExportFormat] = useState(
		localStorage.getItem('exportFormat') || 'csv'
	);

	useEffect(() => {
		localStorage.setItem('theme', theme);
		localStorage.setItem('chartType', chartType);
		localStorage.setItem('exportFormat', exportFormat);

		// Apply theme class to body
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme, chartType, exportFormat]);

	return (
		<SettingsContext.Provider
			value={{
				theme,
				setTheme,
				chartType,
				setChartType,
				exportFormat,
				setExportFormat,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
