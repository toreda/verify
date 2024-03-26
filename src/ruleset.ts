import {Fate} from '@toreda/fate';
import {type RulesetInit} from './ruleset/init';
import {Statements} from './statements';
import {Value} from './value';
import {Rule} from './rule';

/**
 * @category Rulesets
 */
export class Ruleset<ValueT = unknown> {
	public readonly statements: Statements<ValueT>;
	public readonly value: Value<ValueT>;

	constructor(init?: RulesetInit<ValueT>) {
		this.value = init?.value ?? new Value<ValueT>();
		this.statements = new Statements<ValueT>();
	}

	public add(...rules: Rule<ValueT>[]): boolean {
		if (!Array.isArray(rules)) {
			return false;
		}

		for (const rule of rules) {
			const result = this.addRule(rule);
			if (!result) {
				return false;
			}
		}

		return true;
	}

	public addRule(rule: Rule<ValueT>): boolean {
		if (!rule) {
			return false;
		}

		return true;
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		for (const statement of this.statements) {
			if (statement === null) {
				continue;
			}

			try {
				/* 				const executeResult = await statement.execute(value);
				if (!executeResult.success()) {
					result.setErrorCode(executeResult.errorCode());
				} */
			} catch (e: unknown) {
				result.setErrorCode('exception');
			}
		}

		return result;
	}

	public reset(): void {}
}
