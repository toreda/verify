import type {MatcherFunc} from '../matcher/func';

/**
 * @category Nodes
 */
export interface NodeOptions {
	matcher?: MatcherFunc<unknown, unknown>;
}
