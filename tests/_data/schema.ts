import {Log} from '@toreda/log';
import {Schema} from '../../src/schema';
import {type Primitive} from '@toreda/types';
import {type SchemaData} from '../../src/schema/data';
import {type SchemaInit} from '../../src/schema/init';

export interface SampleBData extends SchemaData<Primitive> {
	str2b: string;
	int2b: number;
}

export interface SampleAData extends SchemaData<Primitive> {
	str1a: string;
	int1a: number;
	intArray: number[];
	boolArray?: boolean[];
	strArray?: string[];
	subSchema: SampleBData;
	subSchemas?: SampleBData[];
}

export class SampleSchemaSubB extends Schema<Primitive, SampleData, SampleData> {
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

export class SampleSchemaSubA extends Schema<Primitive, SampleAData, SampleAData> {
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
			customTypes: {
				ct2: schemaB
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

export class SampleSchema extends Schema<Primitive, SampleData> {
	constructor(init: SchemaInit<Primitive, SampleData>) {
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
