import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	FETCH_INGREDIENTS_FAILED,
} from './actionTypes';
import axios from '../../axios-orders';

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

const setIngredients = ingredients => ({
	type: SET_INGREDIENTS,
	payload: {
		ingredients,
	},
});

const fetchIngredientsFailed = () => ({
	type: FETCH_INGREDIENTS_FAILED,
});

export const getIngredients = () => dispatch => {
	axios
		.get('/ingredients.json')
		.then(response => {
			dispatch(setIngredients(response.data));
		})
		.catch(error => {
			dispatch(fetchIngredientsFailed());
		});
};
