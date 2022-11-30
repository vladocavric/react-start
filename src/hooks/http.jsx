import { useState, useCallback } from 'react';
const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const baseUrl = `${process.env.REACT_APP_FIREBASE_DOMAIN}simpsons.json`;

	const sendRequest = useCallback(async ({url = baseUrl, method, body, convertData} = {}) => {
		console.log(url)
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(url, {
				method: method ? method : 'GET',
				body: body ? JSON.stringify(body) : null,
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			convertData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, [baseUrl]);

	return { isLoading, error, sendRequest };
};

export default useHttp;