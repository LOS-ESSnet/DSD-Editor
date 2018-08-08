import { getDSDs } from 'js/rdf/store';
import { cleanId } from 'js/utils/string-utils';
import D from 'js/i18n';

export const dsdEditionMessage = (id, labelFr, creation) => {
	let msgId = '',
		msgLabelFr = '';
	if (!id) msgId = D.idEmpty;
	if (!labelFr) msgLabelFr = D.idEmpty;
	if (id || labelFr) {
		const DSDs = getDSDs();
		const ids = DSDs.map(d => {
			if ((!creation && id !== d.id) || creation) return d.id;
			else return null;
		});
		const labels = DSDs.map(d => {
			if ((!creation && labelFr !== d.label) || creation) return d.label;
			else return null;
		});
		if (ids.includes(cleanId(id))) msgId = D.idExisting;
		if (labels.includes(labelFr)) msgLabelFr = D.labelExisting;
	}
	return { id: msgId, labelFr: msgLabelFr };
};
