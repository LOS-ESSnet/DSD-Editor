import React, { Component } from 'react';
import PageTitle from 'js/components/shared/page-title';
import Input from 'js/components/shared/input';
import Controls from './controls';
import D from 'js/i18n';
import { dsdEditionMessage } from 'js/utils/edition-utils';

class Edition extends Component {
	constructor(props) {
		super();
		const defaultState = {
			id: '',
			labelFr: '',
			labelEn: '',
			descriptionFr: '',
			descriptionEn: '',
		};
		this.state = Object.assign(defaultState, props.data);
		this.onChange = (field, value) => this.setState({ [field]: value });
		this.save = () => this.props.save(this.state);
	}
	render() {
		const { title, creation } = this.props;
		const { id, labelFr, labelEn, descriptionFr, descriptionEn } = this.state;
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
			</React.Fragment>
		);
	}
}

export default Edition;
