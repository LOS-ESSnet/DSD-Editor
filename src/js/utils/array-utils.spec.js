import * as A from './array-utils';

describe('array utils', () => {
	describe('sortArray', () => {
		it('should return a same length array', () => {
			const array = [{ id: '2', label: 'B' }, { id: '1', label: 'A' }];
			expect(A.sortArray('id')(array)).toHaveLength(array.length);
		});

		it('should return a sorted array', () => {
			const array = [{ id: '2', label: 'B' }, { id: '1', label: 'A' }];
			const res = [{ id: '1', label: 'A' }, { id: '2', label: 'B' }];
			expect(A.sortArray('id')(array)).toEqual(res);
		});
	});

	describe('filterDeburr', () => {
		it('should return true ', () => {
			expect(A.filterDeburr('AA')('aa')).toBeTruthy();
			expect(A.filterDeburr('Eé')('eEeEe')).toBeTruthy();
		});
		it('should return false ', () => {
			expect(A.filterDeburr('A')('e')).toBeFalsy();
			expect(A.filterDeburr('Eé')('é')).toBeFalsy();
		});
	});
});
