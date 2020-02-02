import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType='Danger' handleClick={props.checkoutCancelled}>
				CANCEL
			</Button>
			<Button btnType='Success' handleClick={props.checkoutContinued}>
				CONTINUE
			</Button>
		</div>
	);
};

CheckoutSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	checkoutCancelled: PropTypes.func.isRequired,
	checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
