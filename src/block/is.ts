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

import type {Matcher} from '../matcher';
import type {BlockFlags} from './flags';
import {matcherDivisibleMk} from '../matcher/mk/divisible';
import {matcherEmptyMk} from '../matcher/empty/mk';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/mk/less/than';
import {matcherTypeMk} from '../matcher/mk/type';
import {Statement} from '../statement';
import {Block} from '../block';

/**
 * @category Statement Blocks
 */
export class BlockIs extends Block<Statement> {
	public readonly lessThan: Matcher<number>;
	public readonly greaterThan: Matcher<number>;
	public readonly equalTo: Matcher<number>;
	public readonly empty: Matcher<never>;
	public readonly notEmpty: Matcher<never>;
	public readonly divisibleBy: Matcher<number>;
	public readonly type: Matcher<string>;

	constructor(stmt: Statement, flags?: BlockFlags) {
		super(stmt, 'is');
		this.empty = matcherEmptyMk(stmt, flags);
		this.notEmpty = matcherEmptyMk(stmt, flags);
		this.lessThan = matcherLessThanMk(stmt, flags);
		this.greaterThan = matcherGreaterThanMk(stmt, flags);
		this.equalTo = matcherEqualToMk(stmt, flags);
		this.divisibleBy = matcherDivisibleMk(stmt, flags);
		this.type = matcherTypeMk(stmt, flags);
	}
}
