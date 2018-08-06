import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from 'js/components/app';
import Import from 'js/components/import';
import Export from 'js/components/export';
import DSD from 'js/components/dsd';
import Create from 'js/components/dsd/edition/creation-container';
import Update from 'js/components/dsd/edition/update-container';

export default () => (
	<Switch>
		<Route exact path="/" component={App} />
		<Route exact path="/import" component={Import} />
		<Route exact path="/export" component={Export} />
		<Route exact path="/dsd/create" component={Create} />
		<Route exact path="/dsd/:id" component={DSD} />
		<Route exact path="/dsd/:id/update" component={Update} />
	</Switch>
);
