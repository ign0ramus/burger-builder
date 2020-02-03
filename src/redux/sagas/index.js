import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import {
	logoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga,
} from './auth';
import {
	AUTH_INITIATE_LOGOUT,
	AUTH_CHECK_TIMEOUT,
	AUTH_USER,
	AUTH_CHECK_STATE_INIT,
	FETCH_INGREDIENTS_INIT,
	PURCHASE_ACTIVATE,
	GET_ORDERS_INIT,
} from '../actions/actionTypes';
import { getIngredientsSaga } from './burgerBuilder';
import { purchaseSaga, getOrdersSaga } from './order';

export function* watchAuth() {
	yield all([
		takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(AUTH_USER, authUserSaga),
		takeEvery(AUTH_CHECK_STATE_INIT, authCheckStateSaga),
	]);
}

export function* watchBurgerBuilder() {
	yield takeEvery(FETCH_INGREDIENTS_INIT, getIngredientsSaga);
}

export function* watchOrder() {
	yield all([
		takeLatest(PURCHASE_ACTIVATE, purchaseSaga),
		takeEvery(GET_ORDERS_INIT, getOrdersSaga),
	]);
}
