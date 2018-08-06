import React from 'react';
import { shallow } from 'enzyme';
import Panel from './panel';

describe('page-title', () => {
	it('renders without crashing', () => {
		shallow(<Panel title="title" body="body" />);
	});
});
