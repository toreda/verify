import {Levels, Log} from '@toreda/log';
import {schemaError} from '../src/schema/error';
import {Schema} from '../src/schema';
import {stringValue} from '@toreda/strong-types';
import {type SchemaData} from '../src/schema/data';
import {type Primitive} from '@toreda/types';

const EMPTY_OBJECT = {};
const EMPTY_STRING = '';

interface SampleData extends SchemaData<Primitive> {
	str1: string;
	int1: number;
	bool1: boolean;
}

class SampleSchema extends Schema<Primitive, SampleData, SampleData> {
	constructor() {
		super({
			name: 'SampleSchema',
			fields: [
				{
					name: 'str1',
					types: ['string']
				},
				{
					name: 'int1',
					types: ['number']
				},
				{
					name: 'bool1',
					types: ['boolean', 'null']
				}
			],
			options: {}
		});
	}
}

describe('schemaVerify', () => {
	let sampleData: SampleData;
	let schema: SampleSchema;
	let base: Log;

	beforeAll(() => {
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});
		schema = new SampleSchema();
	});

	beforeEach(() => {
		sampleData = {
			bool1: false,
			int1: 11,
			str1: 'one'
		};
	});

	describe('Parsing', () => {
		it(`should fail with code when provided data is an empty object`, async () => {
			const result = await schema.verify(EMPTY_OBJECT as any, base);

			expect(result.ok()).toBe(false);
		});

		it(`should fail with code when a data field is undefined`, async () => {
			sampleData.int1 = undefined as any;

			const result = await schema.verify(sampleData, base);

			expect(result.ok()).toBe(false);
		});

		it(`should succeed when all properties match schema requirements`, async () => {
			sampleData.bool1 = true;
			sampleData.int1 = 70714;
			sampleData.str1 = '149714';

			const result = await schema.verify(sampleData, base);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});

		describe('Types', () => {
			describe('unsupported', () => {
				it(`should fail when field type is not supported`, async () => {
					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('int1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.types.length = 0;
					const fieldType = 'aaaaa' as any;
					field.types.push(fieldType);
					const result = await customSchema.verify(sampleData, base);
					expect(result.errorCode()).toBe(
						schemaError(
							`unsupported_type:${fieldType}`,
							`${schema.schemaName}.verifyField`,
							field.name
						)
					);
					expect(result.ok()).toBe(false);
				});
			});

			describe('strings', () => {
				it(`should use schema validated strings in output`, async () => {
					const expectedOutput = '7r9197-1919872';

					sampleData.str1 = expectedOutput;
					const result = await schema.verify(sampleData, base);

					expect(result.data?.str1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should use schema validated empty strings in output`, async () => {
					const expectedOutput = '';

					sampleData.str1 = expectedOutput;
					const result = await schema.verify(sampleData, base);

					expect(result.data?.str1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should succeed when value is a null and null values are allowed`, async () => {
					sampleData.str1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('str1');
					field?.types.push('null');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					const result = await customSchema.verify(sampleData, base);

					expect(result.ok()).toBe(true);
				});
			});

			describe('booleans', () => {
				it(`should use schema validated booleans with strict true value in output`, async () => {
					const expectedOutput = true;

					sampleData.bool1 = expectedOutput;
					const field = schema.fields.get('bool1');
					field?.types.push('null');
					const result = await schema.verify(sampleData, base);

					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should use schema validated booleans with strict false value in output`, async () => {
					const expectedOutput = false;

					sampleData.bool1 = expectedOutput;
					const result = await schema.verify(sampleData, base);
					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should fail when value is a truthy non-boolean`, async () => {
					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}
					sampleData.bool1 = 1 as any;
					const result = await customSchema.verify(sampleData, base);

					expect(result.ok()).toBe(false);
				});

				it(`should fail when value is null and null is disallowed`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.types.length = 0;
					field.types.push('boolean');

					const result = await customSchema.verify(sampleData, base);

					expect(result.errorCode()).toBe(
						schemaError('null_value_disallowed', `${schema.schemaName}.verifyField`, field.name)
					);
					expect(result.ok()).toBe(false);
				});

				it(`should succeed when value is null and null allowed`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');
					field?.types.push('null');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					const result = await schema.verify(sampleData, base);

					expect(result.errorCode()).toBe(EMPTY_STRING);
					expect(result.ok()).toBe(true);
				});
			});
		});
	});

	describe('verify', () => {
		it(`should fail when data arg is undefined`, async () => {
			const customSchema = new SampleSchema();
			const result = await customSchema.verify(undefined as any, base);

			expect(result.errorCode()).toBe(
				schemaError('missing_schema_data', `${schema.schemaName}.verify`)
			);
			expect(result.ok()).toBe(false);
		});
	});

	describe('verifyField', () => {
		it(`should fail when field argument is undefined`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema();
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			const result = await customSchema.verifyField(field.name, undefined as any, null);

			expect(result.errorCode()).toBe(
				schemaError('missing_field', `${customSchema.schemaName}.verifyField`, field.name)
			);
			expect(result.ok()).toBe(false);
		});

		it(`should fail when value is null and null type is not allowed`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema();
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.types.length = 0;
			field.types.push('boolean');
			const result = await customSchema.verifyField(field.name, field, null);

			expect(result.errorCode()).toBe(
				schemaError('null_value_disallowed', `${customSchema.schemaName}.verifyField`, field.name)
			);
			expect(result.ok()).toBe(false);
		});

		it(`should succeed when value is a null and null is allowed`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema();
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.types?.push('null');
			const fieldName = stringValue(field?.name, '__field_name__');
			const result = await customSchema.verifyField(fieldName, field!, null);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});
	});

	describe('verifyValue', () => {
		describe('boolean', () => {
			it(`should return true when type is 'boolean' and value is true`, async () => {
				const result = await schema.verifyValue('boolean', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is false`, async () => {
				const result = await schema.verifyValue('boolean', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is 0`, async () => {
				const result = await schema.verifyValue('boolean', 0 as any);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is 1`, async () => {
				const result = await schema.verifyValue('boolean', 1 as any);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is an empty object`, async () => {
				const result = await schema.verifyValue('boolean', {} as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is null`, async () => {
				const result = await schema.verifyValue('boolean', null as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is undefined`, async () => {
				const result = await schema.verifyValue('boolean', undefined as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('string', () => {
			it(`should return true when type is 'string' and value is empty string`, async () => {
				const result = await schema.verifyValue('string', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'string' and value is a single char`, async () => {
				const result = await schema.verifyValue('string', 'a');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'string' and value is a short string`, async () => {
				const result = await schema.verifyValue('string', '19714-9194714');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is undefined`, async () => {
				const result = await schema.verifyValue('string', undefined as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is null`, async () => {
				const result = await schema.verifyValue('string', null as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is 0`, async () => {
				const result = await schema.verifyValue('string', 0 as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is 1`, async () => {
				const result = await schema.verifyValue('string', 1 as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is an empty array`, async () => {
				const result = await schema.verifyValue('string', [] as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'string' and value is an empty object`, async () => {
				const result = await schema.verifyValue('string', {} as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('bigint', () => {
			it(`should return true when type is 'bigint' and value is a BigInt of value 0`, async () => {
				const result = await schema.verifyValue('bigint', BigInt('0'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt of value 1`, async () => {
				const result = await schema.verifyValue('bigint', BigInt('1'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt with a large number`, async () => {
				const result = await schema.verifyValue('bigint', BigInt('9007199254740991'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt with a huge octal`, async () => {
				const result = await schema.verifyValue('bigint', BigInt('0o377777777777777777'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is undefined`, async () => {
				const result = await schema.verifyValue('bigint', undefined as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is null`, async () => {
				const result = await schema.verifyValue('bigint', null as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is 0`, async () => {
				const result = await schema.verifyValue('bigint', 0 as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is 1`, async () => {
				const result = await schema.verifyValue('bigint', 1 as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is an empty array`, async () => {
				const result = await schema.verifyValue('bigint', [] as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is an empty object`, async () => {
				const result = await schema.verifyValue('bigint', {} as any);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('undefined', () => {
			it(`should return true when type is 'undefined' with value is undefined`, async () => {
				const result = await schema.verifyValue('undefined', undefined);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with null value`, async () => {
				const result = await schema.verifyValue('undefined', null);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value 'undefined'`, async () => {
				const result = await schema.verifyValue('undefined', 'undefined');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value 'null'`, async () => {
				const result = await schema.verifyValue('undefined', 'null');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value is 0`, async () => {
				const result = await schema.verifyValue('undefined', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value is EMPTY_STRING`, async () => {
				const result = await schema.verifyValue('undefined', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value is true`, async () => {
				const result = await schema.verifyValue('undefined', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value is false`, async () => {
				const result = await schema.verifyValue('undefined', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('uint', () => {
			it(`should return true when type is 'uint' and value is 0`, async () => {
				const result = await schema.verifyValue('uint', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'uint' and value is 1`, async () => {
				const result = await schema.verifyValue('uint', 1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'uint' and value is 100`, async () => {
				const result = await schema.verifyValue('uint', 100);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'uint' and value is MAX_SAFE_INTEGER`, async () => {
				const result = await schema.verifyValue('uint', Number.MAX_SAFE_INTEGER);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'uint' and value is -1`, async () => {
				const result = await schema.verifyValue('uint', -1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'uint' and value is 1.1`, async () => {
				const result = await schema.verifyValue('uint', 1.1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('null', () => {
			it(`should return true when value is null and null is allowed`, async () => {
				const result = await schema.verifyValue('null', null);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value 'null'`, async () => {
				const result = await schema.verifyValue('undefined', 'null');

				expect(result.errorCode()).toBe(EMPTY_STRING);

				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'null' with value is undefined`, async () => {
				const result = await schema.verifyValue('null', undefined);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'null' with value is 0`, async () => {
				const result = await schema.verifyValue('null', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'null' with value is EMPTY_STRING`, async () => {
				const result = await schema.verifyValue('null', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'null' with value is true`, async () => {
				const result = await schema.verifyValue('null', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'null' with value is false`, async () => {
				const result = await schema.verifyValue('null', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});

		describe('number', () => {
			it(`should return true when type is 'number' with value -10`, async () => {
				const result = await schema.verifyValue('number', -10);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with value -0`, async () => {
				const result = await schema.verifyValue('number', -0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with value 0`, async () => {
				const result = await schema.verifyValue('number', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with value 1`, async () => {
				const result = await schema.verifyValue('number', 1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with max safe int value`, async () => {
				const result = await schema.verifyValue('number', Number.MAX_SAFE_INTEGER);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with min safe int value`, async () => {
				const result = await schema.verifyValue('number', Number.MIN_SAFE_INTEGER);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with min value`, async () => {
				const result = await schema.verifyValue('number', Number.MIN_VALUE);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with max value`, async () => {
				const result = await schema.verifyValue('number', Number.MAX_VALUE);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'number' with epsilon value`, async () => {
				const result = await schema.verifyValue('number', Number.EPSILON);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(true);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with NaN value`, async () => {
				const result = await schema.verifyValue('number', Number.NaN);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with string value '0'`, async () => {
				const result = await schema.verifyValue('number', '0');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with string value '0.00000000'`, async () => {
				const result = await schema.verifyValue('number', '0.00000000');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with string value '1'`, async () => {
				const result = await schema.verifyValue('number', '1');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with positive infinite value`, async () => {
				const result = await schema.verifyValue('number', Number.POSITIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});

			it(`should return false when type is 'number' with negative infinite value`, async () => {
				const result = await schema.verifyValue('number', Number.NEGATIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(false);
				expect(result.ok()).toBe(true);
			});
		});
	});

	describe('Schema', () => {
		describe('verify', () => {
			it(`should fail with code when data arg is undefined`, async () => {
				const result = await schema.verify(undefined as any, base);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}.verify`)
				);
			});

			it(`should fail with code when data arg is null`, async () => {
				const result = await schema.verify(null as any, base);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}.verify`)
				);
			});

			it(`should fail with code when base arg is undefined`, async () => {
				const result = await schema.verify(sampleData, undefined as any);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_argument', `${schema.schemaName}.verify`, 'base')
				);
			});

			it(`should fail with code when base arg is undefined`, async () => {
				const result = await schema.verify(sampleData, undefined as any);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_argument', `${schema.schemaName}.verify`, 'base')
				);
			});

			it(`should fail with code when input is undefined`, async () => {
				const result = await schema.verify(undefined as any, base);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}.verify`)
				);
			});

			it(`should fail with code when input is null`, async () => {
				const result = await schema.verify(null as any, base);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}.verify`)
				);
			});

			it(`should fail with code when input is an empty object`, async () => {
				const result = await schema.verify(EMPTY_OBJECT, base);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('empty_schema_object', `${schema.schemaName}.verify`)
				);
			});

			it(`should return true when all properties match the schema`, async () => {
				const result = await schema.verify(sampleData, base);

				expect(result.ok()).toBe(true);
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});

			it(`should return false when a schema property is missing`, async () => {
				sampleData.bool1 = undefined as any;
				const result = await schema.verify(sampleData, base);

				expect(result.ok()).toBe(false);
			});
		});
	});
});
