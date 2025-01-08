import {Levels, Log} from '@toreda/log';
import {CustomTypes} from '../../src/custom/types';
import {type SampleData, SimpleSchema} from '../_data/schema';
import {type Primitive} from '@toreda/types';
import {type CustomTypeVerifier} from '../../src/custom/type/verifier';
import {Fate} from '@toreda/fate';
import {type SchemaInit} from '../../src/schema/init';
import {CustomSchemaVerify} from '../../src/custom/schema/verify';
import {schemaError} from '../../src';
import {schemaFieldValueType} from '../../src/schema/field/value/type';

describe('CustomTypes', () => {
	let base: Log;
	let init: SchemaInit<Primitive, SampleData, SampleData>;
	let instance: CustomTypes<Primitive, SampleData, SampleData>;
	let sampleSchema: SimpleSchema;
	let typeVerifier: CustomTypeVerifier<any>;
	let verifyInit: CustomSchemaVerify<any>;

	beforeAll(() => {
		typeVerifier = async (): Promise<Fate<any>> => {
			const fate = new Fate<any>();

			return fate.setSuccess(true);
		};

		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});

		instance = new CustomTypes({
			base: base
		});
	});

	beforeEach(() => {
		sampleSchema = new SimpleSchema(base, {
			strict: false
		});
		instance.reset();
		init = {
			name: 'SimpleSchema',
			base: base,
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
			]
		};

		verifyInit = {
			data: {},
			base: base,
			id: 'sampleSchema',
			typeId: 'aaaa',
			valueType: schemaFieldValueType('sampleSchema')!
		};
	});

	describe('Constructor', () => {
		it(`should not throw when init.data is undefuned`, () => {
			expect(() => {
				const _ctor = new CustomTypes({
					base: base
				});
			}).not.toThrow();
		});

		it(`should not throw when init.data is null`, () => {
			expect(() => {
				const _ctor = new CustomTypes({
					base: base,
					data: null as any
				});
			}).not.toThrow();
		});

		it(`should register types provided by init.data`, () => {
			const schema = new SimpleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt4: schema
				}
			});

			expect(custom.has('bt4')).toBe(true);
		});

		it(`should register schema provided by init.data`, () => {
			const schema = new SimpleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt8: schema
				}
			});

			expect(custom.has('bt8')).toBe(true);
			const result = custom.getSchema('bt8');
			expect(result).not.toBeUndefined();
			expect(result).toBe(schema);
		});

		it(`should start with no custom types registered when customType init data is an empty object`, () => {
			const custom = new CustomTypes({
				base: base,
				data: {}
			});

			expect(custom.registered.size).toBe(0);
		});
	});

	describe('Implementation', () => {
		describe('has', () => {
			it('should return false when id arg is undefined', () => {
				instance.registered.set('a', sampleSchema);
				instance.registered.set('b', sampleSchema);

				expect(instance.registered.size).toBe(2);
				const result = instance.has(undefined as any);
				expect(result).toBe(false);
			});

			it('should return false when id arg is null', () => {
				instance.registered.set('a', sampleSchema);
				instance.registered.set('b', sampleSchema);

				expect(instance.registered.size).toBe(2);
				const result = instance.has(null as any);
				expect(result).toBe(false);
			});

			it('should return false when id is not a registered type', () => {
				instance.registered.set('a', sampleSchema);
				instance.registered.set('b', sampleSchema);

				expect(instance.registered.size).toBe(2);
				const result = instance.has('c');
				expect(result).toBe(false);
			});

			it('should return true when id is a registered schema', () => {
				instance.registered.set('a', sampleSchema);
				instance.registered.set('b', sampleSchema);

				expect(instance.registered.size).toBe(2);
				const result = instance.has('a');
				expect(result).toBe(true);
			});

			it('should return true when id is a registered verifier', () => {
				instance.registered.set('a', sampleSchema);
				instance.registered.set('b', typeVerifier);

				expect(instance.registered.size).toBe(2);
				const result = instance.has('b');
				expect(result).toBe(true);
			});
		});

		describe('getVerifier', () => {
			it(`should return null when no registered verifier matching id`, async () => {
				expect(instance.registered.size).toBe(0);
				expect(instance.getVerifier('aaaaaaaa9715947597337943')).toBeNull();
			});

			it(`should return null when id arg is null`, () => {
				expect(instance.getVerifier(null as any)).toBeNull();
			});

			it(`should return null when id arg is undefined`, () => {
				expect(instance.getVerifier(undefined)).toBeNull();
			});

			it(`should return null when registered id matches a schema, not a verifier`, () => {
				const id = 'j41-09008r97359735';
				const sample = new SimpleSchema(base);
				expect(instance.registered.size).toBe(0);
				instance.registerSchema(id, sample);
				expect(instance.registered.size).toBe(1);

				expect(instance.getVerifier(id)).toBeNull();
			});

			it(`should return verifier whehn id matches a valid verifier`, () => {
				const id = 'aa-957359735937';

				const verifier: CustomTypeVerifier<any> = async (): Promise<Fate<boolean>> => {
					const fate = new Fate<boolean>();
					return fate.setSuccess(true);
				};

				expect(instance.registered.size).toBe(0);
				instance.registerVerifier(id, verifier);
				expect(instance.registered.size).toBe(1);

				const result = instance.getVerifier(id);
				expect(typeof result).toBe('function');
				expect(result).toEqual(verifier);
			});
		});

		describe('verify', () => {
			it(`should fail with code when init.typeId is undefined`, async () => {
				//verifyInit.typeId = undefined as any;
				verifyInit.typeId = 'aaa';
				const result = await instance.verify(verifyInit);

				expect(result.ok()).toBe(false);
				expect(result.errorCode()).toBe(schemaError('missing_schema_typeId', 'sampleSchema'));
			});
		});
	});

	describe('reset', () => {
		it(`should clear all registered types`, () => {
			instance.registered.set('aa3', sampleSchema);
			instance.registered.set('aa4', sampleSchema);
			expect(instance.registered.size).toBe(2);

			instance.reset();
			expect(instance.registered.size).toBe(0);
		});
	});
});
