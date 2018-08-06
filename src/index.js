import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'js/components/router';
import { init, importIntoStore } from 'js/rdf/store';
import registerServiceWorker from './registerServiceWorker';

const arrayInit = init();

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
