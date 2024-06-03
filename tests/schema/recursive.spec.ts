import {Levels, Log} from '@toreda/log';
import {
	SampleAData,
	SampleBData,
	SampleData,
	SampleSchema,
	SampleSchemaSubA,
	SampleSchemaSubB
} from '../_data/schema';
import {schemaError} from '../../src/schema/error';
import {Tracer} from '../../src/tracer';
import {type SchemaInit} from '../../src';
import {type Primitive} from '@toreda/types';

const EMPTY_STRING = '';

describe('Schema - Recursive Parsing', () => {
	let base: Log;

	describe('Basic Input', () => {
		let schemaSubA: SampleSchemaSubA;
		let schemaSubB: SampleSchemaSubB;
		let sampleData: SampleData;
		let bData: SampleBData;
		let aData: SampleAData;
		let schema: SampleSchema;
		let tracer: Tracer;
		let init: SchemaInit<Primitive, SampleData, SampleData>;

		beforeAll(() => {
			base = new Log({
				globalLevel: Levels.ALL,
				groupsStartEnabled: true,
				consoleEnabled: true
			});

			schemaSubB = new SampleSchemaSubB(base);
			schemaSubA = new SampleSchemaSubA(schemaSubB, base);

			schema = new SampleSchema({
				base: base,
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
					},
					{
						name: 'subschemas',
						types: ['ct2[]', 'undefined']
					}
				],
				customTypes: {
					ct2: schemaSubB
				}
			});
			tracer = new Tracer();
		});

		beforeEach(() => {
			bData = {
				str2b: 'bbb',
				int2b: 111,
				subSchemas: [
					{
						str2b: 'zzzz',
						int2b: 9999
					}
				]
			};

			aData = {
				int1a: 31,
				str1a: 'aaa',
				intArray: [1, 2, 3, 4, 5],
				strArray: ['a', 'b', 'c', 'd'],
				boolArray: [true, true, false, true, false],
				subSchema: {
					str2b: 'zzzzz',
					int2b: 9999
				},
				subSchemas: []
			};
		});

		it(`should recursively verify all properties`, async () => {
			const result = await schemaSubA.verify({
				id: 'aaa',
				data: aData,
				base: base,
				tracer: tracer
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});

		it(`should fail when sub-schema field value doesn't match field type`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);
			aData.subSchema.int2b = 'aaaa' as any;

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(
				schemaError('field_does_not_support_value_type:string', `SubSchemaA.subSchema.int2b`)
			);
			expect(result.ok()).toBe(false);
		});

		it(`should verify a non-recursive array of numbers`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);

			const value: number[] = [3, 1091, 4444, 99171764];
			aData.intArray = value;

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);

			expect(result.data?.intArray).toStrictEqual(value);
		});

		it(`should verify a non-recursive array of booleans`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);

			const value: boolean[] = [false, false, true, false, true, false, false];
			aData.boolArray = value;

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);

			expect(result.data?.boolArray).toStrictEqual(value);
		});

		it(`should verify a non-recursive array of strings`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);

			const value: string[] = ['197145', 'f8108714', 'gg018401'];
			aData.strArray = value;

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);

			expect(result.data?.strArray).toStrictEqual(value);
		});

		it(`should verify a non-recursive array of schemas`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);

			const intSample1 = 4400014;
			const intSample2 = 1100090;
			const strSample1 = 'aaa8914';
			const strSample2 = 'bbb8881';

			aData.subSchemas = [
				{
					int2b: intSample1,
					str2b: strSample1
				},
				{
					int2b: intSample2,
					str2b: strSample2
				}
			];

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);

			expect(result.data?.subSchemas).toHaveLength(2);

			const resultSubA = result.data?.subSchemas![0];
			expect(resultSubA).toEqual({});
			const resultSubB = result.data?.subSchemas![1];
			expect(resultSubB).toBeDefined();

			expect(resultSubA?.int2b).toBe(intSample1);
			expect(resultSubA?.str2b).toBe(strSample1);

			expect(resultSubB?.int2b).toBe(intSample1);
			expect(resultSubB?.str2b).toBe(strSample1);
		});
	});
});
