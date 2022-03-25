import type {Matcher} from '../matcher';
import type {Pattern} from '../pattern';

/**
 * @category Matchers
 */
export type MatcherPattern<NextT, ValueT> = Matcher<NextT, Pattern<ValueT>>;
