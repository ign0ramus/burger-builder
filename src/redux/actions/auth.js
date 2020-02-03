import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_INITIATE_LOGOUT,
	AUTH_LOGOUT,
	AUTH_CHECK_TIMEOUT,
	AUTH_USER,
	AUTH_CHECK_STATE_INIT,
} from './actionTypes';

export const authStart = () => ({
	type: AUTH_START,
});

export const authSuccess = (token, userId) => ({
	type: AUTH_SUCCESS,
	payload: {
		token,
		userId,
	},
});

export const authFail = error => ({
	type: AUTH_FAIL,
	payload: {
		error,
	},
});

export const auth = (email, password, isSignUp) => ({
	type: AUTH_USER,
	email,
	password,
	isSignUp,
});

export const logout = () => ({
	type: AUTH_INITIATE_LOGOUT,
});

export const logoutSuccess = () => ({
	type: AUTH_LOGOUT,
});

export const checkAuthTimeout = expTime => ({
	type: AUTH_CHECK_TIMEOUT,
	payload: {
		expirationTime: expTime,
	},
});

export const authCheckState = () => ({
	type: AUTH_CHECK_STATE_INIT,
});
