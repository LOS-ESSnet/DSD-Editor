import React, { Component } from 'react';
import PageTitle from 'js/components/shared/page-title';
import Input from 'js/components/shared/input';
import Controls from './controls';
import Components from './components';
import D from 'js/i18n';
import { dsdEditionMessage } from 'js/utils/edition-utils';
import { setComponentURI } from 'js/rdf/naming';
import { cleanId } from 'js/utils/string-utils';

class Edition extends Component {
	constructor(props) {
		super();
		const defaultState = {
			URI: '',
			id: '',
			labelFr: '',
			labelEn: '',
			descriptionFr: '',
			descriptionEn: '',
			components: [],
		};
		this.state = { ...defaultState, ...props.data };
		this.onChange = (field, value) =>
			field === 'id'
				? this.setState({ [field]: cleanId(value) })
				: this.setState({ [field]: value });
		this.changeURI = URI => {
			this.setState({ URI });
		};
		this.addComponent = component => {
			const { components } = this.state;
			const { type, id, ...newComponent } = component;
			const URI = setComponentURI(id, type);
			const c = components.filter(c => c.id !== id);
			c.push({
				...newComponent,
				URI,
				type,
				id,
			});
			this.setState({ URI: '', components: c });
		};
		this.deleteComponent = component => {
			const { components } = this.state;
			const { type, id } = component;
			if (!type || !id) this.setState({ URI: '' });
			this.setState({
				URI: '',
				components: components.filter(c => c.id !== id),
			});
		};
		this.save = () => this.props.save(this.state);
	}
	render() {
		const { title, creation } = this.props;
		const {
			URI,
			id,
			labelFr,
			labelEn,
			descriptionFr,
			descriptionEn,
			components,
		} = this.state;
		const helpMsgObj = dsdEditionMessage(id, labelFr, creation);
		return (
			<React.Fragment>
				<PageTitle title={title} />
				<Controls
					creation={creation}
					id={id}
					save={this.save}
					helpMsgObj={helpMsgObj}
				/>
				<Input
					id="id"
					label={D.idTitle}
					value={id}
					onChange={e => this.onChange('id', e.target.value)}
					disabled={!creation}
					helpMsg={helpMsgObj.id}
				/>
				<div className="row">
					<div className="col-md-6">
						<Input
							id="labelFr"
							label={D.labelTitle}
							value={labelFr}
							onChange={e => this.onChange('labelFr', e.target.value)}
							lang="fr"
							helpMsg={helpMsgObj.labelFr}
						/>
					</div>
					<div className="col-md-6">
						<Input
							id="labelEn"
							label={D.labelTitle}
							value={labelEn}
							onChange={e => this.onChange('labelEn', e.target.value)}
							lang="en"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Input
							id="descriptionFr"
							label={D.descriptionTitle}
							value={descriptionFr}
							onChange={e => this.onChange('descriptionFr', e.target.value)}
							lang="fr"
						/>
					</div>
					<div className="col-md-6">
						<Input
							id="descriptionEn"
							label={D.descriptionTitle}
							value={descriptionEn}
							onChange={e => this.onChange('descriptionEn', e.target.value)}
							lang="en"
						/>
					</div>
				</div>
				<Components
					components={components}
					addComponent={this.addComponent}
					deleteComponent={this.deleteComponent}
					URI={URI}
					changeURI={this.changeURI}
				/>
			</React.Fragment>
		);
	}
}

export default Edition;
