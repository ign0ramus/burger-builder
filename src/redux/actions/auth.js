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

const authSuccess = (token, userId) => ({
	type: AUTH_SUCCESS,
	payload: {
		token,
		userId,
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
			localStorage.setItem('token', res.data.idToken);
			localStorage.setItem(
				'expirationDate',
				new Date(Date.now() + res.data.expiresIn * 1000)
			);
			localStorage.setItem('userId', res.data.localId);

			dispatch(authSuccess(res.data.idToken, res.data.localId));
			dispatch(checkAuthTimeout(res.data.expiresIn * 1000));
		})
		.catch(err => {
			dispatch(authFail(err.response.data.error));
		});
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');

	return {
		type: AUTH_LOGOUT,
	};
};

const checkAuthTimeout = expTime => dispatch => {
	setTimeout(() => dispatch(logout()), expTime);
};

export const authCheckState = () => dispatch => {
	const token = localStorage.getItem('token');
	if (!token) {
		dispatch(logout());
	} else {
		const expDate = new Date(localStorage.getItem('expirationDate'));
		if (expDate > Date.now()) {
			const userId = localStorage.getItem('userId');
			dispatch(authSuccess(token, userId));
			dispatch(checkAuthTimeout(expDate - Date.now()));
		} else {
			dispatch(logout());
		}
	}
};
