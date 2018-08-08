import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import ComponentList from './component-list';
import ComponentDetail from './component-detail';
import D from 'js/i18n';
import './components.css';

class Components extends Component {
	constructor() {
		super();
		this.state = {
			checked: { attributs: true, dimensions: true, measures: true },
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
		if (
			Object.entries(components).reduce(
				(_, [key, values]) => _ + values.length,
				0
			) === 0
		)
			return null;
		const { checked, URI, type } = this.state;
		return (
			<div className="components">
				<div className="row centered">
					<h2>{D.componentTitle}</h2>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-4 centered">
								<Checkbox
									defaultChecked={checked.attributs}
									onChange={() => this.onCheck('attributs')}
								>
									{D.attributsTitle}
								</Checkbox>
							</div>
							<div className="col-md-4 centered">
								<Checkbox
									defaultChecked={checked.dimensions}
									onChange={() => this.onCheck('dimensions')}
								>
									{D.dimensionsTitle}
								</Checkbox>
							</div>
							<div className="col-md-4 centered">
								<Checkbox
									defaultChecked={checked.measures}
									onChange={() => this.onCheck('measures')}
								>
									{D.measuresTitle}
								</Checkbox>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 col-md-offset-1 centered">
								<ComponentList
									checked={checked}
									components={components}
									onChange={this.changeURI}
								/>
							</div>
						</div>
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
