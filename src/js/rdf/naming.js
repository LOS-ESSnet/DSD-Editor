import { getURI } from 'js/rdf/prefixes';
import D from 'js/i18n';

export const CONCEPTS_GRAPH = 'http://rdf.insee.fr/graphs/concepts';
export const CODES_GRAPH = 'http://rdf.insee.fr/graphs/codes';
export const DIMENSIONS_GRAPH = 'http://rdf.insee.fr/graphs/dimensions';
export const MEASURES_GRAPH = 'http://rdf.insee.fr/graphs/measures';
export const ATTRIBUTS_GRAPH = 'http://rdf.insee.fr/graphs/attributs';

const BASE_DSD_GRAPH = 'http://rdf.insee.fr/graphs/dsd/';
export const setDSDGraph = id => `${BASE_DSD_GRAPH}${id}`;

export const BASE_DSD_URI = 'http://id.insee.fr/meta/dsd/';
export const setDSDURI = id => `${BASE_DSD_URI}${id}`;

const types = [
	{ value: getURI('xsd', 'string'), label: D.stringType },
	{ value: getURI('xsd', 'int'), label: D.intType },
	{ value: getURI('xsd', 'float'), label: D.floatType },
	{ value: getURI('xsd', 'date'), label: D.dateType },
];

export const getTypeLabel = URI => {
	const obj = types.filter(t => t.value === URI);
	return obj.length === 1 ? obj[0].label : 'Unknow type';
};
