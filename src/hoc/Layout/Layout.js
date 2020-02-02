import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	handleSideDrawerClose = () => {
		this.setState({ showSideDrawer: false });
	};

	handleSideDrawerToggle = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<div className={classes.Layout}>
				<Toolbar
					isAuth={this.props.isAuth}
					handleSideDrawerToggle={this.handleSideDrawerToggle}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					isOpen={this.state.showSideDrawer}
					onClose={this.handleSideDrawerClose}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</div>
		);
	}
}

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
