/**
 *	MIT License
 *
 *	Copyright (c) 2022 Toreda, Inc.
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

import {ChkValue} from '../value';
import {MatcherBound} from '../../matcher/bound';
import {MatcherFunc} from '../../matcher/func';

/**
 * Root object for a ChkChain. Referenced all nodes and matchers in chain.
 *
 * @category Validation Chain
 */
export class ChkChainRoot<ValueT> {
	public readonly value: ChkValue<ValueT>;
	public readonly matchers: MatcherBound<ValueT, unknown>[];

	constructor(value: ChkValue<ValueT>) {
		this.value = value;
		this.matchers = [];
	}

	public bindMatcher<CmpT>(fn: MatcherFunc<ValueT>, args: CmpT): boolean {
		let result = true;

		try {
			const bound = new MatcherBound<ValueT, unknown>(fn, args);
			this.matchers.push(bound);
		} catch (e) {
			result = false;
		}

		return true;
	}
}
