import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
					{this.props.ingredients[igKey]}
				</li>
			);
		});

		return (
			<React.Fragment>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnType='Danger' handleClick={this.props.purchaseCancelled}>
					CANCEL
				</Button>
				<Button btnType='Success' handleClick={this.props.purchaseContinued}>
					CONTINUE
				</Button>
			</React.Fragment>
		);
	}
}

OrderSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired,
	purchaseCancelled: PropTypes.func.isRequired,
	purchaseContinued: PropTypes.func.isRequired,
};

export default OrderSummary;
