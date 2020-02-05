import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const Modal = props => {
	return (
		<React.Fragment>
			<Backdrop show={props.show} onClick={props.onClose} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}
			>
				{props.children}
			</div>
		</React.Fragment>
	);
};

Modal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
	show: false,
};

export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);
