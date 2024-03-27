import {Fate} from '@toreda/fate';
import {type RulesetInit} from './ruleset/init';
import {Rule} from './rule';
import {Block} from './block';
import {Statement} from './statement';

/**
 * @category Rulesets
 */
export class Ruleset {
	public readonly rules: Rule[];

	constructor(_init?: RulesetInit) {
		this.rules = [];

		this.bindListeners();
	}

	private bindListeners(): void {
		this.execute = this.execute.bind(this);
	}

	public add(...blocks: Block<Statement>[]): boolean {
		if (!Array.isArray(blocks)) {
			return false;
		}

		const rule = new Rule();

		for (const block of blocks) {
			const result = this.addStatement(block.stmt);
			if (!result) {
				return false;
			}
		}

		this.addRule(rule);
		return true;
	}

	public addStatement(stmt: Statement): boolean {
		console.info('stmt: @@@');

		return true;
	}

	public addRule(rule: Rule): boolean {
		if (!rule) {
			return false;
		}

		this.rules.push(rule);

		return true;
	}

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		for (const rule of this.rules) {
			try {
				const ruleResult = await rule.execute<ValueT>(value);
			} catch (e: unknown) {
				result.setErrorCode('exception');
			}
		}

		return result;
	}

	public reset(): void {
		this.rules.length = 0;
	}
}
