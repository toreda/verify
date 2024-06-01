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
						name: 'subschema',
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
				subValues: [
					{
						str2b: 'zzzz',
						int2b: 9999
					}
				]
			};

			aData = {
				int1a: 31,
				str1a: 'aaa',
				subValue: {
					str2b: 'zzzzz',
					int2b: 9999
				},
				subValues: [
					{
						str2b: 'zzzz',
						int2b: 9999
					}
				]
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
			aData.subValue.int2b = 'aaaa' as any;

			const result = await customA.verify({
				data: aData,
				base: base
			});

			expect(result.errorCode()).toBe(
				schemaError('field_does_not_support_value_type:string', `SubSchemaA.subValue.int2b`)
			);
			expect(result.ok()).toBe(false);
		});
	});
});
