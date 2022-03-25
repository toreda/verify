import {NodeRoot} from './root';

export class NodeContains<ValueT> {
	private readonly root: NodeRoot<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this.root = root;
	}
}
