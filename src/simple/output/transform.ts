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
import {schemaError} from '../../schema/error';
import {type Verified} from '../../verified';

/**
 * Default transformer when one isn't provided to a schema. Expects a
 * string -> primitive map and produces a simple object of the same mapping.
 * @param input
 * @param base
 *
 * @category Schemas
 */
export async function simpleOutputTransform<DataT, VerifiedT>(
	input: Map<string, DataT>,
	base: Log
): Promise<Fate<VerifiedT | null>> {
	const fate = new Fate<VerifiedT | null>();

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
			verified[id] = field;
		}

		fate.data = verified as VerifiedT;

		fate.setSuccess(true);
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : 'unknown_err_type';
		fate.error(e);
		log.error(`Exception: ${msg}.`);
		fate.setErrorCode(schemaError('exception', 'simpleOutputTransform', `Error: ${msg}`));
	}

	return fate;
}
