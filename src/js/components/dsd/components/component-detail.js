import React from 'react';
import PageTitle from 'js/components/shared/page-title';
import { getComponent } from 'js/rdf/store';
import D from 'js/i18n';
import flag from 'js/components/shared/flag';
import './components.css';

export default ({ URI, type }) => {
	const { labelFr, labelEn, concept, isCoded, range, codeList } = getComponent(
		URI
	);
	if (!URI)
		return <h3 className="centered empty-component">{D.emptyComponent}</h3>;
	return (
		<div>
			<PageTitle title={labelFr} subtitle={labelEn} col={12} offset={0} />
			<div className="centered">{type}</div>
			<ul>
				<li>
					{D.conceptTitle} :{' '}
					<ul>
						<li>
							{flag('fr')} : {concept.labelFr}
						</li>
						<li>
							{flag('en')} : {concept.labelEn}
						</li>
					</ul>
				</li>
				{!isCoded && (
					<li>
						{D.rangeTitle} : {range.label}
					</li>
				)}
				{isCoded && (
					<React.Fragment>
						<li>
							{D.rangeTitle} :{' '}
							<ul>
								<li>
									{flag('fr')} : {range.labelFr}
								</li>
								<li>
									{flag('en')} : {range.labelEn}
								</li>
							</ul>
						</li>
						<li>
							{D.codeListTitle} :{' '}
							<ul>
								<li>
									{flag('fr')} : {codeList.labelFr}
								</li>
								<li>
									{flag('en')} : {codeList.labelEn}
								</li>
							</ul>
						</li>
					</React.Fragment>
				)}
			</ul>
		</div>
	);
};
