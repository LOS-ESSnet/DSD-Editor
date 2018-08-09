import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'js/components/router';
import Spiner from 'js/components/shared/spinner';
import D from 'js/i18n';
import { init, importIntoStore } from 'js/rdf/store';
import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill';

const arrayInit = init();
ReactDOM.render(<Spiner text={D.initApp} />, document.getElementById('root'));

Promise.all(init().map(i => i.promise))
	.then(responses => Promise.all(responses.map(r => r.text())))
	.then(contents => {
		const array = contents.map((r, i) => ({
			content: r,
			graph: arrayInit[i].graph,
		}));
		return renderApp(array);
	});

const renderApp = array => {
	Promise.all(
		array.map(({ content, graph }) => {
			if (content) {
				return importIntoStore(content, graph);
			}
			return null;
		})
	).then(() => ReactDOM.render(<Root />, document.getElementById('root')));
};

registerServiceWorker();
