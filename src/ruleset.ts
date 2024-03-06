import {type RulesetInit} from './ruleset/init';
import {Statement} from './statement';
import {Statements} from './statements';

/**
 * @category Rulesets
 */
export class Ruleset<ValueT = unknown> extends Statement<ValueT> {
	public readonly statements: Statements<ValueT>;

	constructor(init: RulesetInit<ValueT>) {
		super({
			value: init.value
		});

		this.statements = new Statements<ValueT>();
	}

	public reset(): void {
		super.reset();
	}
}
