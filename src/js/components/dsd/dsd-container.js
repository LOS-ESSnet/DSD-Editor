import React from 'react';
import DSD from './dsd';
import buildExtract from 'js/utils/build-extract';
import { getDSD, getDSDComponents } from 'js/rdf/store';

export default props => {
	const dsdId = buildExtract('id')(props);
	const dsd = getDSD(dsdId);
	const components = getDSDComponents(dsdId);
	return <DSD dsd={dsd} components={components} />;
};
