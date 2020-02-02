import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const Button = props => (
	<button
		disabled={props.disabled}
		className={[classes.Button, classes[props.btnType]].join(' ')}
		onClick={props.handleClick}
	>
		{props.children}
	</button>
);

Button.propTypes = {
	disabled: PropTypes.bool,
	handleClick: PropTypes.func,
};

Button.defaultProps = {
	disabled: false,
	handleClick: () => {},
};

export default Button;
