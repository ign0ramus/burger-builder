import React, { Component, lazy, Suspense } from 'react';
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

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
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
	}
}

const mapDispatchToProps = dispatch => ({
	onTryAutoSignUp: () => dispatch(authCheckState()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
