import {arrayVerify} from '../../src/array/verify';
const EMPTY_ARRAY: string[] = [];
const EMPTY_STRING = '';

describe('arrayVerify', () => {
	it(`should fail when value arg is undefined`, () => {
		const result = arrayVerify();

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value arg is null`, () => {
		const result = arrayVerify(null);

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value is a truthy non-array`, () => {
		const result = arrayVerify(111 as any);

		expect(result.errorCode()).toBe('bad_format');
		expect(result.success()).toBe(false);
	});

	it(`should succeed when value is an empty array with no flags provided`, () => {
		const result = arrayVerify(EMPTY_ARRAY);

		expect(result.errorCode()).toBe(EMPTY_STRING);
		expect(result.success()).toBe(true);
	});

	it(`should return input as fate payload when successful`, () => {
		const value: string[] = [];
		const result = arrayVerify<string>(value);

		expect(result.data).toStrictEqual(value);
		expect(result.success()).toBe(true);
	});
});
