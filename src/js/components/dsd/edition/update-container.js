import React, { Component } from 'react';
import Edition from './edition';
import buildExtract from 'js/utils/build-extract';
import D from 'js/i18n';
import { getDSD } from 'js/rdf/store';
import { writeDSD, deleteFromStore } from 'js/rdf/store';

class Update extends Component {
	constructor(props) {
		super();
		this.save = s => {
			deleteFromStore(s.id);
			writeDSD(s);
			this.props.history.push(`/dsd/${s.id}`);
		};
	}
	render() {
		const id = buildExtract('id')(this.props);
		return (
			<Edition
				data={getDSD(id)}
				title={`${D.updateTitle} " ${getDSD(id).labelFr} "`}
				save={this.save}
			/>
		);
	}
}

export default Update;
