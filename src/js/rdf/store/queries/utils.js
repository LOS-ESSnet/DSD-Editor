import N3 from 'n3';
import store from 'js/rdf/store';

const { DataFactory } = N3;
const { namedNode, literal } = DataFactory;

export const getLiteralByLang = (URI, predicat, lang, graph) => {
	const array = store.getObjects(
		namedNode(URI),
		namedNode(predicat),
		graph ? namedNode(graph) : null
	);
	const filteredArray = array.filter(a => a.language === lang);
	return filteredArray.length === 0 ? '' : filteredArray[0].value;
};

export const getObject = (URI, predicat, graph) => {
	const array = store.getObjects(
		namedNode(URI),
		namedNode(predicat),
		graph ? namedNode(graph) : null
	);
	return array.length === 0 ? '' : array[0].value;
};

export const isTripleExist = (URI, predicat, object, graph) => {
	const array = store.getQuads(
		namedNode(URI),
		namedNode(predicat),
		namedNode(object),
		graph ? namedNode(graph) : null
	);
	return array.length !== 0;
};

export const hasObjects = (URI, predicat, graph) => {
	const array = store.getObjects(
		namedNode(URI),
		namedNode(predicat),
		graph ? namedNode(graph) : null
	);
	return array.length !== 0;
};

export const getResource = (predicat, lit, graph) =>
	store.getSubjects(
		namedNode(predicat),
		literal(lit),
		graph ? namedNode(graph) : null
	);
