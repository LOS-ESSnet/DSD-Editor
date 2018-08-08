import React from 'react';
import PropTypes from 'prop-types';
import './page-title.css';

function PageTitle({ title, subtitle, col, offset }) {
	const className = 'page-title';
	return (
		<div className="row">
			<div
				className={`col-md-${col || 10} centered col-md-offset-${
					offset === undefined ? 1 : offset
				}`}
			>
				<div className={className}>
					<h2>{title}</h2>
					{subtitle && <h3>&quot; {subtitle} &quot;</h3>}
				</div>
			</div>
		</div>
	);
}

PageTitle.proptTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

export default PageTitle;
