import {isInt} from '../../src/is/int';

describe('isInt', () => {
	it(`should return true for 0`, () => {
		expect(isInt(0)).toBe(true);
	});

	it(`should return true for negative number`, () => {
		expect(isInt(-10)).toBe(true);
	});

	it(`should return true for positive number`, () => {
		expect(isInt(10)).toBe(true);
	});

	it(`should return false for non-integer number`, () => {
		expect(isInt(44.33)).toBe(false);
	});

	it(`should return false when value arg is a string`, () => {
		expect(isInt('aaa' as any)).toBe(false);
	});

	it(`should return false when value arg is an empty object`, () => {
		expect(isInt({} as any)).toBe(false);
	});

	it(`should return false when value arg is an empty array`, () => {
		expect(isInt([] as any)).toBe(false);
	});

	it(`should return false when value arg is undefined`, () => {
		expect(isInt()).toBe(false);
	});

	it(`should return false when value arg is between 0 and 1`, () => {
		expect(isInt(0.0003)).toBe(false);
		expect(isInt(0.1)).toBe(false);
		expect(isInt(0.1999999)).toBe(false);
	});

	it(`should return false when value arg is not finite`, () => {
		expect(isInt(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isInt(Number.NEGATIVE_INFINITY)).toBe(false);
	});

	it(`should return false when value arg is null`, () => {
		expect(isInt(null)).toBe(false);
	});
});
