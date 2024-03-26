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

import type {BetweenCall} from '../../between/call';
import type {Matcher} from '../../matcher';
import type {MatcherFunc} from '../func';
import type {BlockFlags} from '../../block/flags';
import {BlockLink} from '../../block/link';
import {between} from '../../between';
import {Statement} from '../../statement';

/**
 * @param root		Root Block at the start of every statement.
 * @param flags		Optional flags which transform the block or statement result.
 * @returns
 *
 * @category Matcher Predicate Factories`
 */
export function matcherMkBetween(stmt: Statement, flags?: BlockFlags): Matcher<number> {
	return (left: number, right: number) => {
		const link = new BlockLink(stmt, flags);

		const fn: MatcherFunc<number, BetweenCall> = async (value?: number | null): Promise<boolean> => {
			return between(left, value, right);
		};

		stmt.addMatcher<number>({
			fn: fn,
			params: {
				left: left,
				right: right
			}
		});

		return link;
	};
}
