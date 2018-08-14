import React from 'react';
import Button from 'js/components/shared/button';
import D from 'js/i18n';

export default ({ component, deleteAction, validAction }) => {
	return (
		<div className="row">
			<div className="col-md-4 col-md-offset-1">
				<Button label={D.btnDelete} action={deleteAction} col={12} />
			</div>
			<div className="col-md-4 col-md-offset-2">
				<Button label={D.btnValid} action={validAction} col={12} />
			</div>
		</div>
	);
};
