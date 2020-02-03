import { put, delay, call, all } from 'redux-saga/effects';
import axios from 'axios';

import {
	logoutSuccess,
	logout,
	authStart,
	authSuccess,
	authFail,
	checkAuthTimeout,
} from '../actions';

export function* logoutSaga(action) {
	yield all([
		call([localStorage, 'removeItem'], 'token'),
		call([localStorage, 'removeItem'], 'expirationDate'),
		call([localStorage, 'removeItem'], 'userId'),
	]);

	yield put(logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.payload.expirationTime);
	yield put(logout());
}

export function* authUserSaga(action) {
	yield put(authStart());

	const data = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};

	const signUpUrl =
		'';
	const signInUrl =
		'';

	try {
		const res = yield axios.post(action.isSignUp ? signUpUrl : signInUrl, data);

		yield localStorage.setItem('token', res.data.idToken);
		yield localStorage.setItem(
			'expirationDate',
			new Date(Date.now() + res.data.expiresIn * 1000)
		);
		yield localStorage.setItem('userId', res.data.localId);

		yield put(authSuccess(res.data.idToken, res.data.localId));
		yield put(checkAuthTimeout(res.data.expiresIn * 1000));
	} catch (err) {
		yield put(authFail(err.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token');
	if (!token) {
		yield put(logout());
	} else {
		const expDate = yield new Date(localStorage.getItem('expirationDate'));
		if (expDate > Date.now()) {
			const userId = yield localStorage.getItem('userId');
			yield put(authSuccess(token, userId));
			yield put(checkAuthTimeout(expDate - Date.now()));
		} else {
			yield put(logout());
		}
	}
}
