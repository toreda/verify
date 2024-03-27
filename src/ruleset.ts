import {Fate} from '@toreda/fate';
import {Rule} from './rule';
import {Block} from './block';
import {Statement} from './statement';

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

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		let successful = 0;
		const ruleCount = this.rules.length;

		for (const rule of this.rules) {
			try {
				const ruleResult = await rule.execute<ValueT>(value);

				if (ruleResult.ok()) {
					successful++;
				}
			} catch (e: unknown) {
				const msg = e instanceof Error ? e.message : 'unknown_err_type';
				console.error(`Ruleset execute exception: ${msg}.`);
				result.setErrorCode('exception');
			}
		}

		const failed = ruleCount - successful;
		if (successful === ruleCount) {
			console.debug(`${successful} of ${ruleCount} rules passed.`);
			result.setSuccess(true);
		} else {
			console.error(`${failed} of ${ruleCount} rules failed.`);
			result.setErrorCode(`rules_failed:${failed} of ${ruleCount}`);
		}

		return result;
	}

	public reset(): void {
		this.rules.length = 0;
	}
}
