import {Levels, Log} from '@toreda/log';
import {SampleAData, SampleBData, SampleSchema, SampleSchemaSubA, SampleSchemaSubB} from '../_data/schema';
import {schemaError} from '../../src/schema/error';
import {SchemaPath} from '../../src/schema/path';

const EMPTY_OBJECT = {};
const EMPTY_STRING = '';

describe('Schema - Recursive Parsing', () => {
	let base: Log;

	describe('Basic Input', () => {
		let schemaSubA: SampleSchemaSubA;
		let schemaSubB: SampleSchemaSubB;
		let bData: SampleBData;
		let aData: SampleAData;
		let schema: SampleSchema;
		let schemaPath: SchemaPath;

		beforeAll(() => {
			base = new Log({
				globalLevel: Levels.ALL,
				groupsStartEnabled: true,
				consoleEnabled: true
			});
			schemaSubB = new SampleSchemaSubB(base);
			schemaSubA = new SampleSchemaSubA(schemaSubB, base);
			schema = new SampleSchema(base);
			schemaPath = new SchemaPath();
		});

		beforeEach(() => {
			bData = {
				str2b: 'bbb',
				int2b: 111
			};

			aData = {
				int1a: 31,
				str1a: 'aaa',
				subValue: {
					str2b: 'zzzzz',
					int2b: 9999
				}
			};
		});

		it(`should recursively verify all properties`, async () => {
			const result = await schemaSubA.verify({
				id: 'aaa',
				data: aData,
				base: base,
				path: schemaPath
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
				base: base,
				path: schemaPath
			});

			//base.debug(`aData: ${JSON.stringify(aData)}`);
			expect(result.errorCode()).toBe(
				schemaError('field_does_not_support_value_type:string', `SubSchemaA.SubSchemaB.subValue`)
			);
			expect(result.ok()).toBe(false);
		});
	});
});
