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

import {StatementRoot} from '../statement/root';
import {BlockContains} from './contains';
import type {BlockFlags} from './flags';
import {BlockHave} from './have';
import {BlockIs} from './is';

/**
 * @category Statement Blocks
 */
export class BlockAnd<ValueT> {
	public readonly contain: BlockContains<ValueT>;
	/**
	 * Alias for `contain`. Exists for cases where the singular `contain` is
	 * awkward or makes a statement confusing.
	 */
	public readonly contains: BlockContains<ValueT>;
	public readonly is: BlockIs<ValueT>;
	public readonly have: BlockHave<ValueT>;
	/**
	 * Alias for `has` provided for cases where statement grammar is otherwise awkward.
	 */
	public readonly has: BlockHave<ValueT>;

	constructor(root: StatementRoot<ValueT>, flags?: BlockFlags) {
		this.is = new BlockIs<ValueT>(root, flags);
		this.contain = new BlockContains<ValueT>(root, flags);
		this.contains = this.contain;
		this.have = new BlockHave<ValueT>(root, flags);
		this.has = this.have;
	}
}
