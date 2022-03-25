import {Fate} from '@toreda/fate';
import type {PatternChainId} from './chain/id';
import {PatternNode} from './node';

/**
 * @category Pattern Validation
 */
export class PatternChain<ValueT> {
	public readonly chainId: PatternChainId;
	public readonly nodes: PatternNode<ValueT>[];

	constructor(chainId: PatternChainId, nodes?: PatternNode<ValueT>[]) {
		this.chainId = chainId;
		this.nodes = Array.isArray(nodes) ? nodes : [];
	}

	public async validate(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		for (const node of this.nodes) {
			try {
				const result = await node.execute(value);

				if (!result.success()) {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e) {
				fate.error(e);
				fate.errorCode('exception');
			}
		}
		return fate.setDone(true);
	}
}
