import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { getOrders } from '../../redux/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Orders extends Component {
	componentDidMount() {
		this.props.onGetOrders();
	}

	render() {
		if (!this.props.isAuth) {
			return <Redirect to='/auth' />;
		}

		if (this.props.isLoading) {
			return <Spinner />;
		}
		return (
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

const mapStateToProps = state => ({
	orders: state.order.orders,
	isLoading: state.order.isLoading,
	isAuth: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
	onGetOrders: () => dispatch(getOrders()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
