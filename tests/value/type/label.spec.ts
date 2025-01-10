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

		it(`should return 'array' when value is an empty array`, () => {
			expect(valueTypeLabel([])).toBe('array');
		});

		it(`should return 'number[]' when first array element is a number`, () => {
			expect(valueTypeLabel([1, 3, 4, 1])).toBe('number[]');
		});

		it(`should return 'string[]' when value is an array of strings`, () => {
			expect(valueTypeLabel(['one', 'two'])).toBe('string[]');
		});

		it(`should return 'string[]' when value is an array of numbers but the first element is string`, () => {
			expect(valueTypeLabel(['aaaa', 401, 555, 1901])).toBe('string[]');
		});

		it(`should return 'string[]' when value is an array of strings but the first element is number`, () => {
			expect(valueTypeLabel([4401, 'one', 'two'])).toBe('number[]');
		});

		it(`should return 'string[]' when value is an array of numbers`, () => {
			expect(valueTypeLabel([44114, 89881, 333])).toBe('number[]');
		});

		it(`should return 'null[]' when value is an array of nulls`, () => {
			expect(valueTypeLabel([null, null, null])).toBe('null[]');
		});

		it(`should return 'null[]' when value is an array of null arrays`, () => {
			expect(valueTypeLabel([[null], [null, null], [null]])).toBe('null[][]');
		});

		it(`should return 'undefined[]' when value is an array of undefined`, () => {
			expect(valueTypeLabel([undefined, undefined, undefined])).toBe('undefined[]');
		});

		it(`should return 'undefined[][]' when value is an array of undefined arrays`, () => {
			expect(valueTypeLabel([[undefined], [undefined], [undefined]])).toBe('undefined[][]');
		});

		it(`should return 'undefined[]' when value is an array of strings but the first element is undefined`, () => {
			expect(valueTypeLabel([undefined, 'aaa', 'ccc'])).toBe('undefined[]');
		});

		it(`should return 'string[][]' when value is an array of string arrays`, () => {
			expect(
				valueTypeLabel([
					['aaa', 'aa-49714'],
					['aa-889198', 'aa-989191'],
					['bb-891714', 'bb-77471']
				])
			).toBe('string[][]');
		});

		it(`should return 'object[]' when value is an array of objects`, () => {
			expect(valueTypeLabel([{}, {}, {a: 'bbb'}, {c: '444'}])).toBe('object[]');
		});

		it(`should return 'object[][]' when value is an array of object arrays`, () => {
			expect(
				valueTypeLabel([
					[{}, {a: 'fff'}],
					[{a: '98174'}, {b: '9919714'}],
					[{b: '9797144'}, {}]
				])
			).toBe('object[][]');
		});

		it(`should return 'number[][]' when value is an array of number arrays`, () => {
			expect(
				valueTypeLabel([
					[44114, 101],
					[89881, 801],
					[333, 99999]
				])
			).toBe('number[][]');
			expect(valueTypeLabel([[44114, 101], [], [333, 99999]])).toBe('number[][]');
			expect(valueTypeLabel([[44114, 101], [], []])).toBe('number[][]');
		});

		it(`should return 'number[][]' when value is an array of number arrays`, () => {
			expect(valueTypeLabel([[44114, 101], [], [333, 99999]])).toBe('number[][]');
		});

		it(`should return 'array[]' when the first value is an empty array`, () => {
			expect(valueTypeLabel([[], [], [333, 99999]])).toBe('array[]');
		});
	});

	describe('object', () => {
		it(`should return 'object' when value is an empty object`, () => {
			expect(valueTypeLabel({})).toBe('object');
		});

		it(`should return 'object' when value is an object`, () => {
			expect(valueTypeLabel({
				a: 'vvv',
				sample: () => { return 10 },
				b: 1014
			})).toBe('object');
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
