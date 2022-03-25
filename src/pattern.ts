import {Fate} from '@toreda/fate';
import {PatternChain} from './pattern/chain';

/**
 * @category Pattern Validation
 */
export class Pattern<ValueT> {
	public readonly chains: PatternChain<ValueT>[];

	constructor() {
		this.chains = [];
	}

	public async validate(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		for (const chain of this.chains) {
			try {
				const result = await chain.validate(value);
			} catch (e) {
				fate.setErrorCode('exception');
				fate.error(e);
			}
		}

		return fate.setDone(true);
	}
}
