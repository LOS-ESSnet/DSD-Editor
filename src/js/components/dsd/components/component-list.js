import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import Input from 'js/components/shared/input';
import Pagination from 'js/components/shared/pagination';
import D from 'js/i18n';
import { sortArray, filterDeburr } from 'js/utils/array-utils';

const sortArrayByLabelFr = sortArray('labelFr');

export default class ComponentList extends Component {
	constructor() {
		super();
		this.state = { search: '' };
		this.onChange = search => this.setState({ search });
	}
	render() {
		const { checked, onCheck, components, onChange } = this.props;
		const { search } = this.state;
		console.log(components);
		const items = sortArrayByLabelFr(
			buildComponents(checked, components, onChange, search)
		).map(a => a.item);
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.attributs}
							onChange={() => onCheck('attributs')}
						>
							{D.attributsTitle}
						</Checkbox>
					</div>
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.dimensions}
							onChange={() => onCheck('dimensions')}
						>
							{D.dimensionsTitle}
						</Checkbox>
					</div>
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.measures}
							onChange={() => onCheck('measures')}
						>
							{D.measuresTitle}
						</Checkbox>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1 centered">
						<Input
							value={search}
							onChange={e => this.onChange(e.target.value)}
							placeholder={D.searchLabelPlaceholder}
						/>
						<Pagination itemEls={items} itemsPerPage="10" />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const getPillTitle = field => {
	switch (field) {
		case 'attributs':
			return D.attributTitle;
		case 'dimensions':
			return D.dimensionTitle;
		case 'measures':
			return D.measureTitle;
		default:
			return 'Undefined';
	}
};

const buildComponents = (checked, components, onChange, search) =>
	Object.keys(components).reduce((_, field) => {
		if (checked[field])
			components[field].forEach(({ URI, labelFr }, i) => {
				if (!filterDeburr(search)(labelFr)) return _;
				const type = (
					<span className={`badge badge-pill badge-${field}`}>
						{getPillTitle(field)}
					</span>
				);
				_.push({
					labelFr,
					item: (
						<div className="row" key={`${field}-${i}`}>
							<button
								onClick={() => onChange(URI, type)}
								className="btn-no-btn list-group-item"
							>
								<span>{labelFr}</span> {type}
							</button>
						</div>
					),
				});
			});
		return _;
	}, []);
