import React from 'react';
import Pagination from 'js/components/shared/pagination';
import D from 'js/i18n';
import { sortArray } from 'js/utils/array-utils';

const sortArrayByLabelFr = sortArray('labelFr');

export default ({ checked, components, onChange }) => {
	const items = sortArrayByLabelFr(
		buildComponents(checked, components, onChange)
	).map(a => a.item);
	return <Pagination itemEls={items} itemsPerPage="2" />;
};

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

const buildComponents = (checked, components, onChange) =>
	Object.keys(components).reduce((_, field) => {
		if (checked[field])
			components[field].forEach(({ URI, labelFr }, i) => {
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
