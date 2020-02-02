import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const SideDrawer = props => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.isOpen) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<React.Fragment>
			<Backdrop show={props.isOpen} onClick={props.onClose} />
			<div className={attachedClasses.join(' ')} onClick={props.onClose}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};

SideDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	isAuth: PropTypes.bool,
};

SideDrawer.defaultProps = {
	isOpen: false,
	isAuth: false,
};

export default SideDrawer;
