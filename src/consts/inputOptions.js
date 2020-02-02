export const emailInputOptions = {
	elementType: 'input',
	elementConfig: {
		type: 'email',
		placeholder: 'E-Mail',
	},
	value: '',
	validation: {
		required: true,
		isEmail: true,
	},
	valid: false,
	touched: false,
};

export const passwordInputOptions = {
	elementType: 'input',
	elementConfig: {
		type: 'password',
		placeholder: 'Password',
	},
	value: '',
	validation: {
		required: true,
		minLength: 6,
	},
	valid: false,
	touched: false,
};

export const nameInputOptions = {
	elementType: 'input',
	elementConfig: {
		type: 'text',
		placeholder: 'Name',
	},
	value: '',
	validation: {
		required: true,
	},
	valid: false,
	touched: false,
};

export const streetInputOptions = {
	elementType: 'input',
	elementConfig: {
		type: 'text',
		placeholder: 'Street',
	},
	value: '',
	validation: {
		required: true,
	},
	valid: false,
	touched: false,
};

export const countryInputOptions = {
	elementType: 'input',
	elementConfig: {
		type: 'text',
		placeholder: 'Country',
	},
	value: '',
	validation: {
		required: true,
	},
	valid: false,
	touched: false,
};

export const deliveryMethodInputOptions = {
	elementType: 'select',
	elementConfig: {
		options: [
			{ value: 'fastest', displayValue: 'Fastest' },
			{ value: 'cheapest', displayValue: 'Cheapest' },
		],
	},
	value: 'fastest',
	validation: {},
	valid: true,
};
