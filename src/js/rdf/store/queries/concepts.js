import store from 'js/rdf/store';
import { getLiteralByLang } from 'js/rdf/store';
import { getURI } from 'js/rdf/prefixes';
import { sortArray } from 'js/utils/array-utils';
import { CONCEPTS_GRAPH } from 'js/rdf/naming';

const sortArrayByLabel = sortArray('label');

export const getConcepts = () => {
	let conceptList = [];
	store.forSubjects(
		s => {
			conceptList.push({
				URI: s.value,
				labelFr:
					getLiteralByLang(s.value, getURI('rdfs', 'label'), 'fr') ||
					getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'fr'),
				labelEn:
					getLiteralByLang(s.value, getURI('rdfs', 'label'), 'en') ||
					getLiteralByLang(s.value, getURI('skos', 'prefLabel'), 'en'),
			});
		},
		null,
		getURI('skos', 'Concept'),
		CONCEPTS_GRAPH
	);
	return sortArrayByLabel(
		conceptList.map(({ URI, labelFr, labelEn }) => ({
			value: URI,
			label: labelFr ? labelFr : labelEn,
		}))
	);
};
