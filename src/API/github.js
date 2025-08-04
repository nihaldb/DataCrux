import React, { useEffect, useState } from 'react';

const useGithub = (username) => {
	const [data, setData] = useState({});
	useEffect(() => {
		if (!username) return;
		fetch(`https://api.github.com/users/${username}`)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, [username]);

	return data;
	console.log(data);
};

export default useGithub;
