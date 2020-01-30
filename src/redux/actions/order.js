import {
	PURCHASE_SUCCESS,
	PURCHASE_FAILED,
	PURCHASE_START,
	PURCHASE_INIT,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILED,
	GET_ORDERS_START,
} from './actionTypes';
import axios from '../../axios-orders';

const purchaseSuccess = (id, data) => ({
	type: PURCHASE_SUCCESS,
	payload: {
		id,
		data,
	},
});

const purchaseFailed = error => ({
	type: PURCHASE_FAILED,
	payload: {
		error,
	},
});

const purchaseStart = () => ({
	type: PURCHASE_START,
});

export const purchase = data => (dispatch, getState) => {
	dispatch(purchaseStart());
	axios
		.post('/orders.json?auth=' + getState().auth.token, data)
		.then(response => {
			dispatch(purchaseSuccess(response.data.name, data));
		})
		.catch(error => {
			dispatch(purchaseFailed(error));
		});
};

export const purchaseInit = () => ({
	type: PURCHASE_INIT,
});

const getOrdersSuccess = orders => ({
	type: GET_ORDERS_SUCCESS,
	payload: {
		orders,
	},
});

const getOrdersFailed = error => ({
	type: GET_ORDERS_FAILED,
	payload: {
		error,
	},
});

const getOrdersStart = () => ({
	type: GET_ORDERS_START,
});

export const getOrders = () => (dispatch, getState) => {
	dispatch(getOrdersStart());
	axios
		.get(
			`/orders.json?auth=${getState().auth.token}&orderBy="userId"&equalTo="${
				getState().auth.userId
			}"`
		)
		.then(res => {
			const fetchedOrders = [];
			for (let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id: key,
				});
			}
			dispatch(getOrdersSuccess(fetchedOrders));
		})
		.catch(err => {
			dispatch(getOrdersFailed(err));
		});
};
