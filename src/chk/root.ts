import {ChkChains} from './chains';
import {ChkValue} from './value';
import {Fate} from '@toreda/fate';

export class ChkRoot<ValueT> {
	public readonly value: ChkValue<ValueT>;
	public readonly chains: ChkChains<ValueT>;

	constructor() {
		this.value = new ChkValue<ValueT>();
		this.chains = new ChkChains<ValueT>();
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		for (const chain of this.chains) {
			if (chain === null) {
				continue;
			}

			try {
				const chainResult = await chain.execute(value);
				if (!chainResult.success()) {
					result.setErrorCode(chainResult.errorCode());
				}
			} catch (e) {
				result.setErrorCode('exception');
			}
		}

		return result;
	}
}
