import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
			isReady: false,
		};

		componentDidMount() {
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error });
					return Promise.reject(error);
				}
			);
			this.setState({ isReady: true });
		}

		componentWillUnmount() {
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			if (!this.state.isReady) {
				return null;
			}

			return (
				<React.Fragment>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default withErrorHandler;
