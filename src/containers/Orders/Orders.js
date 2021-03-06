import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { getOrders } from '../../redux/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	componentDidMount() {
		this.props.onGetOrders(this.props.token, this.props.userId);
	}

	render() {
		if (!this.props.isAuth) {
			return <Redirect to='/auth' />;
		}

		return this.props.isLoading ? (
			<Spinner />
		) : (
			<div>
				{this.props.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))}
			</div>
		);
	}
}

Orders.propTypes = {
	orders: PropTypes.array,
	isLoading: PropTypes.bool,
	isAuth: PropTypes.bool,
	token: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
};

Orders.defaultProps = {
	orders: [],
	isLoading: false,
	isAuth: false,
};

const mapStateToProps = state => ({
	orders: state.order.orders,
	isLoading: state.order.isLoading,
	isAuth: state.auth.token !== null,
	token: state.auth.token,
	userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
	onGetOrders: (token, userId) => dispatch(getOrders(token, userId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
