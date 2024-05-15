import {Levels, Log} from '@toreda/log';
import {
	SampleAData,
	SampleBData,
	SampleData,
	SampleSchema,
	SampleSchemaSubA,
	SampleSchemaSubB
} from '../_data/schema';
import {schemaError} from '../../src';

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

		beforeAll(() => {
			base = new Log({
				globalLevel: Levels.ALL,
				groupsStartEnabled: true,
				consoleEnabled: true
			});
			schemaSubB = new SampleSchemaSubB(base);
			schemaSubA = new SampleSchemaSubA(schemaSubB, base);
			schema = new SampleSchema(base);
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
			const result = await schemaSubA.verify('aaa', aData, base);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});

		it(`should fail when sub-schema field value doesn't match field type`, async () => {
			const customB = new SampleSchemaSubB(base);
			const customA = new SampleSchemaSubA(customB, base);
			aData.subValue.int2b = 'aaaa' as any;

			const result = await customA.verify(aData, base);

			//base.debug(`aData: ${JSON.stringify(aData)}`);
			expect(result.errorCode()).toBe(
				schemaError('field_does_not_support_value_type:string', `SubSchemaA.SubSchemaB.subValue`)
			);
			expect(result.ok()).toBe(false);
		});
	});
});
