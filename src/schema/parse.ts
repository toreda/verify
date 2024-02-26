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

import {Fate} from '@toreda/fate';
import {schemaError} from './error';
import type {SchemaParseInit} from './parse/init';
import {type SchemaData} from './data';
import {schemaPrimitiveFactory} from './primitive/factory';

/**
 * @returns
 *
 * @category Schemas
 */
export async function schemaParse<InputT extends SchemaData, OutputT extends SchemaData>(
	init: SchemaParseInit<InputT, OutputT>
): Promise<Fate<OutputT | null>> {
	const fate = new Fate<OutputT | null>();
	const log = init.base.makeLog('schemaParse');

	if (!init) {
		return fate.setErrorCode(schemaError('missing_init', 'schemaParse', 'init'));
	}

	if (init.data === null || typeof init.data === 'undefined') {
		return fate.setErrorCode(schemaError('missing_init_property', 'schemaParse', 'init.data'));
	}

	if (Object.keys(init.data).length === 0) {
		return fate.setErrorCode(schemaError('empty_data_object', 'schemaParse', 'init.data'));
	}

	if (init.schema === null || typeof init.schema === 'undefined') {
		return fate.setErrorCode(schemaError('missing_init_property', 'schemaParse', 'init.schema'));
	}

	const factory = typeof init.factory === 'function' ? init.factory : schemaPrimitiveFactory;
q
	return init.schema.parse(init.data, factory, log);
}
