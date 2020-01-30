import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './redux/actions';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' render={props => <Checkout {...props} />} />
						<Route path='/orders' component={props => <Orders {...props} />} />
						<Route path='/auth' component={props => <Auth {...props} />} />
						<Route path='/logout' component={props => <Logout {...props} />} />
						<Route
							path='/'
							exact
							render={props => <BurgerBuilder {...props} />}
						/>
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onTryAutoSignUp: () => dispatch(authCheckState()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
