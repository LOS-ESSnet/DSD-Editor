import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default ({ id, label, placeholder, value, onChange, height, width }) => (
	<div className="row">
		<FormGroup controlId={id}>
			{label && <ControlLabel>{label}</ControlLabel>}
			<FormControl
				componentClass="textarea"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				style={{
					height: height || '400px',
					width: width || '100%',
				}}
			/>
		</FormGroup>
	</div>
);
