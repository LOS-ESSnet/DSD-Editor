import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import './panel.css';

const myPanel = ({ title, body }) => (
	<Panel>
		<Panel.Heading>
			<Panel.Title componentClass="h3">{title}</Panel.Title>
		</Panel.Heading>
		<Panel.Body>{body}</Panel.Body>
	</Panel>
);

myPanel.proptTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default myPanel;
