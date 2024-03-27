import {type Block} from '../block';
import {Statement} from '../statement';

/**
 * Methods that define the start of a new rule.
 */
export interface RuleCallable {
	must: Block<Statement>;
	is: Block<Statement>;
	has: Block<Statement>;
	contains: Block<Statement>;
	matches: Block<Statement>;
}
