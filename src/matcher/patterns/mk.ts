import type {Matcher} from '../..//matcher';
import {NodeRoot} from '../../node/root';
import {Pattern} from '../../pattern';

/**
 *
 * @param next
 * @returns
 *
 * @category Matchers
 */
export function matcherPatternsMk<NextT, ValueT>(
	next: NextT,
	root: NodeRoot<ValueT>
): Matcher<NextT, Pattern<ValueT>[]> {
	return (patterns: Pattern<ValueT>[]): NextT => {
		return next;
	};
}
