import { getURI } from 'js/rdf/prefixes';
import { sortArray } from 'js/utils/array-utils';
import D from 'js/i18n';

export const CONCEPTS_GRAPH = 'http://rdf.insee.fr/graphs/concepts';
export const CODES_GRAPH = 'http://rdf.insee.fr/graphs/codes';

const BASE_DSD_GRAPH = 'http://rdf.insee.fr/graphs/dsd/';
export const setDSDGraph = id => `${BASE_DSD_GRAPH}${id}`;

export const BASE_DSD_URI = 'http://id.insee.fr/meta/dsd/';
export const setDSDURI = id => `${BASE_DSD_URI}${id}`;

export const BASE_COMPONENT_URI = 'http://id.insee.fr/meta/';
export const setComponentURI = (id, type) => `${BASE_DSD_URI}${type}/${id}`;

const types = [
	{ value: getURI('xsd', 'string'), label: D.stringType },
	{ value: getURI('xsd', 'int'), label: D.intType },
	{ value: getURI('xsd', 'float'), label: D.floatType },
	{ value: getURI('xsd', 'date'), label: D.dateType },
];

export const getTypes = () => sortArray('label')(types);

export const getTypeLabel = URI => {
	const obj = types.filter(t => t.value === URI);
	return obj.length === 1 ? obj[0].label : 'Unknow type';
};

const componentTypes = [
	{ value: 'attribute', predicat: 'AttributeProperty', label: D.attributTitle },
	{
		value: 'dimension',
		predicat: 'DimensionProperty',
		label: D.dimensionTitle,
	},
	{ value: 'measure', predicat: 'MeasureProperty', label: D.measureTitle },
];

export const getComponentTypes = () => sortArray('label')(componentTypes);

export const getComponentTypeLabel = componentType => {
	const obj = componentTypes.filter(t => t.value === componentType);
	return obj.length === 1 ? obj[0].label : 'Unknow component';
};

export const getComponentTypePredicat = componentType => {
	const obj = componentTypes.filter(t => t.value === componentType);
	return obj.length === 1 ? obj[0].predicat : '';
};

const attachements = [
	{ value: getURI('qb', 'DataSet'), label: 'DataSet' },
	{ value: getURI('qb', 'Slice'), label: 'Slice' },
	{ value: getURI('qb', 'Observation'), label: 'Observation' },
];

export const getAttachements = () => sortArray('label')(attachements);

export const getAttachementLabel = attachementURI => {
	const obj = attachements.filter(t => t.value === attachementURI);
	return obj.length === 1 ? obj[0].label : 'Unknow';
};
