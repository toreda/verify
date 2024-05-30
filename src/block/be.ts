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
import {matcherMkType} from '../matcher/mk/type';
import {matcherMkTruthy} from '../matcher/mk/truthy';
import {matcherMkIterable} from '../matcher/mk/iterable';
import {BlockAn} from './an';
import {BlockA} from './a';

/**
 * Matchers following 'be' in rule statements.
 *
 * @category		Rule Block
 * @example
 * ```ts
 * value.must.be.lessThan(10)
 * ```
 * ```ts
 * // Strictly greater than 10
 * value.must.be.greaterThan(10)
 * ```
 * ```ts
 * // Strict equal 0
 * value.must.be.equalTo(0)
 * ```
 * ```ts
 * // Only array types allowed.
 * value.must.be.an.array()
 * ```
 * ```ts
 * value.must.be.truthy();
 * ```
 *
 * ```ts
 * value.must.be.an int();
 * ```
 */
export class BlockBe<InputT = unknown> extends Block<Statement<InputT>> {
	/**
	 * Checks whether value is strictly less than input.
	 * @example
	 *
	 * ```ts
	 * value.must.be.lessThan(100)
	 * ```
	 */
	public readonly lessThan: MatcherFactory<InputT, number, BlockLink<InputT>>;
	/**
	 * Checks whether value is strictly greater than input.
	 * @example
	 * ```ts
	 * value.must.be.greaterThan(0)
	 * ```
	 */
	public readonly greaterThan: MatcherFactory<InputT, number, BlockLink<InputT>>;
	/**
	 * Checks whether value is strictly equal to input including type and value without
	 * type coercion. Equivalent to `===`, but works with a variety of types.
	 * @example
	 * ```ts
	 * value.must.be.equalTo(99)
	 * ```
	 */
	public readonly equalTo: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly type: MatcherFactory<InputT, string, BlockLink<InputT>>;
	public readonly iterable: MatcherFactory<InputT, never, BlockLink<InputT>>;
	public readonly truthy: MatcherFactory<InputT, never, BlockLink<InputT>>;
	public readonly an: BlockAn<InputT>;
	public readonly a: BlockA<InputT>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				blockType: 'be',
				tracer: init.tracer,
				name: 'be'
			},
			init.stmt
		);
		this.an = new BlockAn<InputT>({
			...init,
			name: 'an',
			tracer: this.tracer
		});
		this.a = new BlockA<InputT>({
			...init,
			name: 'a',
			tracer: this.tracer
		});
		this.lessThan = matcherMkLessThan<InputT>({
			...init,
			name: '<',
			tracer: this.tracer
		});
		this.greaterThan = matcherMkGreaterThan<InputT>({
			...init,
			name: '>',
			tracer: this.tracer
		});
		this.equalTo = matcherMkEqual<InputT>({...init, name: '===', tracer: this.tracer});
		this.type = matcherMkType<InputT>({...init, name: 'type', tracer: this.tracer});
		this.iterable = matcherMkIterable<InputT>({...init, name: 'iterable', tracer: this.tracer});

		this.truthy = matcherMkTruthy<InputT>({...init, name: 'truthy', tracer: this.tracer});
	}
}
