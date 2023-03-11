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
import {Node} from '../node';
import {NodeBe} from './be';
import {NodeContains} from './contains';
import {NodeEqual} from './equal';
import type {NodeFlags} from './flags';
import {NodeMatch} from './match';

/**
 * @category Nodes
 */
export class NodeMust<ValueT> extends Node<ValueT, unknown> {
	public readonly be: NodeBe<ValueT>;
	public readonly match: NodeMatch<ValueT>;
	public readonly equal: NodeEqual<ValueT>;
	public readonly contain: NodeContains<ValueT>;

	constructor(root: ChkChainRoot<ValueT>, flags?: NodeFlags) {
		super('must', root);
		this.match = new NodeMatch<ValueT>(root, flags);
		this.equal = new NodeEqual<ValueT>(root, flags);
		this.be = new NodeBe<ValueT>(root, flags);
		this.contain = new NodeContains<ValueT>(root, flags);
	}
}
