import {ChkChainRoot} from '../../chk/chain/root';
import type {Matcher} from '../../matcher';
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
	root: ChkChainRoot<ValueT>
): Matcher<NextT, Pattern<ValueT>> {
	return (pattern: Pattern<ValueT>): NextT => {
		return next;
	};
}
