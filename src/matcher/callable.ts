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
import type {BlockFlags} from '../block/flags';
import {type Primitive} from '@toreda/types';
import {type Predicate} from '../predicate';
import {type Id, booleanValue} from '@toreda/strong-types';
import {type Verifier} from '../verifier';
import {type VerifierResult} from '../verifier/result';
import {verifierResult} from '../verifier/result';
import {matcherMkId} from './mk/id';
import {type MatcherData} from './data';

/**
 * @category Matcher Predicates
 */
export class MatcherCallable<InputT = unknown> implements Verifier {
	public readonly id: Id;
	public readonly predicate: Predicate<InputT>;
	public readonly flags: BlockFlags;
	public readonly stored: Map<string, Primitive>;

	constructor(matcherId: number, data: MatcherData<InputT>) {
		this.predicate = data.fn;
		this.stored = new Map<string, Primitive>();
		this.flags = this.mkFlags(data?.flags);
		this.id = matcherMkId<InputT>(matcherId, data);
	}

	/**
	 * Create fully formed flags object with each property set to either a valid provided
	 * value, or set to the default value.
	 * @param input
	 * @returns
	 */
	public mkFlags(input?: Partial<BlockFlags>): BlockFlags {
		return {
			invertResult: booleanValue(input?.invertResult, false)
		};
	}

	/**
	 * Apply relevant result modifiers and transform the result value accordingly.
	 * @param result
	 * @returns
	 */
	public applyMods(result: boolean): boolean {
		if (this.flags.invertResult === true) {
			return !result;
		}

		return result;
	}

	public async verify(value?: InputT | null): Promise<Fate<VerifierResult>> {
		const ctx = verifierResult<InputT>({
			name: 'predicate'
		});

		const fate = new Fate<VerifierResult>({
			data: ctx
		});

		try {
			const fnResult = await this.predicate(value);
			//console.debug(`predicate result: ${fnResult}`);
			const result = this.applyMods(fnResult);
			//console.debug(`predicate result (mods applied): ${result}`);
			ctx.outcome = result === true ? 'pass' : 'fail';

			fate.setSuccess(true);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : 'nonerr_type';
			console.error(`matcher.verify exception: ${msg}`);
			fate.error(e);
			fate.setErrorCode('exception');
			ctx.outcome = 'error';
		}

		return fate;
	}
}
