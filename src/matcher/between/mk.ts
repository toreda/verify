/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2023 Toreda, Inc.
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

import type {BetweenCall} from '../../between/call';
import {ChkChainRoot} from '../../chk/chain/root';
import type {Matcher} from '../../matcher';
import type {MatcherFunc} from '../../matcher/func';
import type {NodeFlags} from '../../node/flags';
import {NodeLink} from '../../node/link';
import {between} from '../../between';

/**
 * @param next
 * @param root
 * @returns
 *
 * @category Matchers
 */
export function matcherBetweenMk<ValueT>(
	root: ChkChainRoot<ValueT>,
	flags?: NodeFlags
): Matcher<ValueT, number> {
	return (left: number, right: number) => {
		const link = new NodeLink<ValueT>(root, flags);

		const fn: MatcherFunc<ValueT, BetweenCall> = async (value?: ValueT | null): Promise<boolean> => {
			return between(left, value, right);
		};

		root.addMatcher<BetweenCall>({
			fn: fn,
			params: {
				left: left,
				right: right
			}
		});

		return link;
	};
}
