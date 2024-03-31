import {Fate} from '@toreda/fate';
import {Rule} from './rule';
import {Block} from './block';
import {Statement} from './statement';
import {type ExecutionContext} from './execution/context';
import {executor} from './executor';

/**
 * @category Rulesets
 */
export class Ruleset {
	public readonly rules: Rule[];

	constructor() {
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
			rule.add(block.stmt);
		}

		this.addRule(rule);
		return true;
	}

	public addRule(rule: Rule): boolean {
		if (!rule) {
			return false;
		}

		this.rules.push(rule);

		return true;
	}

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<ExecutionContext>> {
		return await executor<ValueT, Rule>({
			name: 'rules',
			collection: this.rules,
			value: value
		});
	}

	public reset(): void {
		this.rules.length = 0;
	}
}
