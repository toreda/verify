import type {ArrayFunc, Iterable} from '@toreda/types';

import {ChkChain} from './chain';
import {ChkChainsItor} from './chains/itor';

export class ChkChains<ValueT> implements Iterable<ChkChain<ValueT>, ChkChainItor<ValueT>> {
	private readonly _items: ChkChain<ValueT>[];

	constructor() {
		this._items = [];
	}

	*[Symbol.iterator](): Iterator<ChkChainsItor<ValueT>> {
		const itor = new ChkChainsItor<ValueT>();
	}

	public forEach(fn: ArrayFunc<ChkChain<ValueT>, void>): void {
		for (let i = 0; i < this._items.length; i++) {
			const item = this._items[i];

			try {
				fn(item, i, this._items);
			} catch (e) {}
		}
	}

	public add(chain: ChkChain<ValueT>): void {
		if (!chain) {
			return;
		}

		this._items.push(chain);
	}
}
