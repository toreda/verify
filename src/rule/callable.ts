import {type Block} from '../block';

/**
 * Methods that define the start of a new rule.
 */
export interface RuleCallable<ValueT = unknown> {
	must: Block;
	is: Block;
	has: Block;
	contains: Block;
	matches: Block;
}
