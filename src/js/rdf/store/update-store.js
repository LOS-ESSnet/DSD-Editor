import N3, { DataFactory } from 'n3';
import FileSaver from 'file-saver';
import store from 'js/rdf/store';
import { PREFIXES } from 'js/rdf/prefixes';
import { setDSDURI, setDSDGraph } from 'js/rdf/naming';
import { getURI } from 'js/rdf/prefixes';
import { cleanId } from 'js/utils/string-utils';

const { literal, quad } = DataFactory;

export const importIntoStore = (rdfString, graph) => {
	if (!rdfString) console.log(`Graph ${graph} note created : empty input`);
	else {
		const parser = new N3.Parser();
		return new Promise(resolve => {
			parser.parse(rdfString, (e, quad, a) => {
				if (quad)
					graph ? store.addQuad({ ...quad, graph }) : store.addQuad(quad);
				else resolve(store);
			});
		});
	}
};

export const exportFromStore = id => {
	const writer = N3.Writer({ prefixes: PREFIXES });
	store
		.getQuads(null, null, null, id ? setDSDGraph(id) : null)
		.map(q => writer.addQuad(q));
	writer.end((error, result) => {
		FileSaver.saveAs(new Blob([result]), `${id ? id : 'export'}.trig`);
	});
};

export const writeDSD = DSD => {
	const { id, label, description } = DSD;
	const cleanedId = cleanId(id);
	const graph = setDSDGraph(cleanedId);
	const DSDURI = setDSDURI(cleanedId);
	const quads = [
		quad(
			DSDURI,
			getURI('rdf', 'type'),
			getURI('qb', 'DataStructureDefinition'),
			graph
		),
		quad(DSDURI, getURI('dcterms', 'identifier'), literal(cleanedId), graph),
		quad(DSDURI, getURI('skos', 'prefLabel'), literal(label), graph),
		quad(DSDURI, getURI('dc', 'description'), literal(description), graph),
	];
	store.addQuads(quads);
};

export const deleteFromStore = id =>
	store.removeQuads(store.getQuads(null, null, null, setDSDGraph(id)));
