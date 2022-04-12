/**
 *	MIT License
 *
 *	Copyright (c) 2022 Toreda, Inc.
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
import {NodeContains} from './contains';
import {NodeFlags} from './flags';
import {NodeHave} from './have';
import {NodeIs} from './is';

/**
 * @category Nodes
 */
export class NodeAnd<ValueT> {
	public readonly contain: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly have: NodeHave<ValueT>;

	constructor(root: ChkChainRoot<ValueT>, flags?: NodeFlags) {
		this.is = new NodeIs<ValueT>(root, flags);
		this.contain = new NodeContains<ValueT>(root, flags);
		this.have = new NodeHave<ValueT>(root, flags);
	}
}
