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
import {type VerifierParams} from './verifier/params';
import {verifierResult, type VerifierResult} from './verifier/result';
import {type Verifier} from './verifier';
import {numberValue} from '@toreda/strong-types';
import Defaults from './defaults';

/**
 *
 * @param params
 *
 * @category Verifier
 */
export async function verify<InputT, CollectionT extends Verifier<InputT>>(
	params: VerifierParams<InputT, CollectionT>
): Promise<Fate<VerifierResult>> {
	const ctx = verifierResult<InputT>({
		name: params.name
	});

	const fate = new Fate<VerifierResult>({
		data: ctx
	});

	if (!fate.data) {
		return fate.setErrorCode('bad_fate_init');
	}

	try {
		ctx.summary.counts.total = params.collection.length;

		for (const item of params.collection) {
			const subResult = await item.verify(params.value, params.flags);

			// Error
			if (!subResult.ok()) {
				const subCtx = subResult.data;
				ctx.summary.counts.error += numberValue(subCtx?.summary.counts.error, 1);

				if (Array.isArray(subCtx?.failedMatchers)) {
					ctx.failedMatchers.push(...subCtx.failedMatchers);
					/* for (const matcher of subResult?.data.failedMatchers) {
						ctx.failedMatchers.push(matcher);
					} */
				}
				continue;
			}

			if (subResult.data) {
				fate.data?.results.push(subResult.data);
			}

			switch (subResult.data?.outcome) {
				case 'fail':
					ctx.summary.counts.fail++;
					if (Array.isArray(subResult.data.failedMatchers)) {
						ctx.failedMatchers.push(...subResult.data.failedMatchers);
					}
					break;
				case 'pass':
					ctx.summary.counts.pass++;
					break;
				// Serious error encountered, but was able to return without an uncaught
				// exception.
				case 'error':
					ctx.summary.counts.error++;
					break;
				// Execution skipped due to some reason other than errors.
				case 'skip':
					ctx.summary.counts.skip++;
					break;
				// Default fail if nothing else matches outcome returned. The returned
				// outcome should match one of the supported cases. If not, something
				// went wrong.
				default:
					ctx.summary.counts.fail++;
					break;
			}
		}

		const maxFails = numberValue(params?.flags?.maxFails, Defaults.Verifier.MaxFails);
		const maxErrors = numberValue(params?.flags?.maxErrors, Defaults.Verifier.MaxErrors);

		if (ctx.summary.counts.error > maxErrors) {
			ctx.outcome = 'error';
		} else if (ctx.summary.counts.fail > maxFails) {
			ctx.outcome = 'fail';
		} else {
			ctx.outcome = 'pass';
		}
		// No exceptions during verifier. Fate return status is separate from executor outcome.
		fate.setSuccess(true);
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : 'nonerror_type';
		ctx.outcome = 'error';
		fate.setErrorCode(`executor_exception:${msg}`);
	}

	return fate;
}
