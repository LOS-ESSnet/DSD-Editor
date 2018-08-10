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
		s => {
			components.push({
				URI: s.value,
				labelFr: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'fr'),
				type,
			});
		},
		null,
		namedNode(getURI('qb', type)),
		setDSDGraph(dsdId)
	);
	return components;
};

const getAttributs = dsdId => buildGetComponents(dsdId, 'attribute');
const getDimensions = dsdId => buildGetComponents(dsdId, 'dimension');
const getMeasures = dsdId => buildGetComponents(dsdId, 'measure');

export const getComponents = dsdId => [
	...getAttributs(dsdId),
	...getDimensions(dsdId),
	...getMeasures(dsdId),
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
					labelFr: getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'fr'),
					labelEn: getLiteralByLang(s.value, getURI('rdfs', 'prefLabel'), 'en'),
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
