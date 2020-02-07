import { takeEvery } from 'redux-saga/effects';

import { recordSaga } from '../utils/testUtils';
import { getIngredientsSaga } from './burgerBuilder';
import axios from '../../axios-orders';
import { watchBurgerBuilder } from './index';
import { FETCH_INGREDIENTS_INIT } from '../actions/actionTypes';
import { setIngredients, fetchIngredientsFailed } from '../actions';

describe('burgerBuilder saga', () => {
	const genObject = watchBurgerBuilder();

	it('should wait for every FETCH_INGREDIENTS_INIT action and call getIngredientsSaga', () => {
		expect(genObject.next().value).toEqual(
			takeEvery(FETCH_INGREDIENTS_INIT, getIngredientsSaga)
		);
	});

	it('should be done on next iteration', () => {
		expect(genObject.next()).toBeTruthy();
	});

	axios.get = jest.fn();

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should fetch ingredients and dispatch success action', async () => {
		const dummyRes = {
			data: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
		};
		axios.get.mockImplementation(() => Promise.resolve(dummyRes));
		const result = await recordSaga(getIngredientsSaga);
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(result).toEqual([setIngredients(dummyRes.data)]);
	});

    it('should try to fetch ingredients and dispatch error action', async () => {
        axios.get.mockImplementation(() => Promise.reject());
        const result = await recordSaga(getIngredientsSaga);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual([fetchIngredientsFailed()]);
    });
});
