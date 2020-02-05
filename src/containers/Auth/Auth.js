import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth } from '../../redux/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import updateObject from '../../helpers/updateObject';
import { checkValidity } from '../../helpers/validation';
import {
	emailInputOptions,
	passwordInputOptions,
} from '../../consts/inputOptions';
import classes from './Auth.css';

const initialControls = {
	email: { ...emailInputOptions },
	password: { ...passwordInputOptions },
};

const Auth = props => {
	const [controls, setControls] = useState(initialControls);
	const [isSignUp, setIsSignUp] = useState(false);

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedControls = updateObject(controls, {
			[inputIdentifier]: updateObject(controls[inputIdentifier], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					controls[inputIdentifier].validation
				),
				touched: true,
			}),
		});
		setControls(updatedControls);
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignUp);
	};

	const buttonClickHandler = () => {
		setIsSignUp(!isSignUp);
	};

	const renderForm = () => {
		const formElementsArray = Object.keys(controls).map(key => ({
			id: key,
			config: controls[key],
		}));

		return (
			<form onSubmit={submitHandler} className={classes.Auth}>
				{isSignUp ? 'Sign Up' : 'Sign In'}
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						onChange={event => inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType='Success'>Submit</Button>
			</form>
		);
	};

	if (props.isAuth) {
		return <Redirect to='/' />;
	}

	return (
		<div className={classes.Container}>
			{Boolean(props.error) && (
				<p style={{ color: 'red' }}>{props.error.message}</p>
			)}
			{props.isLoading ? <Spinner /> : renderForm()}
			<Button handleClick={buttonClickHandler} btnType='Danger'>
				Switch To {isSignUp ? 'Sign In' : 'Sign Up'}
			</Button>
		</div>
	);
};

Auth.propTypes = {
	isLoading: PropTypes.bool,
	error: PropTypes.object,
	isAuth: PropTypes.bool,
};

Auth.defaultProps = {
	isLoading: false,
	error: null,
	isAuth: false,
};

const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
	error: state.auth.error,
	isAuth: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
	onAuth: (email, password, isSignUp) =>
		dispatch(auth(email, password, isSignUp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
