import React from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl,
	InputGroup,
	HelpBlock,
} from 'react-bootstrap';
import flag from 'js/components/shared/flag';

export default ({
	id,
	label,
	addOn,
	placeholder,
	value,
	onChange,
	disabled,
	col,
	lang,
	helpMsg,
}) => (
	<div className="row">
		<div className={`col-md-${col ? col : '12'}`}>
			<FormGroup controlId={id}>
				{label && (
					<ControlLabel>
						{label} {flag(lang) ? '( ' : null} {flag(lang)}{' '}
						{flag(lang) ? ' )' : null}
					</ControlLabel>
				)}{' '}
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
				{helpMsg && <HelpBlock style={{ color: 'red' }}>{helpMsg}</HelpBlock>}
			</FormGroup>
		</div>
	</div>
);
