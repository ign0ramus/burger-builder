import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSideDrawerClose = () => {
		setIsOpen(false);
	};

	const handleSideDrawerToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={classes.Layout}>
			<Toolbar
				isAuth={props.isAuth}
				handleSideDrawerToggle={handleSideDrawerToggle}
			/>
			<SideDrawer
				isAuth={props.isAuth}
				isOpen={isOpen}
				onClose={handleSideDrawerClose}
			/>
			<main className={classes.Content}>{props.children}</main>
		</div>
	);
};

Layout.propTypes = {
	isAuth: PropTypes.bool,
};

Layout.defaultProps = {
	isAuth: false,
};

const mapStateToProps = state => ({
	isAuth: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
