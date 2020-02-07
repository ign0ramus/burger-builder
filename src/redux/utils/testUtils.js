import { runSaga } from 'redux-saga';

export const recordSaga = async (saga, args) => {
	const dispatched = [];
	await runSaga(
		{
			dispatch: action => dispatched.push(action),
		},
		saga,
		args
	);
	return dispatched;
};
