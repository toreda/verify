import {NodeLength} from './length';
import {NodeRoot} from './root';

export class NodeHave<ValueT> {
	private readonly _root: NodeRoot<ValueT>;
	public readonly length: NodeLength<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this._root = root;

		this.length = new NodeLength<ValueT>(root);
	}
}
