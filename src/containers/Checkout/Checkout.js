import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	if (!props.ings || props.isPurchased) {
		return <Redirect to='/' />;
	}

	if (!props.isAuth) {
		return <Redirect to='/auth' />;
	}

	return (
		<React.Fragment>
			<CheckoutSummary
				ingredients={props.ings}
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}
			/>
			<Route
				path={`${props.match.path}/contact-data`}
				render={props => <ContactData {...props} />}
			/>
		</React.Fragment>
	);
};

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
