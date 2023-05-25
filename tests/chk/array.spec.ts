import {chkArray} from '../../src/chk/array';
const EMPTY_ARRAY: string[] = [];
const EMPTY_STRING = '';

describe('chkArray', () => {
	it(`should fail when value arg is undefined`, () => {
		const result = chkArray();

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value arg is null`, () => {
		const result = chkArray(null);

		expect(result.errorCode()).toBe('missing');
		expect(result.success()).toBe(false);
	});

	it(`should fail when value is a truthy non-array`, () => {
		const result = chkArray(111 as any);

		expect(result.errorCode()).toBe('bad_format');
		expect(result.success()).toBe(false);
	});

	it(`should succeed when value is an empty array with no flags provided`, () => {
		const result = chkArray(EMPTY_ARRAY);

		expect(result.errorCode()).toBe(EMPTY_STRING);
		expect(result.success()).toBe(true);
	});

	it(`should return input as fate payload when successful`, () => {
		const value: string[] = [];
		const result = chkArray<string>(value);

		expect(result.data).toStrictEqual(value);
		expect(result.success()).toBe(true);
	});
});
