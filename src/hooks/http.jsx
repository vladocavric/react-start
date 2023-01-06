import { useState, useCallback } from 'react';
const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async ({ url, method, body, convertData, loader = true} = {}) => {
			if(loader) {
				setIsLoading(true);
			}
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
				if (convertData) {
					convertData(data);
				}
			} catch (err) {
				setError(err.message || 'Something went wrong!');
			}
			setIsLoading(false);
		},
		[]
	);

	return { isLoading, error, sendRequest, setError };
};

export default useHttp;
