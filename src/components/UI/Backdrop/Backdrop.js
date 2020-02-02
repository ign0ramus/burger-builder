import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const Backdrop = props =>
	props.show ? (
		<div className={classes.Backdrop} onClick={props.onClick}></div>
	) : null;

Backdrop.propTypes = {
	onClick: PropTypes.func.isRequired,
	show: PropTypes.bool,
};

Backdrop.defaultProps = {
	show: false,
};

export default Backdrop;
