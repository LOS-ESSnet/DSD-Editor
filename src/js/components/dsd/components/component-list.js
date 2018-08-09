import React, { Component } from 'react';
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
		const { checked, components, onChange } = this.props;
		const { search } = this.state;
		console.log(components);
		const items = sortArrayByLabelFr(
			buildComponents(checked, components, onChange, search)
		).map(a => a.item);
		return (
			<React.Fragment>
				<Input
					value={search}
					onChange={e => this.onChange(e.target.value)}
					placeholder={D.searchLabelPlaceholder}
				/>
				<Pagination itemEls={items} itemsPerPage="10" />
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
