import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				onIngredientAdd={() => props.onIngredientAdd(ctrl.type)}
				onIngredientRemove={() => props.onIngredientRemove(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
		<button
			className={classes.OrderButton}
			disabled={!props.isPurchasable}
			onClick={props.onPurchase}
		>
			ORDER NOW
		</button>
	</div>
);

BuildControls.propTypes = {
	onIngredientRemove: PropTypes.func.isRequired,
	onIngredientAdd: PropTypes.func.isRequired,
	onPurchase: PropTypes.func.isRequired,
	isPurchasable: PropTypes.bool,
	disabled: PropTypes.bool,
};

BuildControls.defaultProps = {
	disabled: false,
	isPurchasable: false,
};

export default BuildControls;
