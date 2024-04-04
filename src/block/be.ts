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

import {Block} from '../block';
import {matcherMkEqual} from '../matcher/mk/equal';
import {matcherMkGreaterThan} from '../matcher/mk/greater/than';
import {matcherMkLessThan} from '../matcher/mk/less/than';
import {Statement} from '../statement';
import {type MatcherFactory} from '../matcher/factory';
import {BlockLink} from './link';
import {type BlockInit} from './init';

/**
 * Matchers following 'be' in rule statements.
 *
 * @category Rule Blocks
 * @example
 * ```ts
 * value.must.be.lessThan(10)
 * ```
 * ```ts
 * value.must.be.greaterThan(10)
 * ```
 * ```ts
 * value.must.be.equalTo(0)
 * ```
 */
export class BlockBe<InputT = unknown> extends Block<Statement<InputT>> {
	public readonly lessThan: MatcherFactory<number, BlockLink<InputT>>;
	public readonly greaterThan: MatcherFactory<number, BlockLink<InputT>>;
	public readonly equalTo: MatcherFactory<number, BlockLink<InputT>>;

	constructor(init: BlockInit<InputT>) {
		super(init.stmt, 'be');

		this.lessThan = matcherMkLessThan<InputT>(init);
		this.greaterThan = matcherMkGreaterThan<InputT>(init);
		this.equalTo = matcherMkEqual<InputT>(init);
	}
}
