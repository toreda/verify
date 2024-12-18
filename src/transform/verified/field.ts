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

import {Fate} from '@toreda/fate';
import {type Transformed} from '../../transformed';
import {Log} from '@toreda/log';
import {type TransformedField} from '../../transformed/field';
import {type VerifiedSchemaField} from '../../verified/schema/field';

/**
 * Default transformer when one isn't provided to a schema. Expects a
 * string -> primitive map and produces a simple object of the same mapping.
 * @param			id
 * @param			data
 * @param			base
 *
 * @category		Schema – Transform Output
 */
export async function transformVerifiedField<DataT = unknown, TransformedT = unknown>(
	id: string,
	data: VerifiedSchemaField<DataT>,
	base: Log
): Promise<Fate<TransformedField<TransformedT>>> {
	const fate = new Fate<TransformedField<TransformedT>>();
	const log = base.makeLog(`${id}`);

	if (Array.isArray(data)) {
		fate.data = [];
		for (const item of data) {
			const result = await transformVerifiedField<DataT, TransformedT>('xxxx', item, log);

			if (result.ok()) {
				fate.data.push(result.data);
			} else {
				log.error(`Error in schema output transform ${id}: ${result.errorCode()}`);
				fate.setErrorCode(result.errorCode());
				break;
			}
		}
	} else if (data instanceof Map) {
		const transformed = {} as Transformed;
		for (const [id, field] of data.entries()) {
			const result = await transformVerifiedField(id, field, log);
			if (result.ok()) {
				transformed[id] = result.data;
			} else {
				transformed[id] = null;
			}
		}

		fate.data = transformed as TransformedT;
	} else {
		// HACK: Should not rely on any. Defeats the purpose of type checking.
		fate.data = data as any;
	}

	if (!fate.errorCode()) {
		fate.setSuccess(true);
	}

	return fate;
}
