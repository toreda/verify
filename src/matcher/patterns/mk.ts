import {ChkChainRoot} from 'src/chk/chain/root';
import type {Matcher} from '../..//matcher';
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
	root: ChkChainRoot<ValueT>
): Matcher<NextT, Pattern<ValueT>[]> {
	return (patterns: Pattern<ValueT>[]): NextT => {
		return next;
	};
}
