import React, { Component } from 'react';
import PageTitle from 'js/components/shared/page-title';
import Input from 'js/components/shared/input';
import Controls from './controls';
import D from 'js/i18n';

class Edition extends Component {
	constructor(props) {
		super();
		const defaultState = { id: '', label: '', description: '' };
		this.state = Object.assign(defaultState, props.data);
		this.onChange = (field, value) => this.setState({ [field]: value });
		this.save = () => this.props.save(this.state);
	}
	render() {
		const { title, creation } = this.props;
		const { id, label, description } = this.state;
		return (
			<React.Fragment>
				<PageTitle title={title} />
				<Controls creation={creation} dsd={this.state} save={this.save} />
				<Input
					id="id"
					label={D.idTitle}
					value={id}
					onChange={e => this.onChange('id', e.target.value)}
					disabled={!creation}
				/>
				<Input
					id="label"
					label={D.labelTitle}
					value={label}
					onChange={e => this.onChange('label', e.target.value)}
				/>
				<Input
					id="description"
					label={D.descriptionTitle}
					value={description}
					onChange={e => this.onChange('description', e.target.value)}
				/>
			</React.Fragment>
		);
	}
}

export default Edition;
