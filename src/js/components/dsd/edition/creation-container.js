import React, { Component } from 'react';
import Edition from './edition';
import D from 'js/i18n';
import { writeDSD } from 'js/rdf/store';

class Creation extends Component {
	constructor() {
		super();
		this.save = s => {
			writeDSD(s);
			this.props.history.push(`/dsd/${s.id}`);
		};
	}
	render() {
		return <Edition title={D.createTitle} save={this.save} creation={true} />;
	}
}

export default Creation;
