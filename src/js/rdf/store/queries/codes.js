import store from 'js/rdf/store';
import { getLiteralByLang, getObject } from 'js/rdf/store';
import { getURI } from 'js/rdf/prefixes';
import { sortArray } from 'js/utils/array-utils';

const sortArrayByLabel = sortArray('label');

export const getCodeLists = () => {
	let codeList = [];
	store.forSubjects(
		s => {
			codeList.push({
				URI: s.value,
				labelFr: getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'fr'),
				labelEn: getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'en'),
			});
		},
		null,
		getURI('skos', 'ConceptScheme')
	);
	return sortArrayByLabel(
		codeList.map(({ URI, labelFr, labelEn }) => ({
			value: URI,
			label: labelFr ? labelFr : labelEn,
		}))
	);
};

export const getRange = codeListURI =>
	getObject(codeListURI, getURI('rdfs', 'seeAlso'));
