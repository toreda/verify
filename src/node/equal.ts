import {ChkChainRoot} from '../chk/chain/root';

export class NodeEqual<ValueT> {
	private readonly _root: ChkChainRoot<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this._root = root;
	}
}
