import React, { Component } from 'react';
import ComponentList from './component-list';
import ComponentDetail from './component-detail';
import D from 'js/i18n';
import './components.css';

class Components extends Component {
	constructor() {
		super();
		this.state = {
			checked: { attribute: true, dimension: true, measure: true },
			URI: '',
			type: '',
		};
		this.onCheck = field => {
			const { checked } = this.state;
			this.setState({ checked: { ...checked, [field]: !checked[field] } });
		};
		this.changeURI = (URI, type) => this.setState({ URI, type });
	}
	render() {
		const { components } = this.props;
		const { checked, URI, type } = this.state;
		return (
			<div className="components">
				<div className="row centered">
					<h2>{D.componentTitle}</h2>
				</div>
				<div className="row">
					<div className="col-md-6">
						<ComponentList
							checked={checked}
							onCheck={this.onCheck}
							components={components}
							onChange={this.changeURI}
						/>
					</div>
					<div className="col-md-6">
						<ComponentDetail URI={URI} type={type} />
					</div>
				</div>
			</div>
		);
	}
}

export default Components;
