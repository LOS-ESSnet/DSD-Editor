import React from 'react';
import PageTitle from 'js/components/shared/page-title';
import Controls from './controls';
import Panel from 'js/components/shared/panel';
import Components from './components';
import D from 'js/i18n';

export default ({
	dsd: { id, labelFr, labelEn, descriptionFr, descriptionEn },
	components,
}) => (
	<React.Fragment>
		<PageTitle title={labelFr} subtitle={labelEn} />
		<Controls id={id} />
		<div className="row">
			<div className={`col-md-${descriptionEn ? '6' : '12'}`}>
				<Panel title={D.descriptionTitle} body={descriptionFr} lang="fr" />
			</div>
			{descriptionEn && (
				<div className="col-md-6">
					<Panel title={D.descriptionTitle} body={descriptionEn} lang="en" />
				</div>
			)}
		</div>
		<Components components={components} />
	</React.Fragment>
);
