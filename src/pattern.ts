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

		let succeeded = 0;
		let executed = 0;

		for (const chain of this.chains) {
			try {
				const result = await chain.validate(value);
				if (result.success()) {
					succeeded++;
				} else {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e) {
				fate.setErrorCode('exception');
				fate.error(e);
			}

			executed++;
		}

		if (succeeded === executed) {
			fate.success(true);
		}

		return fate.setDone(true);
	}
}
