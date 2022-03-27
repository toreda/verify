import {ChkChainRoot} from 'src/chk/chain/root';
import {NodeLength} from './length';

export class NodeAny<ValueT> {
	public readonly length: NodeLength<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this.length = new NodeLength<ValueT>(root);
	}
}
