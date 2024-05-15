import {Levels, Log} from '@toreda/log';
import {schemaError} from '../src/schema/error';
import {stringValue} from '@toreda/strong-types';
import {SchemaField} from '../src/schema/field';
import {valueTypeLabel} from '../src/value/type/label';
import {SampleData, SampleSchema, SampleSchemaSubA, SampleSchemaSubB} from './_data/schema';
import {SchemaPath} from '../src/schema/path';

const EMPTY_OBJECT = {};
const EMPTY_STRING = '';

describe('schemaVerify', () => {
	let sampleData: SampleData;
	let schema: SampleSchema;
	let schemaSubA: SampleSchemaSubA;
	let schemaSubB: SampleSchemaSubB;
	let base: Log;
	let schemaPath: SchemaPath;

	beforeAll(() => {
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});
		schemaPath = new SchemaPath();
		schemaSubB = new SampleSchemaSubB(base);
		schemaSubA = new SampleSchemaSubA(schemaSubB, base);
		schema = new SampleSchema(base);
	});

	beforeEach(() => {
		sampleData = {
			bool1: false,
			int1: 11,
			str1: 'one'
		};
		schema.fields.clear();
		schema.fields.set(
			'str1',
			new SchemaField<SampleData>({
				name: 'str1',
				types: ['string'],
				defaultValue: sampleData.str1
			})
		);

		schema.fields.set(
			'int1',
			new SchemaField<SampleData>({
				name: 'int1',
				types: ['number'],
				defaultValue: sampleData.int1
			})
		);

		schema.fields.set(
			'bool1',
			new SchemaField<SampleData>({
				name: 'bool1',
				types: ['boolean'],
				defaultValue: sampleData.bool1
			})
		);

		schemaPath.path.length = 0;
	});

	describe('Parsing', () => {
		it(`should fail with code when provided data is an empty object`, async () => {
			const result = await schema.verify({
				data: EMPTY_OBJECT as any,
				path: schemaPath,
				base: base
			});

			expect(result.ok()).toBe(false);
		});

		it(`should fail with code when a data field is undefined`, async () => {
			sampleData.int1 = undefined as any;

			const result = await schema.verify({
				data: sampleData,
				path: schemaPath,
				base: base
			});

			expect(result.ok()).toBe(false);
		});

		it(`should succeed when all properties match schema requirements`, async () => {
			sampleData.bool1 = true;
			sampleData.int1 = 70714;
			sampleData.str1 = '149714';

			const result = await schema.verify({
				data: sampleData,
				base: base,
				path: schemaPath
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});

		describe('Types', () => {
			describe('unsupported', () => {
				it(`should fail when schema does not support field type`, async () => {
					const customSchema = new SampleSchema(base);
					const field = customSchema.fields.get('int1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.types.length = 0;
					const fieldType = 'aaaaa' as any;
					field.types.push(fieldType);
					const result = await customSchema.verify({
						data: sampleData,
						base: base,
						path: schemaPath
					});

					expect(result.errorCode()).toBe(
						schemaError(
							`field_does_not_support_type:${fieldType}`,
							`${schema.schemaName}.${field.name}`
						)
					);
					expect(result.ok()).toBe(false);
				});
			});

			describe('strings', () => {
				it(`should use schema validated strings in output`, async () => {
					const expectedOutput = '7r9197-1919872';

					sampleData.str1 = expectedOutput;
					const result = await schema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});

					expect(result.data?.str1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should use schema validated empty strings in output`, async () => {
					const expectedOutput = '';

					sampleData.str1 = expectedOutput;
					const result = await schema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});

					expect(result.ok()).toBe(true);
					expect(result.data?.str1).toBe(expectedOutput);
				});

				it(`should succeed when value is a null and null values are allowed`, async () => {
					sampleData.str1 = null as any;

					const customSchema = new SampleSchema(base);
					const field = customSchema.fields.get('str1');
					field?.types.push('null');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					const result = await customSchema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});

					expect(result.ok()).toBe(true);
				});
			});

			describe('booleans', () => {
				it(`should use schema validated booleans with strict true value in output`, async () => {
					const expectedOutput = true;

					sampleData.bool1 = expectedOutput;
					const field = schema.fields.get('bool1');
					field?.types.push('null');
					const result = await schema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});

					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should use schema validated booleans with strict false value in output`, async () => {
					const expectedOutput = false;

					sampleData.bool1 = expectedOutput;
					const result = await schema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});
					expect(result.data).not.toBeNull();
					expect(result.data?.bool1).toBe(expectedOutput);
					expect(result.ok()).toBe(true);
				});

				it(`should fail when value is a truthy non-boolean`, async () => {
					const customSchema = new SampleSchema(base);
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}
					sampleData.bool1 = 1 as any;
					const result = await customSchema.verify({
						data: sampleData,
						path: schemaPath,
						base: base
					});

					expect(result.ok()).toBe(false);
				});

				it(`should fail when value is null and null is disallowed`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema(base);
					const field = customSchema.fields.get('bool1');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					field.types.length = 0;
					field.types.push('boolean');

					const result = await customSchema.verify({
						id: customSchema.schemaName,
						data: sampleData,
						base: base,
						path: schemaPath
					});

					expect(result.errorCode()).toBe(
						schemaError('field_does_not_support_type:null', `${schema.schemaName}.${field.name}`)
					);
					expect(result.ok()).toBe(false);
				});

				it(`should succeed when field supports nulls`, async () => {
					sampleData.bool1 = null as any;

					const customSchema = new SampleSchema(base);
					const field = customSchema.fields.get('bool1');
					field?.types.push('null');

					if (!field) {
						throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
					}

					const result = await customSchema.verify({
						id: customSchema.schemaName,
						path: schemaPath,
						data: sampleData,
						base: base
					});

					expect(result.errorCode()).toBe(EMPTY_STRING);
					expect(result.ok()).toBe(true);
				});
			});
		});
	});

	describe('verify', () => {
		it(`should fail when data arg is undefined`, async () => {
			const customSchema = new SampleSchema(base);
			const result = await customSchema.verify({
				id: customSchema.schemaName,
				data: undefined as any,
				path: schemaPath,
				base: base
			});

			expect(result.errorCode()).toBe(
				schemaError('missing_schema_data', `${schema.schemaName}`, 'verify', 'init')
			);
			expect(result.ok()).toBe(false);
		});
	});

	describe('verifyField', () => {
		it(`should fail when field argument is undefined`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema(base);
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			const result = await customSchema.verifyField(undefined as any, null, schemaPath, base);

			expect(result.errorCode()).toBe(
				schemaError('missing_field', `${customSchema.schemaName}.${field.name}`)
			);
			expect(result.ok()).toBe(false);
		});

		it(`should fail when value is null and null type is not allowed`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema(base);
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.types.length = 0;
			field.types.push('boolean');
			const result = await customSchema.verifyField(field, null, schemaPath, base);

			expect(result.errorCode()).toBe(
				schemaError('field_does_not_support_type:null', `${customSchema.schemaName}.${field.name}`)
			);
			expect(result.ok()).toBe(false);
		});

		it(`should succeed when value is a null and null is allowed !!`, async () => {
			sampleData.bool1 = null as any;

			const customSchema = new SampleSchema(base);
			const field = customSchema.fields.get('bool1');
			if (!field) {
				throw new Error(`Missing bool1 field in schema '${customSchema.schemaName}`);
			}

			field.types?.push('null');
			const result = await customSchema.verifyField(field!, null, schemaPath, base);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});
	});

	describe('verifyValue', () => {
		describe('boolean', () => {
			it(`should succeed and return value when type is 'boolean' and value is true`, async () => {
				const value = true;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'boolean' and value is false`, async () => {
				const value = false;
				const result = await schema.verifyValue({
					fieldId: 'value',
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'boolean' and value is 0`, async () => {
				const fieldId = 'booleanId';
				const value = 0;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'boolean' and value is 1`, async () => {
				const fieldId = 'booleanId';
				const value = 1;

				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'boolean' and value is an empty object`, async () => {
				const value = {};
				const fieldId = 'booleanId';
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'boolean' and value is null`, async () => {
				const fieldId = 'booleanId';
				const value = null;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'boolean' and value is undefined`, async () => {
				const value = undefined;
				const id = 'boolId';
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'boolean',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});

		describe('string', () => {
			it(`should return value when type is 'string' and value is empty string`, async () => {
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'string',
					value: EMPTY_STRING,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
			});

			it(`should validate successfully and return value when type is 'string' and value is a single char`, async () => {
				const id = 'stringId';
				const value = 'a';
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.data).toBe(value);
				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
			});

			it(`should return true when type is 'string' and value is a short string`, async () => {
				const value = '19714-9194714';
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'string' and value is undefined`, async () => {
				const value = undefined;
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'string' and value is null`, async () => {
				const fieldId = '9714-111';
				const value = null;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'string' and value is 0`, async () => {
				const fieldId = '7710-8411';
				const value = 0;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'string' and value is 1`, async () => {
				const fieldId = '11-1874-47471';
				const value = 1;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
			});

			it(`should fail when type is 'string' and value is an empty array`, async () => {
				const fieldId = '881-4848481';
				const value = [] as unknown[];
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
			});

			it(`should fail when type is 'string' and value is an empty object`, async () => {
				const fieldId = '9891-488411';
				const value = {};
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'string',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
			});
		});

		describe('bigint', () => {
			it(`should succeed and return value when type is 'bigint' and value is a BigInt of value 0`, async () => {
				const value = BigInt('0');
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'bigint' and value is a BigInt of value 1`, async () => {
				const value = BigInt('1');
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.data).toBe(value);
				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'bigint' and value is a BigInt with a large number`, async () => {
				const value = BigInt('9007199254740991');
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.data).toBe(value);
				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'bigint' and value is a BigInt with a huge octal`, async () => {
				const value = BigInt('0o377777777777777777');
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toStrictEqual(value);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'bigint' and value is undefined`, async () => {
				const value = undefined;
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:undefined`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'bigint' and value is null`, async () => {
				const value = null;
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(`field_does_not_support_value_type:null`, `${schema.schemaName}:verifyValue`)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'bigint' and value is 0`, async () => {
				const value = 0;
				const result = await schema.verifyValue({
					fieldId: 'id',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'bigint' and value is 1`, async () => {
				const value = 1;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'bigint',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'bigint' and value is an empty array`, async () => {
				const value: string[] = [];
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'bigint' and value is an empty object`, async () => {
				const value = {};
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'bigint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});

		describe('undefined', () => {
			it(`should succeed when type is 'undefined' when value is undefined`, async () => {
				const value = undefined;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'undefined' with null value`, async () => {
				const value = null;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' with value 'undefined'`, async () => {
				const fieldId = 'undefinedId';
				const value = 'undefined';
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`,
						'verifyValue'
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' with value 'null'`, async () => {
				const fieldId = 'undefinedId';
				const value = 'null';
				const result = await schema.verifyValue({
					fieldType: 'undefined',
					fieldId: fieldId,
					value: value,
					path: schemaPath,
					base: base
				});
				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' with value is 0`, async () => {
				const fieldId = 'undefinedId';
				const value = 0;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' and value is EMPTY_STRING`, async () => {
				const fieldId = 'undefinedId';
				const value = EMPTY_STRING;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' with true value`, async () => {
				const fieldId = 'undefinedId';
				const value = true;
				const result = await schema.verifyValue({
					fieldId: fieldId,
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'undefined' with value is false`, async () => {
				const value = false;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'undefined',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});

		describe('uint', () => {
			it(`should succeed and return value when type is 'uint' and value is 0`, async () => {
				const value = 0;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'uint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'uint' and value is 1`, async () => {
				const value = 1;
				const result = await schema.verifyValue({
					fieldId: 'aaa',
					fieldType: 'uint',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'uint' and value is 100`, async () => {
				const value = 100;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'uint',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'uint' and value is MAX_SAFE_INTEGER`, async () => {
				const value = Number.MAX_SAFE_INTEGER;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'uint',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'uint' and value is -1`, async () => {
				const value = -1;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'uint',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'uint' and value is 1.1`, async () => {
				const id = 'aa41';
				const value = 1.1;
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'uint',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}. ${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});

		describe('null', () => {
			it(`should succeed when value is null and null is allowed`, async () => {
				const value = null;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'null',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBeNull();
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'undefined' with value 'null'`, async () => {
				const id = 'undefinedField';
				const value = 'null';
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'undefined',
					value: 'null',
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'null' with value is undefined`, async () => {
				const id = 'nullField';
				const value = undefined;
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'null',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'null' with value 0`, async () => {
				const id = 'nullField';
				const value = 0;
				const result = await schema.verifyValue({
					fieldType: 'null',
					fieldId: id,
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'null' with value is EMPTY_STRING`, async () => {
				const id = 'nullField';
				const value = EMPTY_STRING;
				const result = await schema.verifyValue({
					fieldId: id,
					fieldType: 'null',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${id}`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'null' with value is true`, async () => {
				const value = true;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'null',
					path: schemaPath,
					value: value,
					base: base
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'null' with value is false`, async () => {
				const value = false;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'null',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});

		describe('number', () => {
			it(`should succeed and return value when type is 'number' with value -10`, async () => {
				const value = -10;
				const result = await schema.verifyValue({
					fieldId: 'aa',
					fieldType: 'number',
					value: value,
					path: schemaPath,
					base: base
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with value -0`, async () => {
				const value = -0;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with value 0`, async () => {
				const value = 0;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with value 1`, async () => {
				const value = 1;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with max safe int value`, async () => {
				const value = Number.MAX_SAFE_INTEGER;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with min safe int value`, async () => {
				const value = Number.MIN_SAFE_INTEGER;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with min value`, async () => {
				const value = Number.MIN_VALUE;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with max value`, async () => {
				const value = Number.MAX_VALUE;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should succeed and return value when type is 'number' with epsilon value`, async () => {
				const value = Number.EPSILON;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.data).toBe(value);
				expect(result.ok()).toBe(true);
			});

			it(`should fail when type is 'number' with NaN value`, async () => {
				const value = Number.NaN;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'number' with string value '0'`, async () => {
				const value = '0';
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'number' with string value '0.00000000'`, async () => {
				const value = '0.00000000';
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'number' with string value '1'`, async () => {
				const value = '1';
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'number' with positive infinite value`, async () => {
				const value = Number.POSITIVE_INFINITY;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: 'aa',
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}:verifyValue`
					)
				);
				expect(result.ok()).toBe(false);
			});

			it(`should fail when type is 'number' with negative infinite value`, async () => {
				const fieldId = '411-88481876';
				const value = Number.NEGATIVE_INFINITY;
				const result = await schema.verifyValue({
					fieldType: 'number',
					fieldId: fieldId,
					value: value,
					base: base,
					path: schemaPath
				});

				expect(result.errorCode()).toBe(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(value)}`,
						`${schema.schemaName}.${fieldId}`
					)
				);
				expect(result.ok()).toBe(false);
			});
		});
	});

	describe('Schema', () => {
		describe('verify', () => {
			it(`should fail with code when data arg is undefined`, async () => {
				const result = await schema.verify({
					data: undefined as any,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}`, 'verify', 'init.data')
				);
			});

			it(`should fail with code when data arg is null`, async () => {
				const result = await schema.verify({
					data: null as any,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}`, 'verify', 'init.data')
				);
			});

			it(`should fail with code when base arg is undefined`, async () => {
				const result = await schema.verify({
					data: sampleData,
					path: schemaPath,
					base: undefined as any
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_argument', `${schema.schemaName}`, 'verify', 'base')
				);
			});

			it(`should fail with code when base arg is undefined`, async () => {
				const result = await schema.verify({
					data: sampleData,
					path: schemaPath,
					base: undefined as any
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_argument', `${schema.schemaName}`, 'verify', 'base')
				);
			});

			it(`should fail with code when input is undefined`, async () => {
				const result = await schema.verify({
					data: undefined as any,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}`, 'verify', 'init.data')
				);
			});

			it(`should fail with code when input is null`, async () => {
				const result = await schema.verify({
					data: null as any,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('missing_schema_data', `${schema.schemaName}`, 'verify', 'init.data')
				);
			});

			it(`should fail with code when input is an empty object`, async () => {
				const result = await schema.verify({
					data: EMPTY_OBJECT,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(
					schemaError('empty_schema_object', `${schema.schemaName}`, 'verify')
				);
			});

			it(`should return true when all properties match the schema`, async () => {
				const result = await schema.verify({
					data: sampleData,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(true);
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});

			it(`should return false when a schema property is missing`, async () => {
				sampleData.bool1 = undefined as any;
				const result = await schema.verify({
					data: sampleData,
					path: schemaPath,
					base: base
				});

				expect(result.ok()).toBe(false);
			});
		});
	});
});
