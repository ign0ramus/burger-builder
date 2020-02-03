import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import {
	purchaseStart,
	purchaseSuccess,
	purchaseFailed,
	getOrdersStart,
	getOrdersSuccess,
	getOrdersFailed,
} from '../actions';

export function* purchaseSaga(action) {
	yield put(purchaseStart());
	try {
		const res = yield axios.post(
			`/orders.json?auth=${action.token}`,
			action.data
		);
		yield put(purchaseSuccess(res.data.name, action.data));
	} catch (err) {
		yield put(purchaseFailed(err));
	}
}

export function* getOrdersSaga(action) {
	yield put(getOrdersStart());
	try {
		const res = yield axios.get(
			`/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
        );

		const fetchedOrders = [];
		for (let key in res.data) {
			fetchedOrders.push({
				...res.data[key],
				id: key,
			});
        }

		yield put(getOrdersSuccess(fetchedOrders));
	} catch (err) {
		yield put(getOrdersFailed(err));
	}
}
