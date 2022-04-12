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

import {ChkChainRoot} from './chk/chain/root';
import type {MatcherFunc} from './matcher/func';
import type {NodeOptions} from './node/options';
import type {NodeType} from './node/type';

/**
 * @category Nodes
 */
export class Node<ValueT, ParamT> {
	public readonly nodeType: NodeType;
	public readonly matcher: MatcherFunc<ValueT, ParamT> | null;
	public readonly root: ChkChainRoot<ValueT>;
	//public readonly children: Node<ValueT, unknown>[];

	constructor(nodeType: NodeType, root: ChkChainRoot<ValueT>, options?: NodeOptions) {
		this.nodeType = nodeType;
		this.root = root;
		this.matcher = this.matcherMk(options?.matcher);
	}

	public async execute(value?: ValueT | null): Promise<boolean> {
		return false;
	}

	private matcherMk(matcher?: MatcherFunc<ValueT, ParamT>): MatcherFunc<ValueT, ParamT> | null {
		if (typeof matcher !== 'function') {
			return null;
		}

		return matcher;
	}

	private childrenMk(children?: Node<ValueT, unknown>[] | null): Node<ValueT, unknown>[] {
		const base = [] as Node<ValueT, unknown>[];

		if (!Array.isArray(children)) {
			return base;
		}

		return children;
	}
}
