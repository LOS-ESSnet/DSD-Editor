import React from 'react';
import Button from 'js/components/shared/button';
import D from 'js/i18n';
import { cleanId } from 'js/utils/string-utils';

const check = obj =>
	Object.values(obj).reduce((_, v) => _ + v, '').length !== 0;

export default ({ creation, id, save, helpMsgObj }) => (
	<div className="row btn-line">
		<Button
			label={D.btnReturn}
			action={creation ? '/' : `/dsd/${cleanId(id)}`}
		/>
		<div className="col-md-8" />
		<Button label={D.btnSave} action={save} disabled={check(helpMsgObj)} />
	</div>
);
