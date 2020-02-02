import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		if (!this.props.ings || this.props.isPurchased) {
			return <Redirect to='/' />;
		}

		if (!this.props.isAuth) {
			return <Redirect to='/auth' />;
		}

		return (
			<React.Fragment>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={`${this.props.match.path}/contact-data`}
					render={props => <ContactData {...props} />}
				/>
			</React.Fragment>
		);
	}
}

Checkout.propTypes = {
	ings: PropTypes.object,
	isPurchased: PropTypes.bool,
	isAuth: PropTypes.bool,
};

Checkout.defaultProps = {
	ings: null,
	isPurchased: false,
	isAuth: false,
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		isPurchased: state.order.isPurchased,
		isAuth: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Checkout);
