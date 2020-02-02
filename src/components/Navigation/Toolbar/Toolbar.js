import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

const Toolbar = props => (
	<header className={classes.Container}>
		<div className={classes.Toolbar}>
			<DrawerToggle handleClick={props.handleSideDrawerToggle} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuth={props.isAuth} />
			</nav>
		</div>
	</header>
);

Toolbar.propTypes = {
	handleSideDrawerToggle: PropTypes.func.isRequired,
	isAuth: PropTypes.bool,
};

Toolbar.defaultProps = {
	isAuth: false,
};

export default Toolbar;
