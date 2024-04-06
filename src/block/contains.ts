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
import {matcherMkAllOf} from '../matcher/mk/all/of';
import {matcherMkAtLeast} from '../matcher/mk/at/least';
import {matcherMkAtMost} from '../matcher/mk/at/most';
import {matcherMkExactly} from '../matcher/mk/exactly';
import {matcherMkNoneOf} from '../matcher/mk/none/of';
import {matcherMkOneOf} from '../matcher/mk/one/of';
import {Statement} from '../statement';
import {type MatcherFactory} from '../matcher/factory';
import {BlockLink} from './link';
import {type BlockInit} from './init';

/**
 * Matchers following the `contain` or `contains` block in rule statements.
 *
 * @category Rule Blocks
 *
 * @example
 * ```ts
 * value.must.contain.atLeast('a');
 * ```
 *
 * ```ts
 * value.must.contain.oneOf(['a', 'b']);
 * ```
 */
export class BlockContains<InputT = unknown> extends Block<Statement<InputT>> {
	/**
	 * Matches when input is an exact match.
	 */
	public readonly exactly: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly atLeast: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly atMost: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly oneOf: MatcherFactory<InputT, Primitive[], BlockLink<InputT>>;
	public readonly noneOf: MatcherFactory<InputT, Primitive[], BlockLink<InputT>>;
	public readonly allOf: MatcherFactory<InputT, Primitive[], BlockLink<InputT>>;

	constructor(init: BlockInit<InputT>) {
		super(init.stmt, 'contains');

		this.allOf = matcherMkAllOf<InputT>(init);
		this.atLeast = matcherMkAtLeast<InputT>(init);
		this.atMost = matcherMkAtMost<InputT>(init);
		this.exactly = matcherMkExactly<InputT>(init);
		this.noneOf = matcherMkNoneOf<InputT>(init);
		this.oneOf = matcherMkOneOf<InputT>(init);
	}
}
