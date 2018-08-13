import React, { Component } from 'react';
import ComponentList from 'js/components/dsd/components/component-list';
import ComponentDetail from './component-detail';
import D from 'js/i18n';

class Components extends Component {
	constructor(props) {
		super();
		this.state = {
			checked: { attribute: true, dimension: true, measure: true },
			URI: '',
		};
		this.onCheck = field => {
			const { checked } = this.state;
			this.setState({ checked: { ...checked, [field]: !checked[field] } });
		};
		this.changeURI = URI => {
			this.setState({ URI });
		};
	}
	render() {
		const { components } = this.props;
		const { checked, URI } = this.state;
		const component = components.find(c => c.URI === URI) || {};
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
						<ComponentDetail
							component={component}
							addComponent={this.props.addComponent}
							deleteComponent={this.props.deleteComponent}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Components;
