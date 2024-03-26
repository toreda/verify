import {Block} from './block';
import {MatcherBound} from './matcher/bound';
import {MatcherFunc} from './matcher/func';

export class Statement<ValueT = unknown> {
	public readonly blocks: Block<Statement>[];
	public readonly matchers: MatcherBound<ValueT, unknown>[];

	constructor() {
		this.blocks = [];
		this.matchers = [];
	}

	public addMatcher(fn: MatcherFunc<ValueT, unknown>): void {
		//this.matchers.push(matcher);

		const bound = new MatcherBound<ValueT, unknown>({
			fn: fn
		});

		this.matchers.push(bound);
	}
}
