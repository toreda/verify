import {isStringNotEmpty} from '../../../../src/is/string/not/empty';
const EMPTY_STRING = '';

describe('isStringNotEmpty', () => {
	it(`should return false when value is an empty string`, () => {
		expect(isStringNotEmpty(EMPTY_STRING)).toBe(false);
	});

	it(`should return false value is a number`, () => {
		expect(isStringNotEmpty(1444)).toBe(false);
	});

	it(`should return false value is an empty object`, () => {
		expect(isStringNotEmpty({})).toBe(false);
	});

	it(`should return false value is an empty array`, () => {
		expect(isStringNotEmpty([])).toBe(false);
	});

	it(`should return false value is null`, () => {
		expect(isStringNotEmpty(null)).toBe(false);
	});

	it(`should return false value is undefined`, () => {
		expect(isStringNotEmpty(undefined)).toBe(false);
	});

	it(`should return false when value is a single space`, () => {
		expect(isStringNotEmpty('     ')).toBe(false);
	});

	it(`should return false when value is padded string of only spaces`, () => {
		expect(isStringNotEmpty(' ')).toBe(false);
	});

	it(`should return true when value is a single character string`, () => {
		expect(isStringNotEmpty('a')).toBe(true);
	});

	it(`should return true when value is an non-empty string`, () => {
		expect(isStringNotEmpty('one-one-one')).toBe(true);
	});
});
