export const CONCEPTS_GRAPH = 'http://rdf.insee.fr/graphs/concepts';

const BASE_DSD_GRAPH = 'http://rdf.insee.fr/graphs/dsd/';
export const setDSDGraph = id => `${BASE_DSD_GRAPH}${id}`;

export const BASE_DSD_URI = 'http://id.insee.fr/meta/dsd/';
export const setDSDURI = id => `${BASE_DSD_URI}${id}`;
