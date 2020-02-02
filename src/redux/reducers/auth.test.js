import reducer from './auth';
import { AUTH_SUCCESS } from '../actions/actionTypes';

describe('auth reducer', () => {
	const initialState = {
		token: null,
		userId: null,
		error: null,
		isLoading: false,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should store the token upon login', () => {
		expect(
			reducer(initialState, {
				type: AUTH_SUCCESS,
				payload: {
					token: 'token',
					userId: 'userId',
				},
			})
		).toEqual({
			...initialState,
			token: 'token',
			userId: 'userId',
		});
	});
});
