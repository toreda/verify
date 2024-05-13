import {schemaFieldTypes} from '../../src/schema/field/types';

const EXPECTED_TYPES: string[] = [
	'array',
	'bigint',
	'boolean',
	'datetime',
	'dbl',
	'double',
	'float',
	'int',
	'iterable',
	'json-serialized',
	'json',
	'null',
	'number',
	'real',
	'string',
	'time',
	'uint',
	'undefined',
	'url'
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
