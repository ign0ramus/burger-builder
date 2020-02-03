import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	FETCH_INGREDIENTS_FAILED,
	FETCH_INGREDIENTS_INIT,
} from './actionTypes';

export const addIngredient = name => ({
	type: ADD_INGREDIENT,
	payload: {
		name,
	},
});

export const removeIngredient = name => ({
	type: REMOVE_INGREDIENT,
	payload: {
		name,
	},
});

export const setIngredients = ingredients => ({
	type: SET_INGREDIENTS,
	payload: {
		ingredients,
	},
});

export const fetchIngredientsFailed = () => ({
	type: FETCH_INGREDIENTS_FAILED,
});

export const getIngredients = () => ({
	type: FETCH_INGREDIENTS_INIT,
});
