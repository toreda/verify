import {equalTo} from '../../src/equal/to';

const EMPTY_STRING = '';

describe('equalTo', () => {
	it(`should return false and not perform type coercion when both args have the same value but different types`, () => {
		expect(equalTo(1, '1')).toBe(false);
		expect(equalTo('1', 1)).toBe(false);
	});

	describe('numbers', () => {
		it(`should return true when both values are 0`, () => {
			expect(equalTo(0, 0)).toBe(true);
		});

		it(`should return true when both values are 1`, () => {
			expect(equalTo(1, 1)).toBe(true);
		});

		it(`should return true when both values are -1`, () => {
			expect(equalTo(-1, -1)).toBe(true);
		});
	});

	describe('strings', () => {
		it(`should return true when comparing empty strings`, () => {
			expect(equalTo(EMPTY_STRING, EMPTY_STRING)).toBe(true);
		});

		it(`should return true when comparing different strings with the same content`, () => {
			const str1 = 'aaa';
			const str2 = 'aaa';
			expect(equalTo(str1, str2)).toBe(true);
		});
	});

	describe('booleans', () => {
		it(`should return true when both values are 'true'`, () => {
			expect(equalTo(true, true)).toBe(true);
		});

		it(`should return true when both values are 'false'`, () => {
			expect(equalTo(false, false)).toBe(true);
		});
	});

	describe('Unsupported types', () => {
		it(`should return false when either value is an object`, () => {
			expect(equalTo({}, '{}')).toBe(false);
			expect(equalTo({}, {})).toBe(false);
			expect(equalTo('{}', {})).toBe(false);
		});

		it(`should return false when either value is null`, () => {
			expect(equalTo(null, 'null')).toBe(false);
			expect(equalTo(null, null)).toBe(false);
			expect(equalTo('null', null)).toBe(false);
		});

		it(`should return false when either value is undefined`, () => {
			expect(equalTo(undefined, 'undefined')).toBe(false);
			expect(equalTo(undefined, undefined)).toBe(false);
			expect(equalTo('undefined', undefined)).toBe(false);
		});
	});
});
