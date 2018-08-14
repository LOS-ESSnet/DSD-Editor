import { DataFactory } from 'n3';
import store from 'js/rdf/store';
import { getURI } from 'js/rdf/prefixes';
import { getLiteralByLang, isTripleExist, getObject } from 'js/rdf/store';
import { getTypeLabel } from 'js/rdf/naming';
import { setDSDGraph } from 'js/rdf/naming';

const { namedNode } = DataFactory;

const buildGetComponents = (dsdId, type) => {
	let components = [];
	store.forObjects(
		c => {
			components.push({
				URI: c.value,
				labelFr: getLiteralByLang(c.value, getURI('rdfs', 'label'), 'fr'),
				type,
			});
		},
		null,
		namedNode(getURI('qb', type)),
		setDSDGraph(dsdId)
	);
	return components;
};

export const getComponents = dsdId => [
	...buildGetComponents(dsdId, 'attribute'),
	...buildGetComponents(dsdId, 'dimension'),
	...buildGetComponents(dsdId, 'measure'),
];

const buildGetDetailedComponents = (dsdId, type) => {
	let components = [];
	store.forObjects(
		c => {
			components.push({
				URI: c.value,
				type,
				id: getObject(c.value, getURI('dc', 'identifier')),
				labelFr: getLiteralByLang(c.value, getURI('rdfs', 'label'), 'fr'),
				labelEn: getLiteralByLang(c.value, getURI('rdfs', 'label'), 'en'),
				conceptURI: getComponentConcept(c.value).URI,
				isCoded: isTripleExist(
					c.value,
					getURI('rdf', 'type'),
					getURI('qb', 'CodedProperty')
				),
				rangeURI: getComponentRange(c.value).URI,
				codeListURI: getComponentCodeList(c.value).URI,
			});
		},
		null,
		namedNode(getURI('qb', type)),
		setDSDGraph(dsdId)
	);
	return components;
};

export const getDetailedComponents = dsdId => [
	...buildGetDetailedComponents(dsdId, 'attribute'),
	...buildGetDetailedComponents(dsdId, 'dimension'),
	...buildGetDetailedComponents(dsdId, 'measure'),
];

export const getComponent = componentURI => ({
	labelFr: getLiteralByLang(componentURI, getURI('rdfs', 'label'), 'fr'),
	labelEn: getLiteralByLang(componentURI, getURI('rdfs', 'label'), 'en'),
	concept: getComponentConcept(componentURI),
	isCoded: isTripleExist(
		componentURI,
		getURI('rdf', 'type'),
		getURI('qb', 'CodedProperty')
	),
	range: getComponentRange(componentURI),
	codeList: getComponentCodeList(componentURI),
});

const getComponentConcept = componentURI => {
	let concept = { URI: '', labelFr: '', labelEn: '' };
	store.forObjects(
		s => {
			concept = {
				URI: s.value,
				labelFr: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'fr'),
				labelEn: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'en'),
			};
		},
		componentURI,
		namedNode(getURI('qb', 'concept'))
	);
	return concept;
};

const getComponentRange = componentURI => {
	let range = { URI: '', labelFr: '', labelEn: '' };
	const isCoded = isTripleExist(
		componentURI,
		getURI('rdf', 'type'),
		getURI('qb', 'CodedProperty')
	);
	if (!isCoded) {
		const rangeType = getObject(componentURI, getURI('rdfs', 'range'));
		range = { URI: rangeType, label: getTypeLabel(rangeType) };
	} else {
		store.forObjects(
			s => {
				range = {
					URI: s.value,
					labelFr: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'fr'),
					labelEn: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'en'),
				};
			},
			componentURI,
			namedNode(getURI('rdfs', 'range'))
		);
	}
	return range;
};

const getComponentCodeList = componentURI => {
	let codeList = { URI: '', labelFr: '', labelEn: '' };
	store.forObjects(
		s => {
			codeList = {
				URI: s.value,
				labelFr: getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'fr'),
				labelEn: getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'en'),
			};
		},
		componentURI,
		namedNode(getURI('qb', 'codeList'))
	);
	return codeList;
};
