import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'js/components/shared/button';
import D from 'js/i18n';
import { getDSDs } from 'js/rdf/store';
import './app.css';

export default () => {
	const DSDs = getDSDs();
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3 btn-group-vertical">
					<div className="row">
						<Button label={D.btnNew} action="dsd/create" col={8} offset={2} />
					</div>
					<div className="row">
						<Button label={D.btnImport} action="/import" col={8} offset={2} />
					</div>
					<div className="row">
						<Button
							label={D.btnExport}
							action="/export"
							col={8}
							offset={2}
							disabled={DSDs.length === 0}
						/>
					</div>
				</div>
				<div className="col-md-7 col-md-offset-1 list-group">
					<div className="row">
						<ul>
							{DSDs.map((d, i) => (
								<li key={i} className="list-group-item">
									<Link to={`/dsd/${d.id}`}>{d.label}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
