import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';

const Order = props => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		return (
			<span
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px',
				}}
				key={ig.name}
			>
				{ig.name} ({ig.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

Order.PropTypes = {
	ingredients: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired,
};

export default Order;
