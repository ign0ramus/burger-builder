import { put, call } from 'redux-saga/effects';

import axios from '../../axios-orders';
import { setIngredients, fetchIngredientsFailed } from '../actions';

export function* getIngredientsSaga(action) {
	try {
		const res = yield call([axios, 'get'], '/ingredients.json');
		yield put(setIngredients(res.data));
	} catch (err) {
		yield put(fetchIngredientsFailed());
	}
}
