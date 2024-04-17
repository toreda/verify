import {isIterable} from '../../src/is/iterable';
import {asyncIterable} from '../_lib/iterable';

describe('isIterable', () => {
	it(`should return false for 0`, () => {
		expect(isIterable(0)).toBe(false);
	});

	it(`should return false for negative number`, () => {
		expect(isIterable(-10)).toBe(false);
	});

	it(`should return false for positive number`, () => {
		expect(isIterable(10)).toBe(false);
	});

	it(`should return false for non-integer number`, () => {
		expect(isIterable(44.33)).toBe(false);
	});

	it(`should return false when value arg is a string`, () => {
		expect(isIterable('aaa' as any)).toBe(false);
	});

	it(`should return false when value arg is undefined`, () => {
		expect(isIterable(undefined)).toBe(false);
	});

	it(`should return false when value arg is null`, () => {
		expect(isIterable(null)).toBe(false);
	});

	it(`should return true when value arg is an empty object`, () => {
		expect(isIterable({})).toBe(false);
	});

	it(`should return true when value arg is an empty array`, () => {
		expect(isIterable([])).toBe(true);
	});

	it(`should return true when value arg is a single element array`, () => {
		expect(isIterable([1])).toBe(true);
	});

	it(`should return true when value arg is a non-empty array`, () => {
		expect(isIterable([1, 2, 3, 4, 5])).toBe(true);
	});

	it(`should return true when value arg is a non-empty string set`, () => {
		const value = new Set<string>(['a', 'b', 'c']);
		expect(isIterable(value)).toBe(true);
	});

	it(`should return true when value arg is an empty string set`, () => {
		const value = new Set<string>();
		expect(isIterable(value)).toBe(true);
	});

	it(`should return true when value arg is an empty string set`, () => {
		const value = new Set<string>();
		expect(isIterable(value)).toBe(true);
	});

	it(`should return true when value arg is a non-empty map`, () => {
		const value = new Map<string, string>();
		value.set('one', 'two');
		expect(isIterable(value)).toBe(true);
	});

	it(`should return true when value arg is an empty map`, () => {
		const value = new Map<string, string>();
		expect(isIterable(value)).toBe(true);
	});

	it(`should return true for an async iterable`, () => {
		expect(isIterable(asyncIterable)).toBe(true);
	});

	it(`should return false when value is a non-empty object`, () => {
		const o = {
			one: 'two',
			three: 3
		};

		expect(isIterable(o)).toBe(false);
	});

	it(`should return false when value is a zero length ArrayBuffer`, () => {
		const value = new ArrayBuffer(0);
		expect(isIterable(value)).toBe(false);
	});
});
