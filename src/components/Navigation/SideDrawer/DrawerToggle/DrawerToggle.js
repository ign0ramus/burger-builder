import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

const DrawerToggle = props => (
	<div className={classes.DrawerToggle} onClick={props.handleClick}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

DrawerToggle.propTypes = {
	handleClick: PropTypes.func.isRequired,
};

export default DrawerToggle;
