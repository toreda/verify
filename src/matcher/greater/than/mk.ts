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

import {ChkChainRoot} from '../../../chk/chain/root';
import type {GreaterThanArgs} from './args';
import type {Matcher} from '../../../matcher';
import {MatcherCall} from 'src/matcher/call';
import type {MatcherFunc} from '../../../matcher/func';
import {NodeLink} from '../../../node/link';
import {greaterThan} from '../../../greater/than';

/**
 *
 * @param next
 * @returns
 *
 * @category Matcher Factory
 */
export function matcherGreaterThanMk<ValueT>(
	root: ChkChainRoot<ValueT>,
	next: NodeLink<ValueT>
): Matcher<number, NodeLink<ValueT>> {
	return (right: number) => {
		const fn: MatcherFunc<ValueT, GreaterThanArgs> = async (
			params: GreaterThanArgs
		): Promise<boolean> => {
			return greaterThan(root.value.get(), params?.right);
		};

		const call: MatcherCall<ValueT, GreaterThanArgs> = {
			fn: fn,
			params: {
				right: right
			}
		};

		root.addMatcher<GreaterThanArgs>(call);

		return next;
	};
}
