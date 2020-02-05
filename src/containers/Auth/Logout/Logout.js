import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth';
import { Redirect } from 'react-router-dom';

const Logout = props => {
	const { onLogout } = props;

	useEffect(() => {
		onLogout();
	}, [onLogout]);

	return <Redirect to='/auth' />;
};

Logout.propTypes = {
	onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
