export const CONCEPTS_GRAPH = 'http://rdf.insee.fr/graphs/concepts';
export const CODES_GRAPH = 'http://rdf.insee.fr/graphs/codes';
export const DIMENSIONS_GRAPH = 'http://rdf.insee.fr/graphs/dimensions';
export const MEASURES_GRAPH = 'http://rdf.insee.fr/graphs/measures';
export const ATTRIBUTS_GRAPH = 'http://rdf.insee.fr/graphs/attributs';

const BASE_DSD_GRAPH = 'http://rdf.insee.fr/graphs/dsd/';
export const setDSDGraph = id => `${BASE_DSD_GRAPH}${id}`;

export const BASE_DSD_URI = 'http://id.insee.fr/meta/dsd/';
export const setDSDURI = id => `${BASE_DSD_URI}${id}`;
