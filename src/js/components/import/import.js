import React, { Component } from 'react';
import PageTitle from 'js/components/shared/page-title';
import Select from 'js/components/shared/select';
import Input from 'js/components/shared/input';
import TextArea from 'js/components/shared/text-area';
import Button from 'js/components/shared/button';
import D from 'js/i18n';
import { importIntoStore } from 'js/rdf/store';
import fileTypes from 'js/utils/import-file-types';
import { setDSDGraph } from 'js/rdf/naming';

class Import extends Component {
	constructor() {
		super();
		this.state = { type: '', typeObj: '', content: '', graph: '' };
		this.upload = e => {};
		this.onSelect = e => this.setState({ type: e.value, typeObj: e });
		this.onChangeGraph = e => this.setState({ graph: e.target.value });
		this.onChangeArea = e => this.setState({ content: e.target.value });
		this.goBack = e => {
			e.preventDefault();
			this.props.history.push('/');
		};
		this.import = e => {
			e.preventDefault();
			const { content, type, graph } = this.state;
			importIntoStore(
				content,
				type === 'ttl' ? setDSDGraph(graph) : undefined
			).then(() => this.props.history.push('/'));
		};
	}
	render() {
		const { content, typeObj, type, graph } = this.state;
		return (
			<React.Fragment>
				<PageTitle title={D.importTitle} />
				<div className="row btn-line">
					<Button label={D.btnReturn} action={this.goBack} />
				</div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<Select
							value={typeObj}
							placeholder={D.selectFilesPlaceholder}
							options={fileTypes}
							onChange={this.onSelect}
						/>
					</div>
				</div>
				{type === 'ttl' && (
					<Input
						id="graph"
						label="Graph"
						addOn={setDSDGraph('')}
						value={graph}
						onChange={this.onChangeGraph}
					/>
				)}
				{type && (
					<TextArea
						id="text-area"
						placeholder={D.importPlaceholder}
						value={content}
						onChange={this.onChangeArea}
					/>
				)}
				{typeObj && (
					<Button
						label={D.btnImport}
						action={this.import}
						offset={5}
						disabled={
							(type === 'trig' && !content) ||
							(type === 'ttl' && (!graph || !content))
						}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default Import;
