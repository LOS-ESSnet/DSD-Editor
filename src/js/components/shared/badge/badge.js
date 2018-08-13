import React from 'react';
import { getComponentTypeLabel } from 'js/rdf/naming';
import './badge.css';

export default ({ type }) => (
	<span className={`badge badge-pill badge-${type}`}>
		{getComponentTypeLabel(type)}
	</span>
);
