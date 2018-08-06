import React from 'react';
import { shallow } from 'enzyme';
import TextArea from './text-area';

describe('text-area', () => {
	it('renders without crashing', () => {
		shallow(
			<TextArea
				id="id"
				label="label"
				placeholder="placeholder"
				value="value"
				onChange={() => 'onChange'}
			/>
		);
	});
});
