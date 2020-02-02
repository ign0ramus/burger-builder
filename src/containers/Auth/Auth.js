import React, { Component } from 'react';
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

class Auth extends Component {
	state = {
		controls: {
			email: emailInputOptions,
			password: passwordInputOptions,
		},
		isSignUp: true,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const controls = updateObject(this.state.controls, {
			[inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[inputIdentifier].validation
				),
				touched: true,
			}),
		});
		this.setState({ controls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	buttonClickHandler = () => {
		this.setState(prevState => ({
			isSignUp: !prevState.isSignUp,
		}));
	};

	renderForm = () => {
		const formElementsArray = Object.keys(this.state.controls).map(key => ({
			id: key,
			config: this.state.controls[key],
		}));

		return (
			<form onSubmit={this.submitHandler} className={classes.Auth}>
				{this.state.isSignUp ? 'Sign Up' : 'Sign In'}
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType='Success'>Submit</Button>
			</form>
		);
	};

	render() {
		if (this.props.isAuth) {
			return <Redirect to='/' />;
		}

		return (
			<div className={classes.Container}>
				{Boolean(this.props.error) && (
					<p style={{ color: 'red' }}>{this.props.error.message}</p>
				)}
				{this.props.isLoading ? <Spinner /> : this.renderForm()}
				<Button handleClick={this.buttonClickHandler} btnType='Danger'>
					Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
				</Button>
			</div>
		);
	}
}

Auth.propTypes = {
	isLoading: PropTypes.bool,
	error: PropTypes.object,
	isAuth: PropTypes.bool,
};

Auth.defaultProps = {
	isLoading: false,
	error: {},
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
