import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = props => (
	<li className={classes.NavigationItem}>
		<NavLink
			to={props.link}
			exact={props.exact}
			activeClassName={classes.active}
		>
			{props.children}
		</NavLink>
	</li>
);

NavigationItem.propTypes = {
	link: PropTypes.string.isRequired,
	exact: PropTypes.bool,
};

NavigationItem.defaultProps = {
	exact: false,
};

export default NavigationItem;
