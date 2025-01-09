import {valueTypeLabel} from '../../../src/value/type/label';

describe('valueTypeLabel', () => {
	describe('null & undefined input', () => {
		it(`should return 'null' when value is null`, () => {
			expect(valueTypeLabel(null)).toBe('null');
		});

		it(`should return 'undefined' when value is undefined`, () => {
			expect(valueTypeLabel(undefined)).toBe('undefined');
		});
	});

	describe('string input', () => {
		it(`should return 'string' when value is a truthy string`, () => {
			expect(valueTypeLabel('aaaaaaa')).toBe('string');
		});

		it(`should return 'string' when value is an empty string`, () => {
			expect(valueTypeLabel('')).toBe('string');
		});

		it(`should return 'string' when value is a single character string`, () => {
			expect(valueTypeLabel('4')).toBe('string');
		});
	});

	describe('number input', () => {
		it(`should return 'number' when value is number literal 0`, () => {
			expect(valueTypeLabel(0)).toBe('number');
		});

		it(`should return 'number' when value is number literal -0`, () => {
			expect(valueTypeLabel(-0)).toBe('number');
		});

		it(`should return 'number' when value is number literal 1`, () => {
			expect(valueTypeLabel(1)).toBe('number');
		});

		it(`should return 'number' when value is negative integer number literal -1`, () => {
			expect(valueTypeLabel(-1)).toBe('number');
		});

		it(`should return 'number' when value is negative non-integer number literal -1.3`, () => {
			expect(valueTypeLabel(-1.3)).toBe('number');
		});

		it(`should return 'number' when value is number literal 0`, () => {
			expect(valueTypeLabel(0)).toBe('number');
		});
	});

	describe('array input', () => {
		it(`should return 'array' when value is an empty array and id.array is not set`, () => {
			expect(valueTypeLabel([])).toBe('array');
		});

		it(`should return 'plaza[]' when value is an empty array and id.array is 'plaza'`, () => {
			const typeId = 'plaza';
			expect(valueTypeLabel([], {array: typeId})).toBe('plaza[]');
		});

		it(`should return 'array' when value is an empty array and id is set but id.array is not set'`, () => {
			expect(valueTypeLabel([], {object: 'aaaav'})).toBe('array');
		});

		it(`should return 'array' when value is an array and id is set but id.array is not set'`, () => {
			expect(valueTypeLabel([1, 3, 4, 1], {object: 'aaaav'})).toBe('array');
			expect(valueTypeLabel(['one', 'two', 'three', 'four'], {object: 'aaaav'})).toBe('array');
		});
	});

	describe('object', () => {
		it(`should return 'object' when value is an empty object`, () => {
			expect(valueTypeLabel({})).toBe('object');
		});

		it(`should return 'FOURV' for empty object when id.object is 'FOURV'`, () => {
			expect(valueTypeLabel({}, {object: 'FOURV'})).toBe('FOURV');
		});

		it(`should return 'THREE' for empty object when id.object is 'THREE'`, () => {
			expect(
				valueTypeLabel(
					{
						a: '1333',
						b: '441081',
						c: '4444',
						d: () => {
							return null;
						}
					},
					{object: 'THREE'}
				)
			).toBe('THREE');
		});
	});
});
