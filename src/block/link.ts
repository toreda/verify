/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2025 Toreda, Inc.
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
import {Statement} from '../statement';
import {BlockAnd} from './and';
import {type BlockInit} from './init';
import {BlockOr} from './or';
import {type BlockWithNot, blockWithNot} from './with/not';

/**
 * Link (Block)
 *
 * Connect 2 or more predicate statements where all matcher predicates must return
 * true for the entire statement to be true.
 * @example `has.length(1).and.is.type('string')
 *
 * @category Rule Blocks
 */
export class BlockLink<InputT = unknown> extends Block<Statement<InputT>> {
	/**
	 * Injects `and` into a statement. Requires both the matcher before and immediately
	 * after the `and` to pass for the statement to `pass`.
	 */
	public readonly and: BlockWithNot<BlockAnd<InputT>>;
	/**
	 * Injects `or` into a statement. Statement passes when the matcher before or
	 * immediately after the `or` `pass`.
	 */
	public readonly or: BlockWithNot<BlockOr<InputT>>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				blockType: 'link',
				name: init.name,
				tracer: init.tracer
			},
			init.stmt
		);
		this.and = blockWithNot<InputT, BlockAnd<InputT>>(BlockAnd<InputT>, init);
		this.or = blockWithNot<InputT, BlockOr<InputT>>(BlockOr<InputT>, init);
	}
}
