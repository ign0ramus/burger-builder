import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchase } from '../../../redux/actions';
import updateObject from '../../../helpers/updateObject';
import { checkValidity } from '../../../helpers/validation';
import {
	nameInputOptions,
	streetInputOptions,
	countryInputOptions,
	emailInputOptions,
	deliveryMethodInputOptions,
} from '../../../consts/inputOptions';
import classes from './ContactData.css';

const initialOrderForm = {
	name: { ...nameInputOptions },
	street: { ...streetInputOptions },
	country: { ...countryInputOptions },
	email: { ...emailInputOptions },
	deliveryMethod: { ...deliveryMethodInputOptions },
};

const ContactData = props => {
	const [orderForm, setOrderForm] = useState(initialOrderForm);
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}, []);

	const onSubmit = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: props.ings,
			price: props.totalPrice,
			orderData: formData,
			userId: props.userId,
		};
		props.onOrder(order, props.token);
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(
				event.target.value,
				orderForm[inputIdentifier].validation
			),
			touched: true,
		});
		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement,
		});

		const isValid = Object.keys(updatedOrderForm).reduce(
			(acc, formElem) => updatedOrderForm[formElem].valid && acc,
			true
		);
		setOrderForm(updatedOrderForm);
		setIsFormValid(isValid);
	};

	const renderForm = () => {
		const formElementsArray = Object.keys(orderForm).map(key => ({
			id: key,
			config: orderForm[key],
		}));

		return (
			<form onSubmit={onSubmit}>
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
				<Button btnType='Success' disabled={!isFormValid}>
					ORDER
				</Button>
			</form>
		);
	};

	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{props.isLoading ? <Spinner /> : renderForm()}
		</div>
	);
};

ContactData.propTypes = {
	ings: PropTypes.object.isRequired,
	totalPrice: PropTypes.number.isRequired,
	isLoading: PropTypes.bool,
	userId: PropTypes.string.isRequired,
	onOrder: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
};

ContactData.defaultProps = {
	isLoading: false,
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isLoading: state.order.isLoading,
		userId: state.auth.userId,
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => ({
	onOrder: (data, token) => dispatch(purchase(data, token)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
