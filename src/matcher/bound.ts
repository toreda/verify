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
import type {MatcherCall} from './call';
import type {BlockFlags} from '../block/flags';
import {Primitive} from '@toreda/types';
import {type Predicate} from '../predicate';

/**
 * @category Matcher Predicates
 */
export class MatcherBound<InputT> {
	public readonly predicate: Predicate<InputT>;
	public readonly flags: BlockFlags;
	public readonly callArgs: Map<string, Primitive>;

	constructor(call: MatcherCall<InputT>) {
		this.predicate = call.fn;
		this.callArgs = new Map<string, Primitive>();
		this.flags = this.mkFlags(call?.flags);
		//this.params = matcherMkParams<ParamT>(call?.params);
	}

	/**
	 * Create fully formed flags object with each property set to either a valid provided
	 * value, or set to the default value.
	 * @param input
	 * @returns
	 */
	public mkFlags(input?: Partial<BlockFlags>): BlockFlags {
		const flags: BlockFlags = {
			invertResult: false
		};

		if (typeof input?.invertResult === 'boolean') {
			flags.invertResult = input.invertResult;
		}

		return flags;
	}

	/**
	 * Apply relevant result modifiers and transform the result value accordingly.
	 * @param result
	 * @returns
	 */
	public applyResultModifiers(result: boolean): boolean {
		if (this.flags.invertResult === true) {
			return !result;
		}

		return result;
	}

	public async execute(value?: InputT | null): Promise<Fate<boolean>> {
		const fate = new Fate<boolean>();

		try {
			const fnResult = await this.predicate(value);
			console.debug(`predicate result: ${fnResult}`);
			const result = this.applyResultModifiers(fnResult);
			console.debug(`predicate result (mods applied): ${result}`);

			fate.data = result;
			fate.setSuccess(true);
		} catch (e: unknown) {
			fate.data = false;
			const msg = e instanceof Error ? e.message : 'nonerr_type';
			console.error(`matcher.execute exception: ${msg}`);
			fate.error(e);
			fate.setErrorCode('exception');
		}

		return fate;
	}
}
