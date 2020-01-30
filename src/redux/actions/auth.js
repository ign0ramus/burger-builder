import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT,
} from './actionTypes';
import axios from 'axios';

const authStart = () => ({
	type: AUTH_START,
});

const authSuccess = data => ({
	type: AUTH_SUCCESS,
	payload: {
		token: data.idToken,
		userId: data.localId,
	},
});

const authFail = error => ({
	type: AUTH_FAIL,
	payload: {
		error,
	},
});

export const auth = (email, password, isSignUp) => dispatch => {
	dispatch(authStart());

	const signUpUrl =
		'';
	const signInUrl =
		'';
	axios
		.post(isSignUp ? signUpUrl : signInUrl, {
			email,
			password,
			returnSecureToken: true,
		})
		.then(res => {
			dispatch(authSuccess(res.data));
			dispatch(checkAuthTimeout(res.data.expiresIn));
		})
		.catch(err => {
			dispatch(authFail(err.response.data.error));
		});
};

const logout = () => ({
	type: AUTH_LOGOUT,
});

const checkAuthTimeout = expTime => dispatch => {
	setTimeout(() => dispatch(logout()), expTime * 1000);
};
