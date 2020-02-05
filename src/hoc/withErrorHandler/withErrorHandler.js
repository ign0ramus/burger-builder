import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import { useRequestErrorHandler } from '../../hooks/requestErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, errorConfirmedHandler] = useRequestErrorHandler(axios);

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
