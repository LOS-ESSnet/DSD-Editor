import React from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl,
	InputGroup,
} from 'react-bootstrap';

export default ({
	id,
	label,
	addOn,
	placeholder,
	value,
	onChange,
	disabled,
}) => (
	<div className="row">
		<FormGroup controlId={id}>
			{label && <ControlLabel>{label}</ControlLabel>}{' '}
			{addOn && (
				<InputGroup>
					<InputGroup.Addon>{addOn}</InputGroup.Addon>
					<FormControl
						componentClass="input"
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						disabled={disabled}
					/>
				</InputGroup>
			)}
			{!addOn && (
				<FormControl
					componentClass="input"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			)}
		</FormGroup>
	</div>
);
