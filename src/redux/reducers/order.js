import {
	PURCHASE_FAILED,
	PURCHASE_SUCCESS,
	PURCHASE_START,
	PURCHASE_INIT,
	GET_ORDERS_START,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILED,
} from '../actions/actionTypes';

import updateObject from '../../helpers/updateObject';

const initialState = {
	orders: [],
	isLoading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_INIT:
			return updateObject(state, { purchased: false });
		case PURCHASE_SUCCESS:
			return purchaseSuccess(state, action);
		case PURCHASE_FAILED:
			return updateObject(state, { isLoading: false });
		case PURCHASE_START:
			return updateObject(state, { isLoading: true });
		case GET_ORDERS_START:
			return updateObject(state, { isLoading: true });
		case GET_ORDERS_SUCCESS:
			return getOrdersSuccess(state, action);
		case GET_ORDERS_FAILED:
			return updateObject(state, { isLoading: false });
		default:
			return state;
	}
};

const purchaseSuccess = (state, action) =>
	updateObject(state, {
		isLoading: false,
		orders: state.orders.concat({
			...action.payload.data,
			id: action.payload.id,
		}),
		purchased: true,
	});

const getOrdersSuccess = (state, action) =>
	updateObject(state, {
		orders: action.payload.orders,
		isLoading: false,
	});

export default reducer;
