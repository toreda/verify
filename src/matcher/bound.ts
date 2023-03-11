/**
 *	MIT License
 *
 *	Copyright (c) 2023 Toreda, Inc.
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
import {MatcherCall} from './call';
import type {MatcherFunc} from './func';
import type {NodeFlags} from '../node/flags';
import {matcherParamsMk} from '../matcher/params/mk';

/**
 * @category Matchers
 */
export class MatcherBound<ValueT, ParamT> {
	public readonly fn: MatcherFunc<ValueT, ParamT>;
	public readonly params: ParamT;
	public readonly flags: NodeFlags;

	constructor(call: MatcherCall<ValueT, ParamT>) {
		this.fn = call.fn;
		this.flags = this.mkFlags(call?.flags);
		this.params = matcherParamsMk<ParamT>(call?.params);
	}

	/**
	 * Create fully formed flags object with each property set to either a valid provided
	 * value, or set to the default value.
	 * @param input
	 * @returns
	 */
	public mkFlags(input?: Partial<NodeFlags>): NodeFlags {
		const flags: NodeFlags = {
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

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
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
