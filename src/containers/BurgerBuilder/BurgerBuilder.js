import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

	const ings = useSelector(state => state.burgerBuilder.ingredients);
	const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const error = useSelector(state => state.burgerBuilder.error);
	const isAuth = useSelector(state => state.auth.token !== null);

	const dispatch = useDispatch();
	const onIngredientAdd = name => dispatch(addIngredient(name));
	const onIngredientRemove = name => dispatch(removeIngredient(name));
	const onGetIngredients = useCallback(() => dispatch(getIngredients()), []);
	const onInitPurchase = () => dispatch(purchaseInit());

	useEffect(() => {
		onGetIngredients();
	}, [onGetIngredients]);

	const isPurchasable = () => {
		const sum = Object.keys(ings)
			.map(igKey => {
				return ings[igKey];
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
		onInitPurchase();
		props.history.push('/checkout');
	};

	const renderBurger = () => {
		const disabledInfo = {
			...ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Burger ingredients={ings} />
				<BuildControls
					onIngredientAdd={onIngredientAdd}
					onIngredientRemove={onIngredientRemove}
					disabled={disabledInfo}
					isPurchasable={isPurchasable()}
					onPurchase={purchaseHandler}
					price={totalPrice}
				/>
			</React.Fragment>
		);
	};

	if (!isAuth) {
		return <Redirect to='/auth' />;
	}

	return (
		<React.Fragment>
			<Modal show={isPurchasing} onClose={purchaseCancelHandler}>
				{Boolean(ings) && (
					<OrderSummary
						ingredients={ings}
						price={totalPrice}
						purchaseCancelled={purchaseCancelHandler}
						purchaseContinued={purchaseContinueHandler}
					/>
				)}
			</Modal>
			<div className={classes.Container}>
				{Boolean(error) && <p>Ingredients can't be loaded!</p>}
				{ings ? renderBurger() : <Spinner />}
			</div>
		</React.Fragment>
	);
};

export default withErrorHandler(BurgerBuilder, axios);
