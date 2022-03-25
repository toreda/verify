import type {Matcher} from '../matcher';
import {NodeLink} from './link';
import {NodeRoot} from './root';
import {Pattern} from '../pattern';
import {matcherPatternMk} from '../matcher/pattern/mk';
import {matcherPatternsMk} from '../matcher/patterns/mk';

export class NodeMatch<ValueT> {
	public readonly pattern: Matcher<NodeLink<ValueT>, Pattern<ValueT>>;
	public readonly patterns: Matcher<NodeLink<ValueT>, Pattern<ValueT>[]>;

	constructor(root: NodeRoot<ValueT>) {
		const link = new NodeLink<ValueT>(root);
		this.pattern = matcherPatternMk<NodeLink<ValueT>, unknown>(link, root);
		this.patterns = matcherPatternsMk<NodeLink<ValueT>, unknown>(link, root);
	}
}
