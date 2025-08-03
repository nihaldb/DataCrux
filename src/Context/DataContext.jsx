import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState([]);
	const [headers, setHeaders] = useState([]);

	return (
		<DataContext.Provider value={{ data, setData, headers, setHeaders }}>
			{children}
		</DataContext.Provider>
	);
};
