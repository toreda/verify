import {ChkChainRoot} from 'src/chk/chain/root';
import {NodeContains} from './contains';
import {NodeIs} from './is';

/**
 * @category Nodes
 */
export class NodeOr<ValueT> {
	public readonly contains: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this.is = new NodeIs<ValueT>(root);
		this.contains = new NodeContains<ValueT>(root);
	}
}
