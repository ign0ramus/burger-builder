import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	FETCH_INGREDIENTS_FAILED,
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return addIngredient(state, action);
		case REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case SET_INGREDIENTS:
			return setIngredients(state, action);
		case FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		default:
			return state;
	}
};

const addIngredient = (state, action) =>
	updateObject(state, {
		ingredients: {
			...state.ingredients,
			[action.payload.name]: state.ingredients[action.payload.name] + 1,
		},
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.name],
	});

const removeIngredient = (state, action) =>
	updateObject(state, {
		ingredients: {
			...state.ingredients,
			[action.payload.name]: state.ingredients[action.payload.name] - 1,
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.name],
	});

const setIngredients = (state, action) =>
	updateObject(state, {
		ingredients: {
			salad: action.payload.ingredients.salad,
			bacon: action.payload.ingredients.bacon,
			cheese: action.payload.ingredients.cheese,
			meat: action.payload.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
	});

export default reducer;
