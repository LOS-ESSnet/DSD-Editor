import React from 'react';
import DSD from './dsd';
import buildExtract from 'js/utils/build-extract';
import { getDSD, getComponents } from 'js/rdf/store';

export default props => {
	const dsdId = buildExtract('id')(props);
	const dsd = getDSD(dsdId);
	const components = getComponents(dsdId);
	return <DSD dsd={dsd} components={components} />;
};
