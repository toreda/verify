/**
 *	MIT License
 *
 *	Copyright (c) 2023 Toreda, Inc.
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

import {ChkChainRoot} from '../chk/chain/root';
import type {Matcher} from '../matcher';
import {Node} from '../node';
import {NodeContains} from './contains';
import type {NodeFlags} from './flags';
import {NodeHave} from './have';
import {matcherDivisibleMk} from '../matcher/divisible/mk';

/**
 * @category Nodes
 */
export class NodeNot<ValueT> extends Node<ValueT, unknown> {
	public readonly contain: NodeContains<ValueT>;
	public readonly have: NodeHave<ValueT>;
	public readonly divisibleBy: Matcher<ValueT, number>;

	constructor(root: ChkChainRoot<ValueT>, flags?: NodeFlags) {
		super('not', root);

		const modFlags: NodeFlags = {
			...flags,
			invertResult: true
		};

		this.contain = new NodeContains<ValueT>(root, modFlags);
		this.have = new NodeHave<ValueT>(root, modFlags);
		this.divisibleBy = matcherDivisibleMk<ValueT>(root, modFlags);
	}
}
