import type {MatcherFunc} from './func';

/**
 * @category Matchers
 */
export interface MatcherCall<ValueT, ParamT> {
	fn: MatcherFunc<ValueT, ParamT>;
	params?: ParamT;
}
