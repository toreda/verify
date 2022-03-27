import {ChkChainRoot} from 'src/chk/chain/root';
import type {MatcherEqualTo} from '../matcher/equal/to';
import type {MatcherGreaterThan} from '../matcher/greater/than';
import type {MatcherLessThan} from '../matcher/less/than';
import {NodeLink} from './link';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/less/than/mk';

export class NodeIs<ValueT> {
	public readonly lessThan: MatcherLessThan<NodeLink<ValueT>>;
	public readonly greaterThan: MatcherGreaterThan<NodeLink<ValueT>>;
	public readonly equalTo: MatcherEqualTo<NodeLink<ValueT>>;

	constructor(root: ChkChainRoot<ValueT>) {
		const link = new NodeLink<ValueT>(root);

		this.lessThan = matcherLessThanMk<NodeLink<ValueT>>(link);
		this.greaterThan = matcherGreaterThanMk<NodeLink<ValueT>>(link);
		this.equalTo = matcherEqualToMk<NodeLink<ValueT>>(link);
	}
}
