import {NodeContains} from './contains';
import {NodeHave} from './have';
import {NodeIs} from './is';
import {NodeRoot} from './root';

/**
 * @category Nodes
 */
export class NodeAnd<ValueT> {
	public readonly contain: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly have: NodeHave<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this.is = new NodeIs<ValueT>(root);
		this.contain = new NodeContains<ValueT>(root);
		this.have = new NodeHave<ValueT>(root);
	}
}
