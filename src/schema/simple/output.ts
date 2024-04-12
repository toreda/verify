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
import {schemaError} from '../error';
import {type Verified} from '../../verified';

/**
 * Default transformer that expects a map of string -> primitive values and produces
 * a simple object of the same mapping.
 * @param data
 * @param base
 * @returns
 *
 * @category Schemas
 */
export async function schemaSimpleOutput<DataT, VerifiedT>(
	input: Map<string, DataT>,
	base: Log
): Promise<Fate<VerifiedT | null>> {
	const log = base.makeLog('schemaPrimitiveTransformer');
	const fate = new Fate<VerifiedT | null>();

	if (!input) {
		log.error(`Missing argument: mapped`);
		return fate.setErrorCode(schemaError('missing_argument', 'schemaPrimitiveTransformer', 'data'));
	}

	if (!base) {
		log.error(`Missing argument: base`);
		return fate.setErrorCode(schemaError('missing_argument', 'schemaPrimitiveTransformer', 'base'));
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

		log.error(`Exception: ${msg}.`);
		fate.setErrorCode(schemaError('exception', 'schemaPrimitiveTransformer', `Error: ${msg}`));
	}

	return fate;
}
