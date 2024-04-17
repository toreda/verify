import {isArray} from '../../src/is/array';

describe('isArray', () => {
	it(`should return false for 0`, () => {
		expect(isArray(0)).toBe(false);
	});

	it(`should return false for negative number`, () => {
		expect(isArray(-10)).toBe(false);
	});

	it(`should return false for positive number`, () => {
		expect(isArray(10)).toBe(false);
	});

	it(`should return false for non-integer number`, () => {
		expect(isArray(44.33)).toBe(false);
	});

	it(`should return false when value arg is a string`, () => {
		expect(isArray('aaa' as any)).toBe(false);
	});

	it(`should return false when value arg is an empty object`, () => {
		expect(isArray({} as any)).toBe(false);
	});

	it(`should return false when value arg is undefined`, () => {
		expect(isArray(undefined)).toBe(false);
	});

	it(`should return false when value arg is null`, () => {
		expect(isArray(null)).toBe(false);
	});

	it(`should return false when value arg is between 0 and 1`, () => {
		expect(isArray(0.0003)).toBe(false);
		expect(isArray(0.1)).toBe(false);
		expect(isArray(0.1999999)).toBe(false);
	});

	it(`should return false when value arg is not finite`, () => {
		expect(isArray(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isArray(Number.NEGATIVE_INFINITY)).toBe(false);
	});

	it(`should return false when value arg is null`, () => {
		expect(isArray(null)).toBe(false);
	});

	it(`should return false when value arg is an empty object`, () => {
		expect(isArray({})).toBe(false);
	});

	it(`should return true when value arg is an empty array`, () => {
		expect(isArray([])).toBe(true);
	});

	it(`should return true when value arg is a single element array`, () => {
		expect(isArray([1])).toBe(true);
	});

	it(`should return true when value arg is a non-empty array`, () => {
		expect(isArray([1, 2, 3, 4, 5])).toBe(true);
	});
});
