import {verifyArray} from '../../src/verify/array';
const EMPTY_ARRAY: string[] = [];
const EMPTY_STRING = '';

describe('verifyArray', () => {
	it(`should fail when value arg is undefined`, () => {
		const result = verifyArray();

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value arg is null`, () => {
		const result = verifyArray(null);

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value is a truthy non-array`, () => {
		const result = verifyArray(111 as any);

		expect(result.errorCode()).toBe('bad_format');
		expect(result.success()).toBe(false);
	});

	it(`should succeed when value is an empty array with no flags provided`, () => {
		const result = verifyArray(EMPTY_ARRAY);

		expect(result.errorCode()).toBe(EMPTY_STRING);
		expect(result.success()).toBe(true);
	});

	it(`should return input as fate payload when successful`, () => {
		const value: string[] = [];
		const result = verifyArray<string>(value);

		expect(result.data).toStrictEqual(value);
		expect(result.success()).toBe(true);
	});
});
