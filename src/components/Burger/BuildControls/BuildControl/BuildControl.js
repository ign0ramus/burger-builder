import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.css';

const BuildControl = props => (
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button
			className={classes.Less}
			onClick={props.onIngredientRemove}
			disabled={props.disabled}
		>
			Less
		</button>
		<button className={classes.More} onClick={props.onIngredientAdd}>
			More
		</button>
	</div>
);

BuildControl.propTypes = {
	label: PropTypes.string,
	onIngredientRemove: PropTypes.func.isRequired,
	onIngredientAdd: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

BuildControl.defaultProps = {
	label: '',
	disabled: false,
};

export default BuildControl;
