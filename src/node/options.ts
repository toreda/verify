import type {MatcherFunc} from '../matcher/func';
import type {Node} from '../node';

/**
 * @category Nodes
 */
export interface NodeOptions {
	matcher?: MatcherFunc<unknown, unknown>;
	children?: Node<unknown, unknown>[];
}
