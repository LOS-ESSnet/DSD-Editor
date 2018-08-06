import { DataFactory } from 'n3';
import store from 'js/rdf/store';
import { getURI } from 'js/rdf/prefixes';
import { getLiteral } from 'js/rdf/store';
import { setDSDURI, setDSDGraph } from 'js/rdf/naming';

const { namedNode } = DataFactory;

export const getDSDs = () => {
	let DSDs = [];
	store.forSubjects(
		s =>
			DSDs.push({
				id: getLiteral(s.value, getURI('dcterms', 'identifier')),
				label: getLiteral(s.value, getURI('skos', 'prefLabel')),
			}),
		null,
		namedNode(getURI('qb', 'DataStructureDefinition'))
	);
	return DSDs;
};

export const getDSD = dsdId => ({
	id: dsdId,
	description: getLiteral(
		setDSDURI(dsdId),
		getURI('dc', 'description'),
		setDSDGraph(dsdId)
	),
	label: getLiteral(
		setDSDURI(dsdId),
		getURI('skos', 'prefLabel'),
		setDSDGraph(dsdId)
	),
});

export const getDSDComponents = dsdId => [];
