import {ChkValue} from '../value';
import {MatcherFunc} from '../../matcher/func';

/**
 * Root object for a ChkChain. Referenced all nodes and matchers in chain.
 *
 * @category Validation Chain
 */
export class ChkChainRoot<ValueT> {
	public readonly value: ChkValue<ValueT>;
	public readonly matchers: MatcherFunc<unknown>[];

	constructor(value: ChkValue<ValueT>) {
		this.value = value;
		this.matchers = [];
	}
}
