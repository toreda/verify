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

import {Fate} from '@toreda/fate';
import type {PatternChainId} from './chain/id';
import {PatternNode} from './node';

/**
 * @category Pattern Validation
 */
export class PatternChain<ValueT> {
	public readonly chainId: PatternChainId;
	public readonly nodes: PatternNode<ValueT>[];

	constructor(chainId: PatternChainId, nodes?: PatternNode<ValueT>[]) {
		this.chainId = chainId;
		this.nodes = Array.isArray(nodes) ? nodes : [];
	}

	public async validate(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		for (const node of this.nodes) {
			try {
				const result = await node.execute(value);

				if (!result.success()) {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e) {
				fate.error(e);
				fate.errorCode('exception');
			}
		}
		return fate.setDone(true);
	}
}
