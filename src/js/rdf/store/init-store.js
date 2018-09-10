import * as N from 'js/rdf/naming';

const BASE_URL = window.location.origin;

const inputInit = [
  {
    fileURL: `${BASE_URL || process.env.PUBLIC_URL}/concepts.ttl`,
    graph: N.CONCEPTS_GRAPH
  },
  {
    fileURL: `${BASE_URL || process.env.PUBLIC_URL}/codes.ttl`,
    graph: N.CODES_GRAPH
  },
  //{ fileURL || process.env.PUBLIC_URL: `${BASE_URL}/pop5.ttl`, graph: N.setDSDGraph('pop5-2015-comarm') },
  {
    fileURL: `${BASE_URL || process.env.PUBLIC_URL}/my-dsd.ttl`,
    graph: N.setDSDGraph("my-dsd")
  }
];

export const init = () =>
	inputInit.map(({ fileURL, graph }) => ({
		promise: fetch(fileURL),
		graph,
	}));
