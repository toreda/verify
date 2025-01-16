import {verifyStringId} from '../../../src/verify/string/id';
import {errorMkCode} from '../../../src/error/mk/code';
const EMPTY_STRING = '';
const VAR_LABEL = 'arg';

describe('verifyStringId', () => {
	const ID = 'somefield';
	const VALUE = 'aklha97141';

	it(`should fail when id arg is undefined`, () => {
		const result = verifyStringId(undefined as any, VALUE);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('missing_arg', 'id', ['arg']));
	});

	it(`should fail when id arg is null`, () => {
		const result = verifyStringId(null as any, VALUE);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('missing_arg', 'id', ['arg']));
	});

	it(`should fail when value arg is undefined`, () => {
		const result = verifyStringId(ID, undefined as any, {
			valueLabel: VAR_LABEL
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('missing_arg', ID, ['arg']));
	});

	it(`should fail when value arg is null and allowNull is false`, () => {
		const result = verifyStringId(ID, null as any, {
			allow: {
				null: false
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('bad_format', ID, ['value']));
	});

	it(`should succeed when value arg is null and allowNull is true`, () => {
		const result = verifyStringId(ID, null as any, {
			allow: {
				null: true
			}
		});

		expect(result.success()).toBe(true);
		expect(result.errorCode()).toBe(EMPTY_STRING);
	});

	it(`should fail when value arg is truthy non-string`, () => {
		const result = verifyStringId(ID, 10 as any);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('bad_format', ID, ['value']));
	});

	it(`should fail when value arg is falsy non-string`, () => {
		const result = verifyStringId(ID, 0 as any);

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('bad_format', ID, ['value']));
	});

	it(`should succeed when value arg is all spaces and notrim is true`, () => {
		const result = verifyStringId(ID, '    ', {
			notrim: true
		});

		expect(result.success()).toBe(true);
	});

	it(`should succeed when value arg is an empty string and empty strings are enabled`, () => {
		const result = verifyStringId(ID, EMPTY_STRING, {
			allow: {
				empty: true
			}
		});

		expect(result.success()).toBe(true);
	});

	it(`should succeed when value arg is an empty string and empty strings are disabled`, () => {
		const result = verifyStringId(ID, EMPTY_STRING, {
			allow: {
				empty: false
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('empty', ID, ['value']));
	});

	it(`should fail when value exceeds max length flag`, () => {
		const result = verifyStringId(ID, '9714197', {
			length: {
				max: 3
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('too_long', ID, ['value']));
	});

	it(`should fail when value is shorter than min length`, () => {
		const result = verifyStringId(ID, 'AJF', {
			length: {
				min: 5
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('too_short', ID, ['value']));
	});

	it(`should succeed when value is between the min and max lengths`, () => {
		const result = verifyStringId(ID, 'AF8105', {
			length: {
				min: 4,
				max: 8
			}
		});

		expect(result.success()).toBe(true);
	});

	it(`should fail when value is less than the max length but less than the min`, () => {
		const result = verifyStringId(ID, 'A841', {
			length: {
				min: 8,
				max: 20
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('too_short', ID, ['value']));
	});

	it(`should succeed when min and max lengths are the same value and value length matches them`, () => {
		const result = verifyStringId(ID, 'MVRJ', {
			length: {
				min: 4,
				max: 4
			}
		});

		expect(result.success()).toBe(true);
	});

	it(`should fail when value is an empty string and allow empty is false`, () => {
		const result = verifyStringId(ID, EMPTY_STRING, {
			length: {
				min: 4,
				max: 10
			},
			allow: {
				empty: false
			}
		});

		expect(result.success()).toBe(false);
		expect(result.errorCode()).toBe(errorMkCode('empty', ID, ['value']));
	});

	it(`should return input as fate payload when successful`, () => {
		const value = 'aaa7997-9714971-9746746661';
		const result = verifyStringId(ID, value);

		expect(result.data).toBe(value);
		expect(result.success()).toBe(true);
	});
});
