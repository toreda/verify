import {ChkChainRoot} from '../chk/chain/root';

/**
 * @category Nodes
 */
export class NodeContains<ValueT> {
	private readonly _root: ChkChainRoot<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this._root = root;
	}
}
