import React from 'react';
import PropTypes from 'prop-types';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = ({ isAuth }) => (
	<ul className={classes.NavigationItems}>
		{isAuth && (
			<React.Fragment>
				<NavigationItem link='/' exact>
					Burger Builder
				</NavigationItem>
				<NavigationItem link='/orders'>Orders</NavigationItem>
			</React.Fragment>
		)}
		{isAuth ? (
			<NavigationItem link='/logout'>Logout</NavigationItem>
		) : (
			<NavigationItem link='/auth'>Authenticate</NavigationItem>
		)}
	</ul>
);

NavigationItems.propTypes = {
	isAuth: PropTypes.bool,
};

NavigationItems.defaultProps = {
	isAuth: false,
};

export default NavigationItems;
