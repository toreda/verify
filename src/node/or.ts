import {NodeContains} from './contains';
import {NodeIs} from './is';
import {NodeRoot} from './root';

/**
 * @category Nodes
 */
export class NodeOr<ValueT> {
	public readonly contains: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this.is = new NodeIs<ValueT>(root);
		this.contains = new NodeContains<ValueT>(root);
	}
}
