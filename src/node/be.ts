import {ChkChainRoot} from 'src/chk/chain/root';
import type {MatcherEqualTo} from '../matcher/equal/to';
import type {MatcherGreaterThan} from 'src/matcher/greater/than';
import type {MatcherLessThan} from 'src/matcher/less/than';
import {NodeLink} from './link';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/less/than/mk';

/**
 * @category Nodes
 */
export class NodeBe<ValueT> {
	public readonly lessThan: MatcherLessThan<NodeLink<ValueT>>;
	public readonly greaterThan: MatcherGreaterThan<NodeLink<ValueT>>;
	public readonly equalTo: MatcherEqualTo<NodeLink<ValueT>>;

	constructor(root: ChkChainRoot<ValueT>) {
		const and = new NodeLink<ValueT>(root);

		this.lessThan = matcherLessThanMk<NodeLink<ValueT>>(and);
		this.greaterThan = matcherGreaterThanMk<NodeLink<ValueT>>(and);
		this.equalTo = matcherEqualToMk<NodeLink<ValueT>>(and);
	}
}