import N3 from 'n3';
import store from 'js/rdf/store';

const { DataFactory } = N3;
const { namedNode, literal } = DataFactory;

export const getLiteral = (URI, predicat, graph) => {
	const array = store.getObjects(
		namedNode(URI),
		namedNode(predicat),
		graph ? namedNode(graph) : null
	);
	return array.length === 0 ? '' : array[0].value;
};

export const getResource = (predicat, lit, graph) =>
	store.getSubjects(
		namedNode(predicat),
		literal(lit),
		graph ? namedNode(graph) : null
	);
