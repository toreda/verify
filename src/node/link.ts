import type {Node} from '../node';
import {NodeAnd} from './and';
import {NodeRoot} from './root';

/**
 * @category Nodes
 */
export class NodeLink<ValueT> implements Node<ValueT> {
	public readonly and: NodeAnd<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this.and = new NodeAnd<ValueT>(root);
	}
}
