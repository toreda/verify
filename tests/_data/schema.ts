import {Log} from '@toreda/log';
import {Schema} from '../../src/schema';
import {type Primitive} from '@toreda/types';
import {type SchemaData} from '../../src/schema/data';
import {type SchemaInit} from '../../src/schema/init';
import {type SchemaOptions} from '../../src/schema/options';

export interface SampleBData extends SchemaData<string | number> {
	str2b: string;
	int2b: number;
}

export class SampleSchemaSubB extends Schema<string | number, SampleBData, SampleBData> {
	constructor(base: Log) {
		super({
			name: 'SubSchemaB',
			fields: [
				{
					name: 'str2b',
					types: ['string']
				},
				{
					name: 'int2b',
					types: ['number']
				}
			],
			options: {},
			base: base,
			parentPath: ['SubSchemaA']
		});
	}
}

export interface SampleAData extends SchemaData<Primitive | SampleBData> {
	str1a: string;
	int1a: number;
	intArray: number[];
	boolArray?: boolean[];
	strArray?: string[];
	subSchema: SampleBData;
	subSchemas?: SampleBData[];
}

const sampleBData: SampleBData = {
	int2b: 14555,
	str2b: '18-29729275'
};

export class SampleSchemaSubA extends Schema<Primitive | SampleBData, SampleAData, SampleAData> {
	constructor(schemaB: SampleSchemaSubB, base: Log) {
		super({
			name: 'SubSchemaA',
			fields: [
				{
					name: 'str1a',
					types: ['string']
				},
				{
					name: 'int1a',
					types: ['number']
				},
				{
					name: 'intArray',
					types: ['number[]']
				},
				{
					name: 'strArray',
					types: ['string[]', 'undefined']
				},
				{
					name: 'boolArray',
					types: ['boolean[]', 'undefined']
				},
				{
					name: 'subSchema',
					types: ['ct2', 'undefined']
				},
				{
					name: 'subSchemas',
					types: ['ct2[]', 'undefined']
				}
			],
			custom: {
				schemas: {
					ct2: schemaB
				}
			},
			base: base
		});
	}
}

export interface SampleData extends SchemaData<Primitive> {
	str1: string;
	int1: number;
	bool1: boolean;
}

export class SimpleSchema extends Schema<Primitive, SampleData> {
	constructor(base: Log, options?: SchemaOptions) {
		super({
			name: 'SimpleSchema',
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
			options: options,
			base: base
		});
	}
}

export class SampleSchema extends Schema<Primitive | SampleSchemaSubB, SampleData> {
	constructor(init: SchemaInit<Primitive | SampleSchemaSubB, SampleData, SampleData>) {
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
			options: init?.options,
			base: init.base
		});
	}
}

export class SampleRulesetSchema extends Schema<Primitive, SampleData, SampleData> {
	constructor(init: SchemaInit<Primitive, SampleData, SampleData>) {
		super(init);
	}
}
