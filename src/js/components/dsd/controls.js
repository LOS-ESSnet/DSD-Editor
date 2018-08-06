import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'js/components/shared/button';
import D from 'js/i18n';
import { exportFromStore, deleteFromStore } from 'js/rdf/store';

class Controls extends Component {
	constructor() {
		super();
		this.export = () => {
			exportFromStore(this.props.id);
		};
		this.delete = () => {
			deleteFromStore(this.props.id);
			this.props.history.push('/');
		};
	}
	render() {
		const { id } = this.props;
		return (
			<div className="row btn-line">
				<Button label={D.btnReturn} action="/" />
				<div className="col-md-4" />
				<Button label={D.btnExport} action={this.export} />
				<Button label={D.btnUpdate} action={`/dsd/${id}/update`} />
				<Button label={D.btnDelete} action={this.delete} />
			</div>
		);
	}
}

export default withRouter(Controls);
