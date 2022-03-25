import type {Matcher} from '../matcher';

export class NodeRoot<ValueT> {
	public readonly matchers: Matcher<unknown, unknown>[];

	constructor() {
		this.matchers = [];
	}
}
