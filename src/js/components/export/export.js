import React, { Component } from 'react';
import PageTitle from 'js/components/shared/page-title';
import Button from 'js/components/shared/button';
import { Checkbox } from 'react-bootstrap';
import D from 'js/i18n';
import { exportFromStore } from 'js/rdf/store';
import { getDSDs } from 'js/rdf/store';

class Export extends Component {
	constructor() {
		super();
		this.state = {
			checked: getDSDs().reduce((_, { id }) => {
				_[id] = false;
				return _;
			}, {}),
		};
		this.export = e => {
			e.preventDefault();
			const { checked } = this.state;
			const toExport = Object.entries(checked).reduce((_, c) => {
				if (c[1]) _.push(c[0]);
				return _;
			}, []);
			toExport.map(e => exportFromStore(e));
			this.props.history.push('/');
		};
		this.check = id => {
			const { checked } = this.state;
			this.setState({ checked: { ...checked, [id]: !checked[id] } });
		};
	}

	render() {
		const { checked } = this.state;
		return (
			<React.Fragment>
				<PageTitle title={D.exportTitle} />
				<div className="row btn-line">
					<Button label={D.btnReturn} action="/" />
					<div className="col-md-8" />
					<Button
						label={D.btnExport}
						action={this.export}
						disabled={Object.values(checked).filter(v => v).length === 0}
					/>
				</div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<ul>
							{getDSDs().map((d, i) => (
								<li key={i} className="list-group-item">
									<Checkbox onChange={() => this.check(d.id)}>
										{d.label}
									</Checkbox>
								</li>
							))}
						</ul>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Export;
