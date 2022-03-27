import {Fate} from '@toreda/fate';
import {MatcherFunc} from './func';

export class MatcherBound<ValueT, CmpT> {
	public readonly fn: MatcherFunc<CmpT>;
	public readonly args: CmpT;

	constructor(fn: MatcherFunc<CmpT>, args: CmpT) {
		this.fn = fn;
		this.args = args;
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();
		try {
			const result = await this.fn(this.args);
			if (result === true) {
				fate.success(true);
			} else {
				fate.setErrorCode(`validation_fail`);
			}
		} catch (e) {
			fate.error(e);
			fate.setErrorCode('exception');
		}

		return fate;
	}
}
