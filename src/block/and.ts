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
import {Statement} from '../statement';
import {BlockContains} from './contains';
import {BlockHave} from './have';
import {type BlockInit} from './init';
import {BlockIs} from './is';

/**
 * @category Rule Blocks
 */
export class BlockAnd<InputT = unknown> extends Block<Statement<InputT>> {
	public readonly contain: BlockContains<InputT>;
	/**
	 * Alias for `contain`. Exists for cases where the singular `contain` is
	 * awkward or makes a statement confusing.
	 */
	public readonly contains: BlockContains<InputT>;
	public readonly is: BlockIs<InputT>;
	public readonly have: BlockHave<InputT>;
	/**
	 * Alias for `has` provided for cases where statement grammar is otherwise awkward.
	 */
	public readonly has: BlockHave<InputT>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				name: init.name,
				tracer: init.tracer,
				blockType: 'and'
			},
			init.stmt
		);
		this.is = new BlockIs<InputT>({
			...init,
			name: 'is',
			tracer: this.tracer
		});
		this.contain = new BlockContains<InputT>({
			...init,
			name: 'contain',
			tracer: this.tracer
		});
		this.contains = this.contain;
		this.have = new BlockHave<InputT>({
			...init,
			name: 'have',
			tracer: this.tracer
		});
		this.has = new BlockHave<InputT>({
			...init,
			name: 'has',
			tracer: this.tracer
		});
	}
}
