import React, { useContext } from 'react';
import { SettingsContext } from '../../Context/SettingsContext.jsx';

const labelClass =
	'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';
const selectClass =
	'w-full mt-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition';

function Settings() {
	const {
		theme,
		setTheme,
		chartType,
		setChartType,
		exportFormat,
		setExportFormat,
	} = useContext(SettingsContext);

	const handleSave = () => {
		alert('✅ Preferences saved!');
	};

	return (
		<div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900 transition-colors">
			<div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
				<h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
					⚙️ Settings
				</h1>

				<div className="space-y-6">
					{/* Theme Setting */}
					<div>
						<label className={labelClass}>Theme</label>
						<select
							value={theme}
							onChange={(e) => setTheme(e.target.value)}
							className={selectClass}>
							<option value="light">Light</option>
							<option value="dark">Dark</option>
						</select>
					</div>

					{/* Default Chart */}
					<div>
						<label className={labelClass}>Default Chart Type</label>
						<select
							value={chartType}
							onChange={(e) => setChartType(e.target.value)}
							className={selectClass}>
							<option value="bar">Bar</option>
							<option value="pie">Pie</option>
							<option value="line">Line</option>
						</select>
					</div>

					{/* Default Export Format */}
					<div>
						<label className={labelClass}>Default Export Format</label>
						<select
							value={exportFormat}
							onChange={(e) => setExportFormat(e.target.value)}
							className={selectClass}>
							<option value="csv">CSV</option>
							<option value="json">JSON</option>
						</select>
					</div>

					{/* Save Button */}
					<div className="pt-4">
						<button
							onClick={handleSave}
							className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition-all">
							Save Preferences
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
