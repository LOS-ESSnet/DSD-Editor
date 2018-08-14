import React, { Component } from 'react';
import Button from 'js/components/shared/button';
import Input from 'js/components/shared/input';
import Select from 'js/components/shared/select';
import Radio from 'js/components/shared/radio';
import Controls from './controls';
import D from 'js/i18n';
import { getComponentTypes, getTypes, getAttachements } from 'js/rdf/naming';
import { getCodeLists, getConcepts } from 'js/rdf/store';

const defaultComponent = {
	id: '',
	type: '',
	attachementURI: '',
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
		const { isCoded } = component;
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
					value={getComponentTypes().find(c => c.value === component.type)}
					placeholder={D.componentTypePlaceholder}
					options={getComponentTypes()}
					onChange={e => this.onChange('type', e.value)}
				/>
				{component.type === 'attribute' && (
					<Select
						id="attachementURI"
						label={D.attachementTitle}
						value={getAttachements().find(
							c => c.value === component.attachementURI
						)}
						placeholder={D.attachementPlaceholder}
						options={getAttachements()}
						onChange={e => this.onChange('attachementURI', e.value)}
					/>
				)}
				<Select
					id="concept"
					label={D.conceptTitle}
					value={getConcepts().find(c => c.value === component.conceptURI)}
					placeholder={D.conceptPlaceholder}
					options={getConcepts()}
					onChange={e => this.onChange('conceptURI', e.value)}
				/>
				<Radio
					id="isCoded"
					label={D.isCodedTitle}
					answers={[
						{ value: isCoded, label: D.yes },
						{ value: !isCoded, label: D.no },
					]}
					onChange={() => this.onChange('isCoded', !isCoded)}
				/>
				{isCoded && (
					<Select
						id="codeList"
						label={D.responseTitle}
						value={getCodeLists().find(t => t.value === component.codeListURI)}
						placeholder={D.codeListPlaceholder}
						options={getCodeLists()}
						onChange={e => this.onChange('codeListURI', e.value)}
					/>
				)}
				{!isCoded && (
					<Select
						id="range"
						label={D.rangeTitle}
						value={getTypes().find(t => t.value === component.rangeURI)}
						placeholder={D.rangePlaceholder}
						options={getTypes()}
						onChange={e => this.onChange('rangeURI', e.value)}
					/>
				)}
				<Controls
					component={component}
					deleteAction={this.delete}
					validAction={this.valid}
				/>
			</React.Fragment>
		);
	}
}

export default DetailsEdition;
