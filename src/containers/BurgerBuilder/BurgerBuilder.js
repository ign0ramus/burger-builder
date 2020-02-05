import React, { useState, useEffect } from 'react';
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

export const BurgerBuilder = props => {
	const [isPurchasing, setIsPurchasing] = useState(false);
	const { onGetIngredients } = props;

	useEffect(() => {
		onGetIngredients();
	}, [onGetIngredients]);

	const isPurchasable = () => {
		const sum = Object.keys(props.ings)
			.map(igKey => {
				return props.ings[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		setIsPurchasing(true);
	};

	const purchaseCancelHandler = () => {
		setIsPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	};

	const renderBurger = () => {
		const disabledInfo = {
			...props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Burger ingredients={props.ings} />
				<BuildControls
					onIngredientAdd={props.onIngredientAdd}
					onIngredientRemove={props.onIngredientRemove}
					disabled={disabledInfo}
					isPurchasable={isPurchasable()}
					onPurchase={purchaseHandler}
					price={props.totalPrice}
				/>
			</React.Fragment>
		);
	};

	if (!props.isAuth) {
		return <Redirect to='/auth' />;
	}

	return (
		<React.Fragment>
			<Modal show={isPurchasing} onClose={purchaseCancelHandler}>
				{Boolean(props.ings) && (
					<OrderSummary
						ingredients={props.ings}
						price={props.totalPrice}
						purchaseCancelled={purchaseCancelHandler}
						purchaseContinued={purchaseContinueHandler}
					/>
				)}
			</Modal>
			<div className={classes.Container}>
				{Boolean(props.error) && <p>Ingredients can't be loaded!</p>}
				{props.ings ? renderBurger() : <Spinner />}
			</div>
		</React.Fragment>
	);
};

BurgerBuilder.propTypes = {
	ings: PropTypes.object,
	totalPrice: PropTypes.number.isRequired,
	error: PropTypes.bool,
	isAuth: PropTypes.bool,
	onIngredientAdd: PropTypes.func.isRequired,
	onIngredientRemove: PropTypes.func.isRequired,
	onGetIngredients: PropTypes.func.isRequired,
	onInitPurchase: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
	ings: null,
	error: false,
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
