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
import {Log} from '@toreda/log';
import {schemaError} from '../schema/error';
import {type Verified} from '../verified';
import {type VerifiedMap} from '../verified/map';
import {type VerifiedArray} from '../verified/array';

/**
 * Default transformer when one isn't provided to a schema. Expects a
 * string -> primitive map and produces a simple object of the same mapping.
 * @param			input
 * @param			base
 *
 * @category		Schema – Transform Output
 */
export async function transformVerified<DataT, TransformedT>(
	input: DataT | VerifiedMap<DataT> | VerifiedArray<DataT>,
	base: Log
): Promise<Fate<TransformedT | null>> {
	const fate = new Fate<TransformedT | null>();

	if (!base) {
		return fate.setErrorCode(schemaError('missing_argument', 'simpleOutputTransform', 'base'));
	}

	const log = base.makeLog('simpleOutputTransform');

	if (!input) {
		return fate.setErrorCode(schemaError('missing_argument', 'simpleOutputTransform', 'input'));
	}

	try {
		const verified: Verified = {};

		for (const [id, field] of input) {
			if (Array.isArray(field)) {
				verified[id] = [];
				for (const item of field) {
				}
			} else {
				if (field instanceof Map) {
					const result = await transformVerified<DataT, TransformedT>(field, base);
					if (result.ok()) {
						verified[id] = result.data;
					} else {
						log.error(`Error in schema output transform ${id}: ${result.errorCode()}`);
						verified[id] = null;
						// TODO: Need tracer here for detailed path info.
					}
				} else {
					verified[id] = field;
				}
			}
		}

		// Error codes may be set during map iteration but don't automatically return.
		// Check for errors before returning.
		if (fate.errorCode()) {
			return fate;
		}

		fate.data = verified as TransformedT;

		fate.setSuccess(true);
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : 'unknown_err_type';
		fate.error(e);
		log.error(`Exception: ${msg}.`);
		fate.setErrorCode(schemaError('exception', 'simpleOutputTransform', `Error: ${msg}`));
	}

	return fate;
}
