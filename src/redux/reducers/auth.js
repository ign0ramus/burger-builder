import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT,
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	isLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return authStart(state);
		case AUTH_SUCCESS:
			return authSuccess(state, action);
		case AUTH_FAIL:
			return authFail(state, action);
		case AUTH_LOGOUT:
			return authLogout(state);
		default:
			return state;
	}
};

const authStart = state =>
	updateObject(state, { error: null, isLoading: true });

const authSuccess = (state, action) =>
	updateObject(state, {
		token: action.payload.token,
		userId: action.payload.userId,
		error: null,
		isLoading: false,
	});

const authFail = (state, action) =>
	updateObject(state, {
		error: action.payload.error,
		isLoading: false,
	});

const authLogout = state => updateObject(state, { token: null, userId: null });

export default reducer;
