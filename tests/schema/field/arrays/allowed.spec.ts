import {SchemaFieldType} from '../../../../src';
import {schemaFieldArraysAllowed} from '../../../../src/schema/field/arrays/allowed';
import {schemaFieldTypes} from '../../../../src/schema/field/types';

const EMPTY_STRING = '';
const EMPTY_OBJECT = {};
const EMPTY_STR_ARRAY: string[] = [];

const NON_ARRAY_TYPES: SchemaFieldType[] = [
	'bigint',
	'BigInt',
	'boolean',
	'datetime',
	'dbl',
	'double',
	'float',
	'int',
	'iterable',
	'json',
	'null',
	'number',
	'serialized',
	'string',
	'time',
	'uint',
	'undefined',
	'url'
];

const ARRAY_TYPES: SchemaFieldType<string>[] = [
	'bigint[]',
	'BigInt[]',
	'boolean[]',
	'datetime[]',
	'datetime[]',
	'dbl[]',
	'double[]',
	'float[]',
	'int[]',
	'iterable[]',
	'json[]',
	'null[]',
	'number[]',
	'serialized[]',
	'string[]',
	'time[]',
	'undefined[]',
	'url[]'
];

describe('schemaFieldArraysAllowed', () => {
	it(`should return false when items arg is an empty string`, () => {
		expect(schemaFieldArraysAllowed<string>(EMPTY_STRING as any)).toBe(false);
	});

	it(`should return false when items arg is a string`, () => {
		expect(schemaFieldArraysAllowed<string>('f087145081-998132' as any)).toBe(false);
	});

	it(`should return false when items arg is an empty array`, () => {
		expect(schemaFieldArraysAllowed<string>(EMPTY_STR_ARRAY as any)).toBe(false);
	});

	it(`should return false when items arg is an empty object`, () => {
		expect(schemaFieldArraysAllowed<string>(EMPTY_OBJECT as any)).toBe(false);
	});

	it(`should return false for all built-in non-array types'`, () => {
		expect(schemaFieldArraysAllowed<string>(NON_ARRAY_TYPES)).toBe(false);
	});

	it(`should return true when one item is an array type among non-array types`, () => {
		const input: SchemaFieldType<string>[] = [...NON_ARRAY_TYPES, 'number[]'];
		expect(schemaFieldArraysAllowed<string>(input)).toBe(true);
	});

	it(`should return true when items array has one array type`, () => {
		expect(schemaFieldArraysAllowed<string>(['BigInt[]'])).toBe(true);
	});

	for (const fieldType of NON_ARRAY_TYPES) {
		it(`should return false when items arg is a single non-array type '${fieldType}'`, () => {
			expect(schemaFieldArraysAllowed<string>([fieldType])).toBe(false);
		});
	}

	for (const fieldType of ARRAY_TYPES) {
		it(`should return true when items array has one array type '${fieldType}'`, () => {
			expect(schemaFieldArraysAllowed<string>([fieldType])).toBe(true);
		});
	}

	it(`should return true when the last item is an array type and all other elements are skipped due to being non-strings`, () => {
		expect(
			schemaFieldArraysAllowed<string>([
				undefined,
				null,
				1000,
				{},
				[],
				'___',
				EMPTY_STRING,
				'BigInt[]'
			] as any)
		).toBe(true);
	});

	it(`should return true when items arg contains a non-builtin type ending in '[]'`, () => {
		expect(
			schemaFieldArraysAllowed<string>([
				null,
				undefined,
				10,
				100,
				91910,
				'---',
				'string',
				'undefined',
				'customtype[]'
			] as any)
		).toBe(true);
	});
});
