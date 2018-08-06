import React from 'react';
import { shallow } from 'enzyme';
import FileUploader from './file-uploader';

describe('file-uploader', () => {
	it('renders without crashing', () => {
		shallow(
			<FileUploader
				id="id"
				label="label"
				placeholder="placeholder"
				value="value"
				onChange={() => 'onChange'}
			/>
		);
	});
});
