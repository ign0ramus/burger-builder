import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuth }) => (
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

export default navigationItems;
