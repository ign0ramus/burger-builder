import { useState, useEffect } from 'react';

export const useRequestErrorHandler = httpClient => {
	const [error, setError] = useState();

	const resInterceptor = httpClient.interceptors.response.use(
		res => res,
		error => {
			setError(error);
			return Promise.reject(error);
		}
	);

	useEffect(
		() => () => httpClient.interceptors.response.eject(resInterceptor),
		[resInterceptor]
	);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
};
