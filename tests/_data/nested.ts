import {type Primitive} from '@toreda/types';
import {type SchemaData} from '../../src';
import {Schema} from '../../src/schema';
import {Log} from '@toreda/log';

export type NestedRootTypes = Primitive | string[];

export interface NestedRootData extends SchemaData<NestedRootTypes> {}

export class NestedRootSchema extends Schema<NestedRootTypes, NestedRootData, NestedRootData> {
	constructor(base: Log) {
		super({
			name: 'NestedRootSchema',
			custom: {},
			fields: [
				{name: 'type', types: ['string']},
				{name: 'title', types: ['string']}
			],
			base: base
		});
	}
}
