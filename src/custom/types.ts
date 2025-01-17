/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2025 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import {Log} from '@toreda/log';
import {type SchemaData} from '../schema/data';
import {type CustomTypesInit} from './types/init';
import {type CustomTypeVerifier} from './type/verifier';
import {Fate} from '@toreda/fate';
import {schemaError} from '../schema/error';
import {type CustomSchemaVerify} from './schema/verify';
import {type Resettable} from '@toreda/types';
import {type CustomSchemaType} from './schema/type';
import {Schema} from '../schema';
import {type SchemaVerified} from '../schema/verified';
import {Tracer} from '../tracer';
import {type CustomType} from './type';
import {stringValue} from '@toreda/strong-types';
import {type SchemaId} from '../schema/id';

/**
 * Custom type registration for a single schema instance.
 *
 * @category Schemas Custom Types
 */
export class CustomTypes<DataT, InputT extends SchemaData<DataT>, TransformedT = InputT>
	implements Resettable
{
	public readonly log: Log;
	public readonly schemas: Map<SchemaId, CustomSchemaType<DataT, SchemaData<DataT>, unknown>>;
	public readonly verifiers: Map<string, CustomType<DataT, SchemaData<DataT>, unknown>>;

	constructor(init: CustomTypesInit<DataT, InputT>) {
		this.schemas = new Map<SchemaId, CustomSchemaType<DataT, SchemaData<DataT>, unknown>>();
		this.verifiers = new Map<string, CustomType<DataT, SchemaData<DataT>, unknown>>();
		this.log = init.base.makeLog('customTypes');

		this.registerSchemas(init?.schemas);
	}

	/* 	public registerTypes(data?: CustomTypesData<DataT, InputT, TransformedT> | null): void {
		const log = this.log.makeLog('registerTypes');

		if (!data) {
			return;
		}

		const keys = Object.keys(data);

		for (const key of keys) {
			const o = data[key];
			if (this.isCustomVerifier(o)) {
				const _result = this.registerVerifier(key, o);
			} else if (this.isSchema(o)) {
				const _result = this.registerSchema(key, o);
			} else {
				log.error(`Custom type registration error for '${key}'.`);
			}
		}
	} */

	public registerSchemas(
		items?: Record<SchemaId, CustomSchemaType<DataT, SchemaData<DataT>, unknown>>
	): void {
		const log = this.log.makeLog('registerTypes');

		if (!items) {
			return;
		}

		const keys = Object.keys(items);

		for (const key of keys) {
			const item = items[key];
			if (this.isSchema(item)) {
				const _result = this.registerSchema(key, item);
			} else {
				log.error(`Custom type registration error for '${key}'.`);
			}
		}
	}

	public registerVerifiers(): void {}

	/**
	 * Is `id` is a registered custom type schema. Doesn't return true
	 * when `id`is registered with a non-schema.
	 *
	 * @param id
	 */
	public hasSchema(id: string): boolean {
		if (!this.schemas.has(id)) {
			return false;
		}

		const o = this.schemas.get(id);
		if (typeof o === 'function') {
			return false;
		}

		return this.isSchema(o);
	}

	/**
	 * Check whether `id` is a registered custom type schema. Doesn't return true
	 * when `id`is registered with a non-schema.
	 * @param id
	 */
	public hasVerifier(id: string): boolean {
		if (!this.verifiers.has(id)) {
			return false;
		}

		const o = this.verifiers.get(id);

		return typeof o === 'function';
	}

	public registerVerifier(id: string, custom: CustomTypeVerifier<DataT>): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		if (this.verifiers.has(id)) {
			return false;
		}

		if (typeof custom !== 'function') {
			return false;
		}

		this.verifiers.set(id, custom);
		return true;
	}

	public registerSchema(id: string, custom: CustomSchemaType<DataT, SchemaData<DataT>, unknown>): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		if (this.schemas.has(id)) {
			return false;
		}

		if (!this.isSchema(custom)) {
			return false;
		}

		this.schemas.set(id, custom);
		return true;
	}

	public getVerifier(id?: string): CustomTypeVerifier<unknown> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const o = this.verifiers.get(id);

		return typeof o === 'function' ? o : null;
	}

	public has(type: string): boolean {
		return this.schemas.has(type) || this.verifiers.has(type);
	}

	public getSchema(id?: string): CustomSchemaType<DataT, InputT, TransformedT> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const o = this.schemas.get(id);
		if (!this.isSchema(o)) {
			return null;
		}

		return o;
	}

	public isCustomVerifier(o: unknown): o is CustomTypeVerifier<DataT> {
		return typeof o === 'function';
	}

	public isSchema(o: unknown): o is Schema<DataT, InputT, TransformedT> {
		if (!o) {
			return false;
		}

		if (typeof o === 'function') {
			return false;
		}

		const schema = o as Schema<DataT, InputT, TransformedT>;
		return typeof schema?.verify === 'function';
	}

	public async verifyValue(
		id: string,
		type: string,
		_value: unknown,
		_base: Log
	): Promise<Fate<DataT | SchemaVerified<DataT>>> {
		const fate = new Fate<DataT | SchemaVerified<DataT>>();

		const _verifier = this.getVerifier(type);
		return fate;
	}

	public async verify(init: CustomSchemaVerify<DataT>): Promise<Fate<SchemaVerified<DataT>>> {
		const fate = new Fate<SchemaVerified<DataT>>();
		const schema = this.getSchema(init.valueType.typeId);
		const tracer = init.tracer ?? new Tracer();

		if (!init.flags) {
			init.flags = {};
		}

		const name = stringValue(init.schemaId, 'schema');
		if (!schema) {
			return fate.setErrorCode(schemaError('missing_schema_typeId', tracer.child(name).current()));
		}

		return schema.verify(init);
	}

	/**
	 * Reset all properties to their initial values.
	 */
	public reset(): void {
		// Clear all registered types.
		this.schemas.clear();
		this.verifiers.clear();
	}
}
