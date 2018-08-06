import React from 'react';
import PageTitle from 'js/components/shared/page-title';
import Controls from './controls';
import Panel from 'js/components/shared/panel';
import D from 'js/i18n';

export default ({ dsd: { id, label, description }, components }) => (
	<React.Fragment>
		<PageTitle title={label} />
		<Controls id={id} />
		<Panel title={D.descriptionTitle} body={description} />
	</React.Fragment>
);
