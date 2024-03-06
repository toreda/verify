import {Fate} from '@toreda/fate';
import {type RulesetInit} from './ruleset/init';
import {Statement} from './statement';
import {Statements} from './statements';
import {Value} from './value';

/**
 * @category Rulesets
 */
export class Ruleset<ValueT = unknown> extends Statement<ValueT> {
	public readonly statements: Statements<ValueT>;

	constructor(init?: RulesetInit<ValueT>) {
		super({
			value: init?.value ?? new Value<ValueT>()
		});

		this.statements = new Statements<ValueT>();
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		for (const statement of this.statements) {
			if (statement === null) {
				continue;
			}

			try {
				const executeResult = await statement.execute(value);
				if (!executeResult.success()) {
					result.setErrorCode(executeResult.errorCode());
				}
			} catch (e) {
				result.setErrorCode('exception');
			}
		}

		return result;
	}

	public reset(): void {
		
	}
}
