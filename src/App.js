import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' render={props => <Checkout {...props} />} />
						<Route path='/orders' component={props => <Orders {...props} />} />
						<Route path='/auth' component={props => <Auth {...props} />} />
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

export default App;
