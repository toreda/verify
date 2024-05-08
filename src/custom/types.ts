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
import {CustomTypesData} from '../schema/custom/data';

/**
 * @category Schemas
 */
export class CustomTypes {
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
}
