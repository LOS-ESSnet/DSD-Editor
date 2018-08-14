import { DataFactory } from 'n3';
import store from 'js/rdf/store';
import { getURI } from 'js/rdf/prefixes';
import {
	getObject,
	getLiteralByLang,
	getDetailedComponents,
} from 'js/rdf/store';
import { setDSDURI, setDSDGraph } from 'js/rdf/naming';

const { namedNode } = DataFactory;

export const getDSDs = () => {
	let DSDs = [];
	store.forSubjects(
		s =>
			DSDs.push({
				id: getObject(s.value, getURI('dcterms', 'identifier')),
				label: getLiteralByLang(s.value, getURI('rdfs', 'label'), 'fr'),
			}),
		null,
		namedNode(getURI('qb', 'DataStructureDefinition'))
	);
	return DSDs;
};

export const getDSD = dsdId => ({
	id: getObject(
		setDSDURI(dsdId),
		getURI('dcterms', 'identifier'),
		setDSDGraph(dsdId)
	),
	descriptionFr: getLiteralByLang(
		setDSDURI(dsdId),
		getURI('dc', 'description'),
		'fr',
		setDSDGraph(dsdId)
	),
	descriptionEn: getLiteralByLang(
		setDSDURI(dsdId),
		getURI('dc', 'description'),
		'en',
		setDSDGraph(dsdId)
	),
	labelFr: getLiteralByLang(
		setDSDURI(dsdId),
		getURI('rdfs', 'label'),
		'fr',
		setDSDGraph(dsdId)
	),
	labelEn: getLiteralByLang(
		setDSDURI(dsdId),
		getURI('rdfs', 'label'),
		'en',
		setDSDGraph(dsdId)
	),
	components: getDetailedComponents(dsdId),
});
