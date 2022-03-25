import type {Matcher} from '../../matcher';
import {NodeRoot} from '../../node/root';
import {Pattern} from '../../pattern';

/**
 *
 * @param next
 * @returns
 *
 * @category Matchers
 */
export function matcherPatternMk<NextT, ValueT>(
	next: NextT,
	root: NodeRoot<ValueT>
): Matcher<NextT, Pattern<ValueT>> {
	return (pattern: Pattern<ValueT>): NextT => {
		return next;
	};
}
