import {ChkChainRoot} from 'src/chk/chain/root';
import {NodeContains} from './contains';
import {NodeHave} from './have';
import {NodeIs} from './is';

/**
 * @category Nodes
 */
export class NodeAnd<ValueT> {
	public readonly contain: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly have: NodeHave<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this.is = new NodeIs<ValueT>(root);
		this.contain = new NodeContains<ValueT>(root);
		this.have = new NodeHave<ValueT>(root);
	}
}
