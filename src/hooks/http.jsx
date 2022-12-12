import { useState, useCallback } from 'react';
const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async ({ url, method, body, convertData } = {}) => {
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
		},
		[]
	);

	return { isLoading, error, sendRequest };
};

export default useHttp;
