import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const Input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.onChange}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

Input.propTypes = {
	invalid: PropTypes.bool,
	shouldValidate: PropTypes.object,
	touched: PropTypes.bool,
	elementType: PropTypes.string.isRequired,
	elementConfig: PropTypes.object.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
	invalid: false,
	shouldValidate: null,
	touched: false,
	value: '',
	label: '',
};

export default Input;
