import type {Matcher} from '../matcher';
import type {Pattern} from '../pattern';

/**
 * @category Matchers
 */
export type MatcherPatterns<NextT, ValueT> = Matcher<NextT, Pattern<ValueT>[]>;
