export const PREFIXES = {
	rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
	rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	owl: 'http://www.w3.org/2002/07/owl#',
	skos: 'http://www.w3.org/2004/02/skos/core#',
	xsd: 'http://www.w3.org/2001/XMLSchema#',
	dcterms: 'http://purl.org/dc/terms/',
	dc: 'http://purl.org/dc/elements/1.1/',
	qb: 'http://purl.org/linked-data/cube#',
	sdmx: 'http://purl.org/linked-data/sdmx#',
	'sdmx-concept': 'http://purl.org/linked-data/sdmx/2009/concept#',
};

export const getURI = (NS, res) => `${PREFIXES[NS] || ''}${res}`;
