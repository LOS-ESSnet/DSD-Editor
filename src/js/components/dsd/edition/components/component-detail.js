import React, { Component } from 'react';
import Button from 'js/components/shared/button';
import Input from 'js/components/shared/input';
import Select from 'js/components/shared/select';
import D from 'js/i18n';
import { componentTypes } from 'js/rdf/naming';

const defaultComponent = {
	id: '',
	type: '',
	labelFr: '',
	labelEn: '',
	conceptURI: '',
	isCoded: false,
	rangeURI: '',
	codeListURI: '',
};

class DetailsEdition extends Component {
	constructor(props) {
		super();
		this.state = {
			edition: false,
			component: { ...defaultComponent, ...props.component },
		};
		this.new = () =>
			this.setState({ edition: true, component: defaultComponent });
		this.valid = () => {
			this.props.addComponent(this.state.component);
			this.setState({ edition: false });
		};
		this.delete = () => {
			this.props.deleteComponent(this.state.component);
			this.setState({ edition: false });
		};
		this.onChange = (field, value) => {
			const { component } = this.state;
			const newComponent = { ...component, [field]: value };
			this.setState({ component: newComponent });
		};
	}

	componentWillReceiveProps(nextProps) {
		const { component } = nextProps;
		if (component !== this.props.component) {
			if (Object.keys(component).length === 0) {
				this.setState({ edition: false, component: defaultComponent });
			} else {
				this.setState({
					edition: true,
					component: { ...defaultComponent, ...component },
				});
			}
		}
	}

	render() {
		const { edition, component } = this.state;
		if (!edition)
			return (
				<div className="row">
					<div className="col-md-4 col-md-offset-4">
						<Button label={D.btnNew} action={this.new} col={12} />
					</div>
				</div>
			);
		return (
			<React.Fragment>
				<Input
					id="id"
					label={D.idTitle}
					value={component.id}
					onChange={e => this.onChange('id', e.target.value)}
					disabled={this.props.component.id}
				/>
				<Input
					id="labelFr"
					label={D.labelTitle}
					value={component.labelFr}
					onChange={e => this.onChange('labelFr', e.target.value)}
					lang="fr"
				/>
				<Input
					id="labelEn"
					label={D.labelTitle}
					value={component.labelEn}
					onChange={e => this.onChange('labelEn', e.target.value)}
					lang="en"
				/>
				<Select
					id="type"
					label={D.componentTypeTitle}
					value={componentTypes.find(c => c.value === component.type) || {}}
					placeholder={D.componentTypeTitle}
					options={componentTypes}
					onChange={e => this.onChange('type', e.value)}
				/>
				<div className="row">
					<div className="col-md-4 col-md-offset-1">
						<Button label={D.btnDelete} action={this.delete} col={12} />
					</div>
					<div className="col-md-4 col-md-offset-2">
						<Button label={D.btnValid} action={this.valid} col={12} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DetailsEdition;
