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

import {StatementRoot} from '../../statement/root';
import type {Matcher} from '../../matcher';
import type {MatcherFunc} from '../func';
import {BlockLink} from '../../block/link';
import {Pattern} from '../../pattern';

/**
 * Creates a pattern matcher node for target validation chain.
 * @param root		Root node for the validation chain matcher will be used in.
 * @returns
 *
 * @category Matcher Predicate Factories
 */
export function matcherPatternMk<ValueT>(root: StatementRoot<ValueT>): Matcher<ValueT, Pattern<ValueT>> {
	return (_pattern: Pattern<ValueT>): BlockLink<ValueT> => {
		const link = new BlockLink<ValueT>(root);

		const fn: MatcherFunc<ValueT, unknown> = async (_value?: ValueT | null): Promise<boolean> => {
			return false;
		};

		root.addMatcher<unknown>({
			fn: fn
		});

		return link;
	};
}
