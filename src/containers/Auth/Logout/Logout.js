import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	componentDidMount() {
		this.props.onLogout();
	}

	render() {
		return <Redirect to='/auth' />;
	}
}

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
