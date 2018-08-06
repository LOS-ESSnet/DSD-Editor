import { CONCEPTS_GRAPH, CODES_GRAPH, setDSDGraph } from 'js/rdf/naming';

const BASE_URL = window.location.origin;

const inputInit = [
	{ fileURL: `${BASE_URL}/concepts.ttl`, graph: CONCEPTS_GRAPH },
	{ fileURL: `${BASE_URL}/codes.ttl`, graph: CODES_GRAPH },
	{ fileURL: `${BASE_URL}/dsd-esane.ttl`, graph: setDSDGraph('esane') },
];

export const init = () =>
	inputInit.map(({ fileURL, graph }) => ({
		promise: fetch(fileURL),
		graph,
	}));
