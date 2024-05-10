/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2024 Toreda, Inc.
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
import {Schema} from '../schema';
import {type SchemaData} from '../schema/data';
import {type CustomTypesInit} from './types/init';
import {type CustomTypesData} from './types/data';
import {type CustomTypeVerifier} from './type/verifier';
import {Fate} from '@toreda/fate';
import {schemaError} from '../schema/error';

/**
 * @category Schemas - Custom Types
 */
export class CustomTypes<DataT, InputT extends SchemaData<DataT>, VerifiedT = InputT> {
	public readonly log: Log;
	public readonly registered: Map<string, Schema<unknown, SchemaData<unknown>>>;

	constructor(init: CustomTypesInit) {
		this.registered = new Map<string, Schema<unknown, SchemaData<unknown>>>();
		this.log = init.base.makeLog('schemaTypes');

		this.registerTypes(init.data);
	}

	public registerTypes(data?: CustomTypesData): void {
		if (!data) {
			return;
		}

		const keys = Object.keys(data);

		for (const key of keys) {
			const result = this.register(key, data[key]);
			if (!result) {
				this.log.error(`Error in custom type registration for '${key}'.`);
			}
		}
	}

	public has(id: string): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		return this.registered.has(id);
	}

	public hasSchema(id: string): boolean {
		if (!this.has(id)) {
			return false;
		}

		const o = this.registered.get(id);

		return typeof o?.verify === 'function';
	}

	public hasVerifier(id: string): boolean {
		if (!this.has(id)) {
			return false;
		}

		const o = this.registered.get(id);

		return typeof o === 'function';
	}

	public register(id: string, schema: Schema<unknown, SchemaData<unknown>>): boolean {
		if (typeof id !== 'string') {
			return false;
		}

		if (this.registered.has(id)) {
			return false;
		}

		if (!schema) {
			return false;
		}

		this.registered.set(id, schema);
		return true;
	}

	public get(id: string): Schema<unknown, SchemaData<unknown>> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const schema = this.registered.get(id);

		return schema ? schema : null;
	}

	public getVerifier(id: string): CustomTypeVerifier<DataT> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const o = this.registered.get(id);

		return typeof o === 'function' ? o : null;
	}

	public getSchema(id: string): Schema<unknown, SchemaData<unknown>> | null {
		if (typeof id !== 'string') {
			return null;
		}

		const schema = this.registered.get(id);
		if (typeof schema?.verify !== 'function') {
			return null;
		}

		return schema;
	}

	public async verifyValue(type: string, value: unknown, base: Log): Promise<Fate<DataT>> {
		const fate = new Fate<DataT>();
zzs
		const verifier = this.getVerifier(type);
		return fate;
	}

	public async verifySchema(
		type: string,
		value: SchemaData<DataT>,
		base: Log
	): Promise<Fate<SchemaData<unknown>>> {
		const fate = new Fate<SchemaData<unknown>>();
		const schema = this.getSchema(type);

		if (!schema) {
			return fate.setErrorCode(schemaError('missing_custom_type_schema', type));
		}

		return schema.verify(value, base);
	}
}
