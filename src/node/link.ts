import {ChkChainRoot} from 'src/chk/chain/root';
import type {Node} from '../node';
import {NodeAnd} from './and';

/**
 * @category Nodes
 */
export class NodeLink<ValueT> implements Node<ValueT> {
	public readonly and: NodeAnd<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this.and = new NodeAnd<ValueT>(root);
	}
}
