import {Fate} from '@toreda/fate';
import type {Matcher} from '../matcher';

export class MatcherBound<ValueT, CmpT> {
	public readonly fn: Matcher<ValueT, CmpT[]>;
	public readonly args: CmpT[];

	constructor(fn: Matcher<ValueT, CmpT[]>, args: CmpT[]) {
		this.fn = fn;
		this.args = args;
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();
		try {
			const result = this.fn(this.args);
		} catch (e) {
			fate.error(e);
			fate.setErrorCode('exception');
		}

		return fate;
	}
}
