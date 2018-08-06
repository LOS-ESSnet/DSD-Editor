import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ action, label, disabled, col, offset }) => {
	let button;
	if (typeof action === 'string') {
		button = (
			<React.Fragment>
				{disabled && (
					<div className={`btn button btn-lg col-md-12`} disabled={true}>
						{label}
					</div>
				)}
				{!disabled && (
					<Link className={`btn button btn-lg col-md-12`} to={action}>
						{label}
					</Link>
				)}
			</React.Fragment>
		);
	} else {
		//if action is a function, it means a handler was passed in instead of an URL
		button = (
			<button
				className={`btn button btn-lg col-md-12`}
				onClick={action}
				disabled={disabled}
			>
				{label}
			</button>
		);
	}
	return (
		<div
			className={`col-md-${col || 2} ${offset && `col-md-offset-${offset}`}`}
		>
			{button}
		</div>
	);
};

Button.propTypes = {
	//handler or url
	action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	col: PropTypes.number,
	offset: PropTypes.number,
};

export default Button;
