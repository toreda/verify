import type {MatcherEqualTo} from '../matcher/equal/to';
import type {MatcherGreaterThan} from '../matcher/greater/than';
import type {MatcherLessThan} from '../matcher/less/than';
import {NodeLink} from './link';
import {NodeRoot} from './root';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/less/than/mk';

export class NodeLength<ValueT> {
	private readonly _root: NodeRoot<ValueT>;
	public readonly equalTo: MatcherEqualTo<NodeLink<ValueT>>;
	public readonly lessThan: MatcherLessThan<NodeLink<ValueT>>;
	public readonly greaterThan: MatcherGreaterThan<NodeLink<ValueT>>;

	constructor(root: NodeRoot<ValueT>) {
		const link = new NodeLink<ValueT>(root);
		this._root = root;

		this.lessThan = matcherLessThanMk<NodeLink<ValueT>>(link);
		this.greaterThan = matcherGreaterThanMk<NodeLink<ValueT>>(link);
		this.equalTo = matcherEqualToMk<NodeLink<ValueT>>(link);
	}
}
