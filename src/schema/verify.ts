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
import type {SchemaVerifyInit} from './verify/init';
import {type SchemaData} from './data';

/**
 * @category Schemas
 */
export async function schemaVerify<
	DataT,
	InputT extends SchemaData<DataT>,
	OutputT extends SchemaData<DataT>
>(init: SchemaVerifyInit<DataT, InputT, OutputT>): Promise<Fate<OutputT | null>> {
	const fate = new Fate<OutputT | null>();
	const log = init.base.makeLog('schemaVerify');

	if (!init) {
		return fate.setErrorCode(schemaError('missing_init', 'schemaVerify', 'init'));
	}

	if (init.data === null || typeof init.data === 'undefined') {
		return fate.setErrorCode(schemaError('missing_init_property', 'schemaVerify', 'init.data'));
	}

	if (Object.keys(init.data).length === 0) {
		return fate.setErrorCode(schemaError('empty_data_object', 'schemaVerify', 'init.data'));
	}

	if (init.schema === null || typeof init.schema === 'undefined') {
		return fate.setErrorCode(schemaError('missing_init_property', 'schemaVerify', 'init.schema'));
	}

	if (init.transformer === null || typeof init.transformer === 'undefined') {
		return fate.setErrorCode(schemaError('missing_init_property', 'schemaVerify', 'init.transformer'));
	}

	if (typeof init.transformer !== 'function') {
		return fate.setErrorCode(schemaError('nonfunction_transformer', 'schemaVerify', 'init.transformer'));
	}

	return init.schema.verify(init.data, init.transformer, log);
}
