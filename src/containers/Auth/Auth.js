import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import { auth } from '../../redux/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
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
			},
		},
		isSignUp: true,
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedControls = {
			...this.state.controls,
			[inputIdentifier]: {
				...this.state.controls[inputIdentifier],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[inputIdentifier].validation
				),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchHandler = () => {
		this.setState(prevState => ({
			isSignUp: !prevState.isSignUp,
		}));
	};

	render() {
		if (this.props.isAuth) {
			return <Redirect to='/' />;
		}

		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}
		let form = formElementsArray.map(formElement => (
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
		));

		if (this.props.isLoading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.Container}>
				{Boolean(this.props.error) && (
					<p style={{ color: 'red' }}>{this.props.error.message}</p>
				)}
				<form onSubmit={this.submitHandler} className={classes.Auth}>
					{form}
					<Button btnType='Success'>Submit</Button>
				</form>
				<Button clicked={this.switchHandler} btnType='Danger'>
					Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
				</Button>
			</div>
		);
	}
}

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