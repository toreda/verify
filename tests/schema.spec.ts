import {Levels, Log} from '@toreda/log';
import {schemaError} from '../src/schema/error';
import {Schema} from '../src/schema';
import {stringValue} from '@toreda/strong-types';
import {type SchemaParseInit} from '../src/schema/parse/init';
import {schemaParse} from '../src/schema/parse';
import {type SchemaData} from '../src/schema/data';
import {type Primitive} from '@toreda/types';
import {type SchemaOutputFactory} from '../src/schema/output/factory';
import {Fate} from '@toreda/fate';

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
					types: 'string'
				},
				{
					name: 'int1',
					types: 'number'
				},
				{
					name: 'bool1',
					types: 'boolean'
				}
			],
			options: {}
		});
	}
}

describe('schemaParse', () => {
	let sampleData: SampleData;
	let sampleSchema: SampleSchema;
	let init: SchemaParseInit<Primitive, SampleData, SampleData>;
	let base: Log;
	let basicFactory: SchemaOutputFactory<Primitive, SampleData>;

	beforeAll(() => {
		basicFactory = async (
			input: Map<string, Primitive>,
			_base: Log
		): Promise<Fate<SampleData | null>> => {
			const fate = new Fate<SampleData | null>();

			fate.data = {
				bool1: false,
				int1: 0,
				str1: ''
			};

			// The factory's job is to map a validated data object onto
			// the desired type. Validation is already complete and only
			// transformation happens at this step.
			for (const [id, value] of input.entries()) {
				fate.data[id] = value;
			}

			return fate.setSuccess(true);
		};

		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});
		sampleSchema = new SampleSchema();
	});

	beforeEach(() => {
		sampleData = {
			bool1: false,
			int1: 11,
			str1: 'one'
		};

		init = {
			data: sampleData,
			schema: sampleSchema,
			options: {},
			factory: basicFactory,
			base: base
		};
	});

	describe('Parsing', () => {
		it(`should fail with code when provided data is an empty object`, async () => {
			const result = await schemaParse<Primitive, SampleData, SampleData>({
				data: EMPTY_OBJECT as any,
				schema: sampleSchema,
				base: base,
				factory: basicFactory
			});

			expect(result.success()).toBe(false);
		});

		it(`should fail with code when a data field is undefined`, async () => {
			sampleData.int1 = undefined as any;

			const result = await schemaParse<Primitive, SampleData, SampleData>({
				data: sampleData,
				schema: sampleSchema,
				factory: basicFactory,
				base: base
			});

			expect(result.success()).toBe(false);
		});

		it(`should succeed when all properties match schema requirements`, async () => {
			sampleData.bool1 = true;
			sampleData.int1 = 70714;
			sampleData.str1 = '149714';

			const result = await schemaParse<Primitive, SampleData, SampleData>({
				data: sampleData,
				schema: sampleSchema,
				base: base,
				factory: basicFactory
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.success()).toBe(true);
		});

		describe('Types', () => {
			describe('unsupported', () => {
				it(`should fail when field type is not supported`, async () => {
					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('int1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.types = 'aaaaa' as any;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: customSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.errorCode()).toBe(
						schemaError('unsupported_type:aaaaa', 'validateField:int1')
					);
					expect(result.success()).toBe(false);
				});
			});

			describe('strings', () => {
				it(`should use schema validated strings in output`, async () => {
					const expectedOutput = '9712497141';

					sampleData.str1 = expectedOutput;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: sampleSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.data?.str1).toBe(expectedOutput);
					expect(result.success()).toBe(true);
				});

				it(`should use schema validated empty strings in output`, async () => {
					const expectedOutput = '';

					sampleData.str1 = expectedOutput;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: sampleSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.data?.str1).toBe(expectedOutput);
					expect(result.success()).toBe(true);
				});

				it(`should fail when value is null and nullable is disabled`, async () => {
					sampleData.str1 = null as any;

					const customSchema = new SampleSchema();
					customSchema.fields.set('str1', {
						name: 'str1',
						nullable: false,
						types: 'string'
					});

					const field = customSchema.fields.get('str1');
					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.nullable = false;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: customSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.success()).toBe(false);
				});

				it(`should succeed when value is a null and nullable is enabled`, async () => {
					sampleData.str1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('str1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.nullable = true;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: customSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.success()).toBe(true);
				});
			});

			describe('booleans', () => {
				it(`should use schema validated booleans with strict true value in output`, async () => {
					const expectedOutput = true;

					sampleData.bool1 = expectedOutput;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: sampleSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.success()).toBe(true);
				});

				it(`should use schema validated booleans with strict false value in output`, async () => {
					const expectedOutput = false;

					sampleData.bool1 = expectedOutput;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: sampleSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.success()).toBe(true);
				});

				it(`should fail when value is a truthy non-boolean`, async () => {
					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}
					sampleData.bool1 = 1 as any;

					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: sampleSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.success()).toBe(false);
				});

				it(`should fail when value is null and nullable is disabled`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.nullable = false;

					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: customSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.errorCode()).toBe(
						schemaError('null_field_value_disallowed', 'SampleSchema:bool1')
					);
					expect(result.success()).toBe(false);
				});

				it(`should succeed when value is null and nullable is enabled`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema();
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.nullable = true;
					const result = await schemaParse<Primitive, SampleData, SampleData>({
						data: sampleData,
						schema: customSchema,
						base: base,
						factory: basicFactory
					});

					expect(result.errorCode()).toBe(EMPTY_STRING);
					expect(result.success()).toBe(true);
				});
			});
		});
	});

	describe('parse', () => {
		it(`should fail when data arg is undefined`, async () => {
			const customSchema = new SampleSchema();
			const result = await customSchema.parse(undefined as any, basicFactory, base);

			expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'data'));
			expect(result.success()).toBe(false);
		});
	});

	describe('validateField', () => {
		it(`should fail when value is null and nullable is disabled`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema();
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.nullable = false;
			field.name = '__field_name__';
			const result = await customSchema.validateField(typeof field.name, field, null);

			expect(result.errorCode()).toBe(
				schemaError('null_field_value_disallowed', customSchema.schemaName, typeof field.name)
			);
			expect(result.success()).toBe(false);
		});

		it(`should succeed when value is a null and nullable is enabled`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema();
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.nullable = true;
			const fieldName = stringValue(field?.name, '__field_name__');
			const result = await customSchema.validateField(fieldName, field!, null);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.success()).toBe(true);
		});
	});

	describe('validateFieldValue', () => {
		describe('boolean', () => {
			it(`should return true when type is 'boolean' and value is true`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is false`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'boolean' and value is 0`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', 0 as any);
				expect(result.success()).toBe(false);
			});

			it(`should return true when type is 'boolean' and value is 1`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', 1 as any);

				expect(result.success()).toBe(false);
			});

			it(`should return true when type is 'boolean' and value is an empty object`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', {} as any);

				expect(result.success()).toBe(false);
			});

			it(`should return true when type is 'boolean' and value is null`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', null as any);

				expect(result.success()).toBe(false);
			});

			it(`should return true when type is 'boolean' and value is undefined`, async () => {
				const result = await sampleSchema.validateFieldValue('boolean', undefined as any);

				expect(result.success()).toBe(false);
			});
		});

		describe('string', () => {
			it(`should return true when type is 'string' and value is empty string`, async () => {
				const result = await sampleSchema.validateFieldValue('string', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'string' and value is a single char`, async () => {
				const result = await sampleSchema.validateFieldValue('string', 'a');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'string' and value is a short string`, async () => {
				const result = await sampleSchema.validateFieldValue('string', '19714-9194714');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return false when type is 'string' and value is undefined`, async () => {
				const result = await sampleSchema.validateFieldValue('string', undefined as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'string' and value is null`, async () => {
				const result = await sampleSchema.validateFieldValue('string', null as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'string' and value is 0`, async () => {
				const result = await sampleSchema.validateFieldValue('string', 0 as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'string' and value is 1`, async () => {
				const result = await sampleSchema.validateFieldValue('string', 1 as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'string' and value is an empty array`, async () => {
				const result = await sampleSchema.validateFieldValue('string', [] as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'string' and value is an empty object`, async () => {
				const result = await sampleSchema.validateFieldValue('string', {} as any);

				expect(result.success()).toBe(false);
			});
		});

		describe('bigint', () => {
			it(`should return true when type is 'bigint' and value is a BigInt of value 0`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', BigInt('0'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt of value 1`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', BigInt('1'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt with a large number`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', BigInt('9007199254740991'));

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'bigint' and value is a BigInt with a huge octal`, async () => {
				const result = await sampleSchema.validateFieldValue(
					'bigint',
					BigInt('0o377777777777777777')
				);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return false when type is 'bigint' and value is undefined`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', undefined as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'bigint' and value is null`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', null as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'bigint' and value is 0`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', 0 as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'bigint' and value is 1`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', 1 as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'bigint' and value is an empty array`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', [] as any);

				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'bigint' and value is an empty object`, async () => {
				const result = await sampleSchema.validateFieldValue('bigint', {} as any);

				expect(result.success()).toBe(false);
			});
		});

		describe('undefined', () => {
			it(`should return true when type is 'undefined' with value is undefined`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', undefined);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return false when type is 'undefined' with null value`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', null);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value 'undefined'`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', 'undefined');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value 'null'`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', 'null');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value is 0`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value is EMPTY_STRING`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value is true`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'undefined' with value is false`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});
		});

		describe('null', () => {
			it(`should return true when type is 'null' with value is null`, async () => {
				const result = await sampleSchema.validateFieldValue('null', null);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return false when type is 'undefined' with value 'null'`, async () => {
				const result = await sampleSchema.validateFieldValue('undefined', 'null');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'null' with value is undefined`, async () => {
				const result = await sampleSchema.validateFieldValue('null', undefined);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'null' with value is 0`, async () => {
				const result = await sampleSchema.validateFieldValue('null', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'null' with value is EMPTY_STRING`, async () => {
				const result = await sampleSchema.validateFieldValue('null', EMPTY_STRING);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'null' with value is true`, async () => {
				const result = await sampleSchema.validateFieldValue('null', true);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'null' with value is false`, async () => {
				const result = await sampleSchema.validateFieldValue('null', false);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});
		});

		describe('number', () => {
			it(`should return true when type is 'number' with value -10`, async () => {
				const result = await sampleSchema.validateFieldValue('number', -10);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with value -0`, async () => {
				const result = await sampleSchema.validateFieldValue('number', -0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with value 0`, async () => {
				const result = await sampleSchema.validateFieldValue('number', 0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with value 1`, async () => {
				const result = await sampleSchema.validateFieldValue('number', 1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with max safe int value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.MAX_SAFE_INTEGER);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with min safe int value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.MIN_SAFE_INTEGER);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with min value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.MIN_VALUE);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with max value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.MAX_VALUE);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return true when type is 'number' with epsilon value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.EPSILON);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(true);
			});

			it(`should return false when type is 'number' with NaN value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.NaN);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'number' with string value '0'`, async () => {
				const result = await sampleSchema.validateFieldValue('number', '0');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'number' with string value '0.00000000'`, async () => {
				const result = await sampleSchema.validateFieldValue('number', '0.00000000');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'number' with string value '1'`, async () => {
				const result = await sampleSchema.validateFieldValue('number', '1');

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'number' with positive infinite value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.POSITIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});

			it(`should return false when type is 'number' with negative infinite value`, async () => {
				const result = await sampleSchema.validateFieldValue('number', Number.NEGATIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.success()).toBe(false);
			});
		});
	});

	describe('Schema', () => {
		describe('parse', () => {
			it(`should fail with code when data arg is undefined`, async () => {
				const result = await sampleSchema.parse(undefined as any, basicFactory, base);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'data'));
			});

			it(`should fail with code when data arg is null`, async () => {
				const result = await sampleSchema.parse(null as any, basicFactory, base);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'data'));
			});

			it(`should fail with code when factory arg is undefined`, async () => {
				const result = await sampleSchema.parse(sampleData, undefined as any, base);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'factory'));
			});

			it(`should fail with code when factory arg is null`, async () => {
				const result = await sampleSchema.parse(sampleData, null as any, base);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'factory'));
			});


			it(`should fail with code when base arg is undefined`, async () => {
				const result = await sampleSchema.parse(sampleData, basicFactory, undefined as any);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'base'));
			});

			it(`should fail with code when base arg is undefined`, async () => {
				const result = await sampleSchema.parse(sampleData, basicFactory, undefined as any);

				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_argument', 'schema.parse', 'base'));
			});

		});
	});
});
