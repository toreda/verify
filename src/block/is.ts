/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2026 Toreda, Inc.
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

import {matcherMkDivisible} from '../matcher/mk/divisible';
import {matcherMkEmpty} from '../matcher/mk/empty';
import {Statement} from '../statement';
import {Block} from '../block';
import {type MatcherFactory} from '../matcher/factory';
import {BlockLink} from './link';
import {matcherMkGreaterThan} from '../matcher/mk/greater/than';
import {matcherMkLessThan} from '../matcher/mk/less/than';
import {matcherMkEqual} from '../matcher/mk/equal';
import {matcherMkType} from '../matcher/mk/type';
import {type BlockInit} from './init';
import {matcherMkBetween} from '../matcher/mk/between';
import {type Primitive} from '@toreda/types';
import {matcherMkIterable} from '../matcher/mk/iterable';
import {matcherMkTruthy} from '../matcher/mk/truthy';
import {BlockA} from './a';
import {BlockAn} from './an';
import {SchemaFieldType} from '../schema/field/type';
import {matcherMkLessThanOrEqualTo} from '../matcher/mk/less/than/equal/to';
import {matcherMkGreaterThanOrEqualTo} from '../matcher/mk/greater/than/equal/to';
import {matcherMkOdd} from '../matcher/mk/odd';
import {matcherMkEven} from '../matcher/mk/even';
import {matcherMkInteger} from '../matcher/mk/integer';
import {matcherMkPositiveInteger} from '../matcher/mk/positive/integer';
import {matcherMkNegativeInteger} from '../matcher/mk/negative/integer';

/**
 * Is (block)
 *
 * Matchers following 'is' in rule statements.
 *
 * @category Rule Blocks
 * @example
 * ```ts
 * value.is.lessThan(10)
 * ```
 * ```ts
 * value.is.greaterThan(10)
 * ```
 * ```ts
 * value.is.equalTo(0)
 * ```
 *
 * ```ts
 * value.is.type('array')
 * ```
 *
 * ```ts
 * value.is.type('string')
 * ```
 */
export class BlockIs<InputT = unknown> extends Block<Statement<InputT>> {
	public readonly between: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly lessThan: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly greaterThan: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly greaterThanOrEqualTo: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly lessThanOrEqualTo: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly equalTo: MatcherFactory<InputT, Primitive | Primitive[], BlockLink<InputT>>;
	public readonly empty: MatcherFactory<InputT, unknown, BlockLink<InputT>>;
	public readonly odd: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly even: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly divisibleBy: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly integer: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly positiveInteger: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly negativeInteger: MatcherFactory<InputT, number, BlockLink<InputT>>;
	public readonly type: MatcherFactory<InputT, SchemaFieldType<InputT>, BlockLink<InputT>>;
	public readonly an: BlockAn<InputT>;
	public readonly a: BlockA<InputT>;

	/**
	 * Determine if `value` supports iteration, but does check for a specific iterable type.
	 */
	public readonly iterable: MatcherFactory<InputT, never, BlockLink<InputT>>;
	/**
	 * Determine if value is truthy.
	 * @remarks
	 * `pass`	`value` is truthy.
	 * `fail`	`value` is not truthy.
	 */
	public readonly truthy: MatcherFactory<InputT, never, BlockLink<InputT>>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				blockType: 'is',
				name: init.name,
				tracer: init.tracer
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
		this.between = matcherMkBetween<InputT>({
			...init,
			tracer: this.tracer,
			name: 'between'
		});
		this.divisibleBy = matcherMkDivisible<InputT>({
			...init,
			tracer: this.tracer,
			name: 'divisible by'
		});
		this.empty = matcherMkEmpty<InputT>({
			...init,
			tracer: this.tracer,
			name: 'empty'
		});
		this.integer = matcherMkInteger<InputT>({
			...init,
			tracer: this.tracer,
			name: 'isInt'
		});
		this.positiveInteger = matcherMkPositiveInteger<InputT>({
			...init,
			tracer: this.tracer,
			name: 'posInt'
		});
		this.negativeInteger = matcherMkNegativeInteger<InputT>({
			...init,
			tracer: this.tracer,
			name: 'negInt'
		});
		this.equalTo = matcherMkEqual<InputT>({
			...init,
			tracer: this.tracer,
			name: '==='
		});
		this.greaterThan = matcherMkGreaterThan<InputT>({
			...init,
			tracer: this.tracer,
			name: '>'
		});
		this.greaterThanOrEqualTo = matcherMkGreaterThanOrEqualTo<InputT>({
			...init,
			tracer: this.tracer,
			name: '>='
		});
		this.lessThan = matcherMkLessThan<InputT>({
			...init,
			tracer: this.tracer,
			name: '<'
		});
		this.lessThanOrEqualTo = matcherMkLessThanOrEqualTo<InputT>({
			...init,
			tracer: this.tracer,
			name: '<='
		});
		this.type = matcherMkType<InputT>({
			...init,
			tracer: this.tracer,
			name: 'type'
		});
		this.iterable = matcherMkIterable<InputT>({
			...init,
			tracer: this.tracer,
			name: 'iterable'
		});
		this.even = matcherMkEven<InputT>({
			...init,
			tracer: this.tracer,
			name: 'even'
		});
		this.odd = matcherMkOdd<InputT>({
			...init,
			tracer: this.tracer,
			name: 'odd'
		});
		this.truthy = matcherMkTruthy<InputT>({
			...init,
			tracer: this.tracer,
			name: 'truthy'
		});
	}
}
