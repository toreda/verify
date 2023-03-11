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

import {ChkChainRoot} from './chain/root';
import {ChkRoot} from './root';
import {Fate} from '@toreda/fate';
import {NodeContains} from '../node/contains';
import {NodeHave} from '../node/have';
import {NodeIs} from '../node/is';
import {NodeMatch} from '../node/match';
import {NodeMust} from '../node/must';

export class ChkChain<ValueT> {
	private readonly root: ChkChainRoot<ValueT>;
	public readonly must: NodeMust<ValueT>;
	public readonly contains: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly has: NodeHave<ValueT>;
	public readonly matches: NodeMatch<ValueT>;

	constructor(chkRoot: ChkRoot<ValueT>) {
		const chainRoot = new ChkChainRoot<ValueT>(chkRoot.value);
		this.must = new NodeMust<ValueT>(chainRoot);
		this.contains = new NodeContains<ValueT>(chainRoot);
		this.has = new NodeHave<ValueT>(chainRoot);
		this.is = new NodeIs<ValueT>(chainRoot);
		this.matches = new NodeMatch<ValueT>(chainRoot);

		this.root = chainRoot;
	}

	/**
	 * Execute all matchers in this chain in the order they were added.
	 * @param value
	 * @returns
	 */
	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		let succeeded = 0;
		let executed = 0;
		for (const matcher of this.root.matchers) {
			try {
				const result = await matcher.execute(value);
				if (result.success()) {
					succeeded++;
				} else {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e) {
				fate.setErrorCode(`execute:matcher:error`);
				fate.error(e);
			}

			executed++;
		}

		// Chain execution result is success when all matchers returned
		// successful validation results.
		if (executed === succeeded) {
			fate.setSuccess(true);
		}

		return fate;
	}
}
