import React, { lazy, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { authCheckState } from './redux/actions';
import Spinner from './components/UI/Spinner/Spinner';

const CheckoutComponent = lazy(() => import('./containers/Checkout/Checkout'));
const OrdersComponent = lazy(() => import('./containers/Orders/Orders'));
const AuthComponent = lazy(() => import('./containers/Auth/Auth'));
const LogoutComponent = lazy(() => import('./containers/Auth/Logout/Logout'));

const App = props => {
	const { onTryAutoSignUp } = props;

	useEffect(() => {
		onTryAutoSignUp();
	}, [onTryAutoSignUp]);

	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<Switch>
					<Route path='/checkout' component={CheckoutComponent} />
					<Route path='/orders' component={OrdersComponent} />
					<Route path='/auth' component={AuthComponent} />
					<Route path='/logout' component={LogoutComponent} />
					<Route
						path='/'
						exact
						render={props => <BurgerBuilder {...props} />}
					/>
				</Switch>
			</Suspense>
		</Layout>
	);
};

App.propTypes = {
	onTryAutoSignUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	onTryAutoSignUp: () => dispatch(authCheckState()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
