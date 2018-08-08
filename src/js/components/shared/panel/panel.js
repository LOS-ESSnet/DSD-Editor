import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import flag from 'js/components/shared/flag';
import './panel.css';

const myPanel = ({ title, body, lang }) => (
	<Panel>
		<Panel.Heading>
			<Panel.Title componentClass="h3">
				{title} {flag(lang) ? '( ' : null} {flag(lang)}{' '}
				{flag(lang) ? ' )' : null}
			</Panel.Title>
		</Panel.Heading>
		<Panel.Body>{body}</Panel.Body>
	</Panel>
);

myPanel.proptTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default myPanel;
