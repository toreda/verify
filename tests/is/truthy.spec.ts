import {isTruthy} from '../../src/is/truthy';

describe('isTruthy', () => {
	it(`should return false for 0`, () => {
		expect(isTruthy(0)).toBe(false);
	});

	it(`should return true for negative number`, () => {
		expect(isTruthy(-10)).toBe(true);
	});

	it(`should return true for positive number`, () => {
		expect(isTruthy(10)).toBe(true);
	});

	it(`should return true for non-integer number`, () => {
		expect(isTruthy(44.33)).toBe(true);
	});

	it(`should return true when value arg is a string`, () => {
		expect(isTruthy('aaa' as any)).toBe(true);
	});

	it(`should return true when value arg is an empty object`, () => {
		expect(isTruthy({} as any)).toBe(true);
	});

	it(`should return false when value arg is undefined`, () => {
		expect(isTruthy(undefined)).toBe(false);
	});

	it(`should return false when value arg is null`, () => {
		expect(isTruthy(null)).toBe(false);
	});

	it(`should return true when value arg is between 0 and 1`, () => {
		expect(isTruthy(0.0003)).toBe(true);
		expect(isTruthy(0.1)).toBe(true);
		expect(isTruthy(0.1999999)).toBe(true);
	});

	it(`should return true when value arg is not finite`, () => {
		expect(isTruthy(Number.POSITIVE_INFINITY)).toBe(true);
		expect(isTruthy(Number.NEGATIVE_INFINITY)).toBe(true);
	});

	it(`should return true when value arg is an empty object`, () => {
		expect(isTruthy({})).toBe(true);
	});

	it(`should return true when value arg is an empty array`, () => {
		expect(isTruthy([])).toBe(true);
	});

	it(`should return true when value arg is a single element array`, () => {
		expect(isTruthy([1])).toBe(true);
	});

	it(`should return true when value arg is a non-empty array`, () => {
		expect(isTruthy([1, 2, 3, 4, 5])).toBe(true);
	});
});
