import {ChkChain} from '../chain';
import {Itor} from '@toreda/types';

export class ChkChainsItor<ValueT> implements Itor<ChkChain<ValueT>> {
	private _first: ChkChain<ValueT>;
	private _last: ChkChain<ValueT>;

	constructor(first, last) {
		this._first = first;
		this._last = last;
	}

	public next(): Itor {

	}
}
