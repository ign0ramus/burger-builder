import {
	PURCHASE_SUCCESS,
	PURCHASE_FAILED,
	PURCHASE_START,
	PURCHASE_INIT,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILED,
	GET_ORDERS_START,
	PURCHASE_ACTIVATE,
	GET_ORDERS_INIT,
} from './actionTypes';

export const purchaseSuccess = (id, data) => ({
	type: PURCHASE_SUCCESS,
	payload: {
		id,
		data,
	},
});

export const purchaseFailed = error => ({
	type: PURCHASE_FAILED,
	payload: {
		error,
	},
});

export const purchaseStart = () => ({
	type: PURCHASE_START,
});

export const purchase = (data, token) => ({
	type: PURCHASE_ACTIVATE,
	data,
	token,
});

export const purchaseInit = () => ({
	type: PURCHASE_INIT,
});

export const getOrdersSuccess = orders => ({
	type: GET_ORDERS_SUCCESS,
	payload: {
		orders,
	},
});

export const getOrdersFailed = error => ({
	type: GET_ORDERS_FAILED,
	payload: {
		error,
	},
});

export const getOrdersStart = () => ({
	type: GET_ORDERS_START,
});

export const getOrders = (token, userId) => ({
	type: GET_ORDERS_INIT,
	token,
	userId,
});
