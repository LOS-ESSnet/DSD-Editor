import React from 'react';
import Button from 'js/components/shared/button';
import D from 'js/i18n';
import { cleanId } from 'js/utils/string-utils';

const check = dsd =>
	Object.values(dsd).reduce((_, v) => {
		if (_ && v) return true;
		return false;
	}, true);

export default ({ creation, save, dsd }) => (
	<div className="row btn-line">
		<Button
			label={D.btnReturn}
			action={creation ? '/' : `/dsd/${cleanId(dsd.id)}`}
		/>
		<div className="col-md-8" />
		<Button label={D.btnSave} action={save} disabled={!check(dsd)} />
	</div>
);
