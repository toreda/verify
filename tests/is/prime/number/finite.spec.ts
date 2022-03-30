import {isNumberFinite} from '../../../../src/is/number/finite';

const EMPTY_ARRAY: unknown[] = [];
const BAD_VALUES = [
	{label: 'aaaa', value: 'aaaa'},
	{label: 'empty string', value: ''},
	{label: Number.NaN, value: 'NaN'},
	{label: 'Positive Infinity', value: Number.POSITIVE_INFINITY},
	{label: 'Negative Infinity', value: Number.NEGATIVE_INFINITY},
	{label: 'Empty Array', value: EMPTY_ARRAY}
];

describe('isNumberFinite', () => {
	it(`should return true for 0`, async () => {
		expect(isNumberFinite(0)).toBe(true);
	});

	it(`should return true for 1`, async () => {
		expect(isNumberFinite(1)).toBe(true);
	});

	it(`should return true for -1`, async () => {
		expect(isNumberFinite(-1)).toBe(true);
	});

	it(`should return true for `, async () => {
		expect(isNumberFinite(-1)).toBe(true);
	});

	for (const badValue of BAD_VALUES) {
		it(`should return false for bad value '${badValue.label}'`, () => {
			const result = isNumberFinite(badValue.value as any);

			expect(result).toBe(false);
		});
	}
});
