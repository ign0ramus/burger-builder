import React, { Component } from 'react';
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

class ContactData extends Component {
	state = {
		orderForm: {
			name: nameInputOptions,
			street: streetInputOptions,
			country: countryInputOptions,
			email: emailInputOptions,
			deliveryMethod: deliveryMethodInputOptions,
		},
		isFormValid: false,
	};

	componentDidMount() {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}

	onSubmit = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId,
		};
		this.props.onOrder(order, this.props.token);
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(
			this.state.orderForm[inputIdentifier],
			{
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.orderForm[inputIdentifier].validation
				),
				touched: true,
			}
		);
		const orderForm = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement,
		});

		const isFormValid = Object.keys(orderForm).reduce(
			(acc, formElem) => orderForm[formElem].valid && acc,
			true
		);
		this.setState({ orderForm, isFormValid });
	};

	renderForm = () => {
		const formElementsArray = Object.keys(this.state.orderForm).map(key => ({
			id: key,
			config: this.state.orderForm[key],
		}));

		return (
			<form onSubmit={this.onSubmit}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						onChange={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.isFormValid}>
					ORDER
				</Button>
			</form>
		);
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{this.props.isLoading ? <Spinner /> : this.renderForm()}
			</div>
		);
	}
}

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
