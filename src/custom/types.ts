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
import {type CustomTypesData} from './types/data';
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

/**
 * Custom type registration for a single schema instance.
 *
 * @category Schemas Custom Types
 */
export class CustomTypes<DataT, InputT extends SchemaData<DataT>, TransformedT = InputT>
	implements Resettable
{
	public readonly log: Log;
	public readonly registered: Map<string, CustomType<DataT, InputT, TransformedT>>;

	constructor(init: CustomTypesInit<DataT, InputT, TransformedT>) {
		this.registered = new Map<string, CustomType<DataT, InputT, TransformedT>>();
		this.log = init.base.makeLog('customTypes');

		this.registerTypes(init.data);
	}

	public registerTypes(data?: CustomTypesData<DataT, InputT, TransformedT> | null): void {
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
	}

	/**
	 * Is a Custom Type Schema OR Custom Type verifier registered to `id`? Returns true when
	 * a Schema OR verifier is registered. Use `hasSchema` or `hasVerifier` when a more
	 * specific check is needed.
	 *
	 * @param id
	 */
	public has(id: string): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		return this.registered.has(id);
	}

	/**
	 * Is `id` is a registered custom type schema. Doesn't return true
	 * when `id`is registered with a non-schema.
	 *
	 * @param id
	 */
	public hasSchema(id: string): boolean {
		if (!this.has(id)) {
			return false;
		}

		const o = this.registered.get(id);
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
		if (!this.has(id)) {
			return false;
		}

		const o = this.registered.get(id);

		return typeof o === 'function';
	}

	public registerVerifier(id: string, custom: CustomTypeVerifier<DataT>): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		if (this.registered.has(id)) {
			return false;
		}

		if (typeof custom !== 'function') {
			return false;
		}

		this.registered.set(id, custom);
		return true;
	}

	public registerSchema(id: string, custom: CustomSchemaType<DataT, InputT, TransformedT>): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		if (this.registered.has(id)) {
			return false;
		}

		if (!this.isSchema(custom)) {
			return false;
		}

		this.registered.set(id, custom);
		return true;
	}

	public getVerifier(id?: string): CustomTypeVerifier<DataT> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const o = this.registered.get(id);

		return typeof o === 'function' ? o : null;
	}

	public getSchema(id?: string): CustomSchemaType<DataT, InputT, TransformedT> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const o = this.registered.get(id);
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
		const currPath = tracer.child(init.valueType.typeId);

		init.tracer = tracer;

		if (!schema) {
			return fate.setErrorCode(schemaError('missing_schema_typeId', currPath.current()));
		}

		return schema.verify(init);
	}

	/**
	 * Reset all properties to their initial values.
	 */
	public reset(): void {
		// Clear all registered types.
		this.registered.clear();
	}
}
