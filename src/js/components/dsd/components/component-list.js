import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import Input from 'js/components/shared/input';
import Pagination from 'js/components/shared/pagination';
import Badge from 'js/components/shared/badge';
import D from 'js/i18n';
import { sortArray, filterDeburr } from 'js/utils/array-utils';

const sortArrayByLabelFr = sortArray('labelFr');

export default class ComponentList extends Component {
	constructor() {
		super();
		this.state = { search: '' };
		this.onChangeSearch = search => this.setState({ search });
	}
	render() {
		const { checked, onCheck, components, onChange } = this.props;
		const { search } = this.state;
		const items = buildComponents(
			checked,
			sortArrayByLabelFr(components),
			onChange,
			search
		);

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.attribute}
							onChange={() => onCheck('attribute')}
						>
							{D.attributsTitle}
						</Checkbox>
					</div>
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.dimension}
							onChange={() => onCheck('dimension')}
						>
							{D.dimensionsTitle}
						</Checkbox>
					</div>
					<div className="col-md-4 centered">
						<Checkbox
							defaultChecked={checked.measure}
							onChange={() => onCheck('measure')}
						>
							{D.measuresTitle}
						</Checkbox>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1 centered">
						<Input
							value={search}
							onChange={e => this.onChangeSearch(e.target.value)}
							placeholder={D.searchLabelPlaceholder}
						/>
						<Pagination itemEls={items} itemsPerPage="10" />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const buildComponents = (checked, components, onChange, search) =>
	components.reduce((_, component, i) => {
		const { URI, labelFr, type } = component;
		if (checked[type] && filterDeburr(search)(labelFr)) {
			_.push(
				<div className="row" key={`${type}-${i}`}>
					<button
						onClick={() => onChange(URI, type)}
						className="btn-no-btn list-group-item"
					>
						<span>{labelFr}</span> <Badge type={type} />
					</button>
				</div>
			);
		}
		return _;
	}, []);
