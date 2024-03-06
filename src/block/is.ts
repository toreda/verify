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

import {BlockRoot} from '../statement';
import type {Matcher} from '../matcher';
import type {BlockFlags} from './flags';
import {matcherDivisibleMk} from '../matcher/divisible/mk';
import {matcherEmptyMk} from '../matcher/empty/mk';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/less/than/mk';
import {matcherTypeMk} from '../matcher/type/mk';

/**
 * @category Statement Blocks
 */
export class BlockIs<ValueT> {
	public readonly lessThan: Matcher<ValueT, number>;
	public readonly greaterThan: Matcher<ValueT, number>;
	public readonly equalTo: Matcher<ValueT, number>;
	public readonly empty: Matcher<ValueT, never>;
	public readonly notEmpty: Matcher<ValueT, never>;
	public readonly divisibleBy: Matcher<ValueT, number>;
	public readonly type: Matcher<ValueT, string>;

	constructor(root: BlockRoot<ValueT>, flags?: BlockFlags) {
		this.empty = matcherEmptyMk<ValueT>(root, flags);
		this.notEmpty = matcherEmptyMk<ValueT>(root, flags);
		this.lessThan = matcherLessThanMk<ValueT>(root, flags);
		this.greaterThan = matcherGreaterThanMk<ValueT>(root, flags);
		this.equalTo = matcherEqualToMk<ValueT>(root, flags);
		this.divisibleBy = matcherDivisibleMk<ValueT>(root, flags);
		this.type = matcherTypeMk<ValueT>(root, flags);
	}
}
