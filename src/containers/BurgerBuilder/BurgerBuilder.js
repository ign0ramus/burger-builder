import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
	addIngredient,
	removeIngredient,
	getIngredients,
	purchaseInit,
} from '../../redux/actions';
import axios from '../../axios-orders';
import classes from './BurgerBuilder.css';

export class BurgerBuilder extends Component {
	state = {
		isPurchasing: false,
	};

	componentDidMount() {
		this.props.onGetIngredients();
	}

	isPurchasable() {
		const sum = Object.keys(this.props.ings)
			.map(igKey => {
				return this.props.ings[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ isPurchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ isPurchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	renderBurger = () => {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Burger ingredients={this.props.ings} />
				<BuildControls
					onIngredientAdd={this.props.onIngredientAdd}
					onIngredientRemove={this.props.onIngredientRemove}
					disabled={disabledInfo}
					isPurchasable={this.isPurchasable()}
					onPurchase={this.purchaseHandler}
					price={this.props.totalPrice}
				/>
			</React.Fragment>
		);
	};

	render() {
		if (!this.props.isAuth) {
			return <Redirect to='/auth' />;
		}

		return (
			<React.Fragment>
				<Modal
					show={this.state.isPurchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{Boolean(this.props.ings) && (
						<OrderSummary
							ingredients={this.props.ings}
							price={this.props.totalPrice}
							purchaseCancelled={this.purchaseCancelHandler}
							purchaseContinued={this.purchaseContinueHandler}
						/>
					)}
				</Modal>
				<div className={classes.Container}>
					{Boolean(this.props.error) && <p>Ingredients can't be loaded!</p>}
					{this.props.ings ? this.renderBurger() : <Spinner />}
				</div>
			</React.Fragment>
		);
	}
}

BurgerBuilder.propTypes = {
	ings: PropTypes.object,
	totalPrice: PropTypes.number.isRequired,
	error: PropTypes.object,
	isAuth: PropTypes.bool,
	onIngredientAdd: PropTypes.func.isRequired,
	onIngredientRemove: PropTypes.func.isRequired,
	onGetIngredients: PropTypes.func.isRequired,
	onInitPurchase: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
	ings: null,
	error: null,
	isAuth: false,
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd: name => dispatch(addIngredient(name)),
		onIngredientRemove: name => dispatch(removeIngredient(name)),
		onGetIngredients: () => dispatch(getIngredients()),
		onInitPurchase: () => dispatch(purchaseInit()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
