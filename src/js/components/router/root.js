import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import D from 'js/i18n';

export default () => (
	<React.Fragment>
		<div className="centered app-title">
			<h1>{D.welcome}</h1>
		</div>
		<div className="container">
			<Router>
				<Routes />
			</Router>
		</div>
	</React.Fragment>
);
