import N3, { DataFactory } from 'n3';
import FileSaver from 'file-saver';
import store, { getRange } from 'js/rdf/store';
import { PREFIXES } from 'js/rdf/prefixes';
import {
	setDSDURI,
	setDSDGraph,
	getComponentTypePredicat,
} from 'js/rdf/naming';
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
	const {
		id,
		labelFr,
		labelEn,
		descriptionFr,
		descriptionEn,
		components,
	} = DSD;
	const cleanedId = cleanId(id);
	const graph = setDSDGraph(cleanedId);
	const DSDURI = setDSDURI(cleanedId);
	const generalQuads = [
		quad(
			DSDURI,
			getURI('rdf', 'type'),
			getURI('qb', 'DataStructureDefinition'),
			graph
		),
		quad(DSDURI, getURI('dcterms', 'identifier'), literal(cleanedId), graph),
		quad(DSDURI, getURI('rdfs', 'label'), literal(labelFr, 'fr'), graph),
		quad(DSDURI, getURI('rdfs', 'label'), literal(labelEn, 'en'), graph),
		quad(
			DSDURI,
			getURI('dc', 'description'),
			literal(descriptionFr, 'fr'),
			graph
		),
		quad(
			DSDURI,
			getURI('dc', 'description'),
			literal(descriptionEn, 'en'),
			graph
		),
	];
	const quads = components.reduce((_, c) => {
		const blank = store.createBlankNode().id;
		_.push(quad(DSDURI, getURI('qb', 'Component'), blank, graph));
		_.push(
			quad(
				blank,
				getURI('rdf', 'type'),
				getURI('qb', 'ComponentSpecification'),
				graph
			)
		);
		_.push(quad(blank, getURI('qb', c.type), c.URI, graph));
		if (c.attachementURI) {
			_.push(
				quad(
					blank,
					getURI('qb', 'componentAttachment'),
					c.attachementURI,
					graph
				)
			);
		}
		_.push(
			quad(
				c.URI,
				getURI('rdf', 'type'),
				getURI('qb', getComponentTypePredicat(c.type)),
				graph
			)
		);
		if (c.isCoded) {
			_.push(
				quad(c.URI, getURI('rdf', 'type'), getURI('qb', 'CodedProperty'), graph)
			);
			_.push(quad(c.URI, getURI('qb', 'codeList'), c.codeListURI, graph));
			_.push(
				quad(c.URI, getURI('rdfs', 'range'), getRange(c.codeListURI), graph)
			);
		}
		_.push(
			quad(c.URI, getURI('rdfs', 'label'), literal(c.labelFr, 'fr'), graph)
		);
		_.push(
			quad(c.URI, getURI('rdfs', 'label'), literal(c.labelEn, 'en'), graph)
		);
		_.push(quad(c.URI, getURI('dcterms', 'identifier'), literal(c.id), graph));
		if (!c.isCoded) {
			_.push(quad(c.URI, getURI('rdfs', 'range'), c.rangeURI, graph));
		}
		_.push(quad(c.URI, getURI('qb', 'concept'), c.conceptURI, graph));
		return _;
	}, generalQuads);
	store.addQuads(quads);
};

export const deleteFromStore = id =>
	store.removeQuads(store.getQuads(null, null, null, setDSDGraph(id)));
