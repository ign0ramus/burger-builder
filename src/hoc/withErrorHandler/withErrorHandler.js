import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, setError] = useState();

		const resInterceptor = axios.interceptors.response.use(
			res => res,
			error => {
				setError(error);
				return Promise.reject(error);
			}
		);

		useEffect(() => () => axios.interceptors.response.eject(resInterceptor), [
			resInterceptor,
		]);

		const errorConfirmedHandler = () => {
			setError(null);
		};

		return (
			<React.Fragment>
				<Modal show={error} onClose={errorConfirmedHandler}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</React.Fragment>
		);
	};
};

export default withErrorHandler;
