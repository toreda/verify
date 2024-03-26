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
import type {MatcherFunc} from './func';
import type {BlockFlags} from '../block/flags';
import {matcherParamsMk} from '../matcher/params/mk';

/**
 * @category Matcher Predicates
 */
export class MatcherBound<InputT, ParamT> {
	public readonly fn: MatcherFunc<InputT, ParamT>;
	public readonly params: ParamT;
	public readonly flags: BlockFlags;
	public readonly callArgs: Map<string, string | number | boolean | null>;

	constructor(call: MatcherCall<InputT, ParamT>) {
		this.fn = call.fn;
		this.callArgs = new Map<string, string | number | boolean | null>();
		this.flags = this.mkFlags(call?.flags);
		this.params = matcherParamsMk<ParamT>(call?.params);
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

	public async execute(value?: InputT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		try {
			const fnResult = await this.fn(value, this.params);
			const result = this.applyResultModifiers(fnResult);

			if (result === true) {
				fate.success(true);
			} else {
				fate.setErrorCode(`validation_fail`);
			}
		} catch (e) {
			fate.error(e);
			fate.setErrorCode('exception');
		}

		return fate;
	}
}
