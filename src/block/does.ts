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
import {type BlockInit} from './init';
import {BlockContains} from './contains';

/**
 * Matchers following the `contain` or `contains` block in rule statements.
 *
 * @category		Rule Block
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
export class BlockDoes<InputT = unknown> extends Block<Statement<InputT>> {
	/**
	 * Matches when input is an exact match.
	 */
	public readonly contain: BlockContains<InputT>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				blockType: 'contains',
				tracer: init.tracer,
				name: init.name
			},
			init.stmt
		);

		this.contain = new BlockContains<InputT>({
			...init,
			name: 'contain',
			tracer: this.tracer
		});
	}
}
