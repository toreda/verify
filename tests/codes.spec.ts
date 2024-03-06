import type {Code} from '../src/code';
import {Codes} from '../src/codes';

const ITEMS: {
	method: () => string;
	code: Code;
}[] = [
	{
		method: Codes.badContent,
		code: 'bad_content'
	},
	{
		method: Codes.badData,
		code: 'bad_data'
	},
	{
		method: Codes.missingId,
		code: 'missing_id'
	},
	{
		method: Codes.missingArg,
		code: 'missing_arg'
	},
	{
		method: Codes.missingConfig,
		code: 'missing_config'
	},
	{
		method: Codes.missingValue,
		code: 'missing_value'
	},
	{
		method: Codes.tooLong,
		code: 'too_long'
	},
	{
		method: Codes.tooBig,
		code: 'too_big'
	},
	{
		method: Codes.tooShort,
		code: 'too_short'
	},
	{
		method: Codes.tooSmall,
		code: 'too_small'
	},
	{
		method: Codes.badEncoding,
		code: 'bad_encoding'
	},
	{
		method: Codes.badFormat,
		code: 'bad_format'
	},
	{
		method: Codes.emptyArg,
		code: 'empty_arg'
	},
	{
		method: Codes.emptyArray,
		code: 'empty_array'
	},
	{
		method: Codes.emptyConfig,
		code: 'empty_config'
	},
	{
		method: Codes.emptyObject,
		code: 'empty_object'
	},
	{
		method: Codes.emptyString,
		code: 'empty_string'
	},
	{
		method: Codes.emptyValue,
		code: 'empty_value'
	},
	{
		method: Codes.error,
		code: 'error'
	},
	{
		method: Codes.unknownError,
		code: 'unknown_error'
	},
	{
		method: Codes.notAuthorized,
		code: 'not_authorized'
	},
	{
		method: Codes.unsupportedConfig,
		code: 'unsupported_config'
	},
	{
		method: Codes.unsupportedType,
		code: 'unsupported_type'
	},
	{
		method: Codes.unsupportedValue,
		code: 'unsupported_value'
	},
	{
		method: Codes.exception,
		code: 'exception'
	},
	{
		method: Codes.unsupportedVersion,
		code: 'unsupported_version'
	}
];

describe('Codes', () => {
	beforeEach(() => {
		Codes.reset();
	});

	describe('getInstance', () => {
		it(`should return a Codes instance on each call`, () => {
			for (let i = 0; i < 5; i++) {
				const result = Codes.getInstance();

				expect(result instanceof Codes).toBe(true);
			}
		});
	});

	for (const item of ITEMS) {
		it(`Codes.${item.method}() should return code '${item.code}'`, () => {
			expect(item.method()).toBe(item.code);
		});

		it(`Codes.${item.method}() should return custom code when set`, () => {
			const value = Math.round(Math.random() * 100000).toString();
			Codes.set(item.code, value);

			expect(item.method()).toBe(value);
		});
	}
});
