import {verifyBoolean} from '../../src/verify/boolean';

const EMPTY_STRING = '';

const NON_BOOLS = {
	TRUTHY: [
		{value: '1'},
		{value: {}, label: 'empty object'},
		{value: [], label: 'empty array'},
		{value: '11111'},
		{value: 1, label: `number literal 1 without type coercion`},
		{value: 'true', label: `string literal 'true' without type coercion`},
		{value: 'false', label: `string literal 'false' without type coercion`}
	],
	FALSY: [
		{value: 0, label: 'number literal 0'},
		{value: EMPTY_STRING, label: 'empty string'}
	]
};
describe('verifyBoolean', () => {
	it(`should fail when value arg is undefined`, () => {
		const result = verifyBoolean(undefined as any);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe('missing');
	});

	it(`should fail when value arg is null`, () => {
		const result = verifyBoolean(null as any);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe('missing');
	});

	for (const nonBool of NON_BOOLS.TRUTHY) {
		const value = nonBool.value;
		const label = typeof nonBool.label === 'string' ? nonBool.label : `${value}`;
		it(`should fail when value arg is a truthy non-boolean value ${label}.`, () => {
			const result = verifyBoolean(value as any);

			expect(result.success()).toBe(false);
			expect(result.errorCode()).toBe('bad_value_type');
		});
	}

	for (const nonBool of NON_BOOLS.FALSY) {
		const value = nonBool.value;
		const label = typeof nonBool.label === 'string' ? nonBool.label : `${value}`;
		it(`should fail when value arg is a falsy non-boolean value ${label}.`, () => {
			const result = verifyBoolean(value as any);

			expect(result.success()).toBe(false);
			expect(result.errorCode()).toBe('bad_value_type');
		});
	}

	it(`should succeed when value is boolean literal 'true'`, () => {
		const result = verifyBoolean(true);

		expect(result.success()).toBe(true);
		expect(result.errorCode()).toBe('');
	});

	it(`should return true value when value is boolean literal 'false'`, () => {
		const result = verifyBoolean(true);

		expect(result.success()).toBe(true);
		expect(result.errorCode()).toBe('');
		expect(result.data).toBe(true);
	});

	it(`should succeed when value is boolean literal 'false'`, () => {
		const result = verifyBoolean(false);

		expect(result.success()).toBe(true);
		expect(result.errorCode()).toBe('');
	});

	it(`should return false value when value is boolean literal 'false'`, () => {
		const result = verifyBoolean(false);

		expect(result.success()).toBe(true);
		expect(result.errorCode()).toBe('');
		expect(result.data).toBe(false);
	});
});
