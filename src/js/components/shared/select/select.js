import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './select.css';

function mySelect({
	value,
	placeholder,
	options,
	onChange,
	unclearable,
	searchable,
	multi,
}) {
	const isClearable = unclearable ? false : true;
	return (
		<div className="select">
			<Select
				value={value}
				placeholder={placeholder}
				options={options}
				onChange={onChange}
				clearable={isClearable}
				searchable={searchable}
				multi={multi}
			/>
		</div>
	);
}

mySelect.defaultProps = {
	multi: false,
	clearable: false,
	searchable: true,
};

mySelect.propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
	clearable: PropTypes.bool,
	searchable: PropTypes.bool,
	creatable: PropTypes.bool,
};

export default mySelect;
