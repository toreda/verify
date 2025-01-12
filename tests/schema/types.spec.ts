import {type SchemaFieldType} from '../../src';
import {schemaFieldTypes} from '../../src/schema/field/types';

const BASETYPES: SchemaFieldType[] = [
	'bigint',
	'BigInt',
	'boolean',
	'dbl',
	'time',
	'double',
	'float',
	'int',
	'string',
	'iterable',
	'datetime',
	'null',
	'uint',
	'number',
	'undefined',
	'url',
	'json'
];

const BASETYPE_ARRAYS: SchemaFieldType[] = [
	'bigint[]',
	'BigInt[]',
	'boolean[]',
	'datetime[]',
	'double[]',
	'int[]',
	'iterable[]',
	'json[]',
	'null[]',
	'number[]',
	'string[]',
	'time[]',
	'uint[]',
	'undefined[]',
	'url[]'
];

describe('Schema Field Types (built-in)', () => {
	let fieldTypes: Set<string>;

	beforeAll(() => {
		fieldTypes = new Set<string>(schemaFieldTypes);
	});

	for (const type of BASETYPES) {
		it(`should allow basetype non-array '${type}'`, () => {
			expect(fieldTypes.has(type)).toBe(true);
		});
	}

	for (const type of BASETYPE_ARRAYS) {
		it(`should allow basetype array '${type}'`, () => {
			expect(fieldTypes.has(type)).toBe(true);
		});
	}
});
