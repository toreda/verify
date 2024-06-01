import {SchemaFieldType} from '../../src';
import {schemaFieldTypes} from '../../src/schema/field/types';

const EXPECTED_TYPES: SchemaFieldType[] = [
	'bigint',
	'BigInt',
	'bigint[]',
	'BigInt[]',
	'boolean',
	'boolean[]',
	'datetime',
	'datetime[]',
	'dbl',
	'double',
	'double[]',
	'float',
	'int',
	'int[]',
	'iterable',
	'iterable[]',
	'json',
	'json[]',
	'null',
	'null[]',
	'number',
	'number[]',
	'string',
	'string[]',
	'time',
	'time[]',
	'uint',
	'uint[]',
	'undefined',
	'undefined[]',
	'url',
	'url[]'
];

describe('Schema Field Types (built-in)', () => {
	let fieldTypes: Set<string>;

	beforeAll(() => {
		fieldTypes = new Set<string>(schemaFieldTypes);
	});

	for (const expectedType of EXPECTED_TYPES) {
		it(`should include built-in type '${expectedType}'`, () => {
			expect(fieldTypes.has(expectedType)).toBe(true);
		});
	}
});
