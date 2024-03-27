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

import {type Primitive} from '@toreda/types';
import {Block} from '../block';
import {type Matcher} from '../matcher';
import {matcherMkAllOf} from '../matcher/mk/all/of';
import {matcherMkAtLeast} from '../matcher/mk/at/least';
import {matcherMkAtMost} from '../matcher/mk/at/most';
import {matcherMkExactly} from '../matcher/mk/exactly';
import {matcherMkNoneOf} from '../matcher/mk/none/of';
import {matcherMkOneOf} from '../matcher/mk/one/of';
import {Statement} from '../statement';
import type {BlockFlags} from './flags';
import {MatcherFactory} from '../matcher/factory';
import {BlockLink} from './link';

/**
 * @category Statement Blocks
 */
export class BlockContains extends Block<Statement> {
	public readonly exactly: MatcherFactory<number, BlockLink>;
	public readonly atLeast: MatcherFactory<number, BlockLink>;
	public readonly atMost: MatcherFactory<number, BlockLink>;
	public readonly oneOf: MatcherFactory<Primitive[], BlockLink>;
	public readonly noneOf: MatcherFactory<Primitive[], BlockLink>;
	public readonly allOf: MatcherFactory<Primitive[], BlockLink>;

	constructor(stmt: Statement, flags?: BlockFlags) {
		super(stmt, 'contains');

		this.allOf = matcherMkAllOf({
			stmt: stmt,
			flags: flags
		});
		this.atLeast = matcherMkAtLeast({
			stmt: stmt,
			flags: flags
		});
		this.atMost = matcherMkAtMost({
			stmt: stmt,
			flags: flags
		});
		this.exactly = matcherMkExactly({
			stmt: stmt,
			flags: flags
		});
		this.noneOf = matcherMkNoneOf({
			stmt: stmt,
			flags: flags
		});
		this.oneOf = matcherMkOneOf({
			stmt: stmt,
			flags: flags
		});
	}
}
