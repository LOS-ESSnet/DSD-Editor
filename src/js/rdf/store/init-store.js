import * as N from 'js/rdf/naming';

const BASE_URL = window.location.origin;

const inputInit = [
	{ fileURL: `${BASE_URL}/concepts.ttl`, graph: N.CONCEPTS_GRAPH },
	{ fileURL: `${BASE_URL}/codes.ttl`, graph: N.CODES_GRAPH },
	{ fileURL: `${BASE_URL}/dimensions.ttl`, graph: N.DIMENSIONS_GRAPH },
	{ fileURL: `${BASE_URL}/measures.ttl`, graph: N.MEASURES_GRAPH },
	{ fileURL: `${BASE_URL}/attributs.ttl`, graph: N.ATTRIBUTS_GRAPH },
	{ fileURL: `${BASE_URL}/dsd-esane.ttl`, graph: N.setDSDGraph('esane') },
];

export const init = () =>
	inputInit.map(({ fileURL, graph }) => ({
		promise: fetch(fileURL),
		graph,
	}));
