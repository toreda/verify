import {ChkChainRoot} from 'src/chk/chain/root';
import {NodeBe} from './be';
import {NodeContains} from './contains';
import {NodeEqual} from './equal';
import {NodeMatch} from './match';

/**
 * @category Nodes
 */
export class NodeMust<ValueT> {
	public readonly match: NodeMatch<ValueT>;
	public readonly equal: NodeEqual<ValueT>;
	public readonly be: NodeBe<ValueT>;
	public readonly contain: NodeContains<ValueT>;

	constructor(root: ChkChainRoot<ValueT>) {
		this.match = new NodeMatch<ValueT>(root);
		this.equal = new NodeEqual<ValueT>(root);
		this.be = new NodeBe<ValueT>(root);
		this.contain = new NodeContains<ValueT>(root);
	}
}
