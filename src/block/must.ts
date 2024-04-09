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
import {type MatcherFactory} from '../matcher/factory';
import {Statement} from '../statement';
import {BlockBe} from './be';
import {BlockContains} from './contains';
import {BlockMatch} from './match';
import {matcherMkEqual} from '../matcher/mk/equal';
import {type BlockInit} from './init';
import {matcherMkHaveProperty} from '../matcher/mk/have/property';
import {matcherMkHavePropertyWithType} from '../matcher/mk/have/property/with/type';

/**
 * @name Must (Block)
 * @description Adds `must` property to rule statements for grammar purposes.
 * @remark
 * Immediately follows: `value`, `and`, `or` blocks in a statement.
 * @example
 * ```ts
 * value.must.be.greaterThan(10);
 * ```
 * ```ts
 * value.must.be.iterable().and.must.be.equalTo(['a']);
 * ```
 * @category Rule Blocks
 */
export class BlockMust<InputT = unknown> extends Block<Statement<InputT>> {
	public readonly be: BlockBe<InputT>;
	public readonly match: BlockMatch<InputT>;
	public readonly equal: MatcherFactory<InputT, Primitive, Block<Statement<InputT>>>;
	public readonly contain: BlockContains<InputT>;
	public readonly haveProperty: MatcherFactory<InputT, string, Block<Statement<InputT>>>;
	public readonly havePropertyWithType: MatcherFactory<InputT, string, Block<Statement<InputT>>>;

	constructor(init: BlockInit<InputT>) {
		super(init.stmt, 'must');
		this.match = new BlockMatch<InputT>(init);
		this.equal = matcherMkEqual<InputT>(init);
		this.haveProperty = matcherMkHaveProperty(init);
		this.havePropertyWithType = matcherMkHavePropertyWithType(init);
		this.be = new BlockBe<InputT>(init);
		this.contain = new BlockContains<InputT>(init);
	}
}
