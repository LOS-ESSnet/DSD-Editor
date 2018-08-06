import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default ({ id, label, value, placeholder, onChange }) => (
	<div className="row">
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl
				type="file"
				value={value}
				placeholder={'' || placeholder}
				onChange={onChange}
			/>
		</FormGroup>
	</div>
);
