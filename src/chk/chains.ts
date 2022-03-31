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

import type {ArrayFunc, Iterable} from '@toreda/types';

import {ChkChain} from './chain';
import {ChkChainsItor} from './chains/itor';

export class ChkChains<ValueT> implements Iterable<ArrayFunc<ChkChain<ValueT>, boolean>, void> {
	private readonly _items: ChkChain<ValueT>[];

	constructor() {
		this._items = [];
	}

	[Symbol.iterator](): ChkChainsItor<ValueT> {
		return new ChkChainsItor<ValueT>(this._items);
	}

	public forEach(fn: ArrayFunc<ChkChain<ValueT>, boolean>): void {
		for (let i = 0; i < this._items.length; i++) {
			const item = this._items[i];

			try {
				fn(item, i, this._items);
			} catch (e) {}
		}
	}

	/**
	 * Add matcher chain to list of chains.
	 * @param chain
	 * @returns
	 */
	public add(chain: ChkChain<ValueT>): boolean {
		if (!chain) {
			return false;
		}

		this._items.push(chain);

		return true;
	}
}
